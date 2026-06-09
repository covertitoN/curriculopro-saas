import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { createClient } from "@supabase/supabase-js"
import { rateLimit, getIdentifier, RATE_LIMITS } from "@/lib/rate-limit"

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { curriculoText, vagaText, userId, tipo = "analise" } = body
    if (!curriculoText || !vagaText) return NextResponse.json({ error: "Curriculo e vaga sao obrigatorios." }, { status: 400 })
    if (curriculoText.length > 8000) return NextResponse.json({ error: "Curriculo muito longo. Maximo 8.000 caracteres." }, { status: 400 })
    if (vagaText.length > 4000) return NextResponse.json({ error: "Vaga muito longa. Maximo 4.000 caracteres." }, { status: 400 })

    const identifier = userId || getIdentifier(req)
    const rl = rateLimit(identifier, userId ? RATE_LIMITS.free : RATE_LIMITS.anonymous)
    if (!rl.success) {
      const resetIn = Math.ceil((rl.resetAt - Date.now()) / 60000)
      return NextResponse.json({ error: `Limite atingido. Tente em ${resetIn} minutos ou faca upgrade para Pro.`, upgradeUrl: "/pricing" }, { status: 429 })
    }

    const isCarta = tipo === "carta"
    const system = isCarta
      ? "Voce e especialista em cartas de apresentacao profissionais para o mercado brasileiro. Gere uma carta persuasiva de 250-350 palavras, natural, com abertura impactante (nao 'Venho por meio desta'), destacando os 3 pontos mais relevantes do curriculo para a vaga, usando as palavras-chave da vaga naturalmente, terminando com CTA para entrevista. Responda APENAS com a carta."
      : "Voce e especialista em ATS e recrutamento no mercado brasileiro. Analise o curriculo vs a vaga e retorne APENAS JSON valido sem markdown."
    const user = isCarta
      ? `CURRICULO:\n${curriculoText}\n\nVAGA:\n${vagaText}\n\nGere a carta:`
      : `CURRICULO:\n${curriculoText}\n\nVAGA:\n${vagaText}\n\nRetorne JSON:\n{"score":number,"resumo":"string","pontos_fortes":["string"],"keywords_faltando":[{"palavra":"string","importancia":"alta|media|baixa","sugestao":"string"}],"melhorias_prioritarias":[{"titulo":"string","descricao":"string","impacto":"alto|medio|baixo"}],"veredicto":"aprovado|atencao|reprovado"}`

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: isCarta ? 600 : 1200,
      messages: [{ role: "user", content: user }],
      system,
    })

    const text = response.content[0].type === "text" ? response.content[0].text.trim() : ""
    let result: unknown
    if (isCarta) {
      result = { carta: text }
    } else {
      const match = text.match(/\{[\s\S]*\}/)
      if (!match) throw new Error("JSON invalido")
      result = JSON.parse(match[0])
    }

    if (userId && !isCarta) {
      const d = result as { score?: number }
      supabase.from("analyses").insert({ user_id: userId, score: d.score || 0, result, created_at: new Date().toISOString() }).then(() => {}).catch(() => {})
    }

    return NextResponse.json({ success: true, data: result, remaining: rl.remaining })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Erro ao processar. Tente novamente." }, { status: 500 })
  }
}
