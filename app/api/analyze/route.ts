import { generateText, Output } from 'ai'
import { z } from 'zod'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const maxDuration = 60

const analysisSchema = z.object({
  ats_score: z
    .number()
    .min(0)
    .max(100)
    .describe('Nota de 0 a 100 de compatibilidade com sistemas ATS'),
  score_label: z
    .string()
    .describe('Rótulo curto, ex: "Excelente", "Bom", "Precisa melhorar"'),
  score_desc: z
    .string()
    .describe('Uma frase explicando o score em português do Brasil'),
  keywords_found: z
    .array(z.string())
    .describe('Palavras-chave da vaga já presentes no currículo'),
  keywords_missing: z
    .array(z.string())
    .describe('Palavras-chave importantes da vaga ausentes no currículo'),
  curriculo_otimizado: z
    .string()
    .describe(
      'Versão otimizada do currículo em texto, pronta para copiar, em português do Brasil',
    ),
  carta_apresentacao: z
    .string()
    .describe('Carta de apresentação personalizada para a vaga, em português do Brasil'),
  dicas: z
    .string()
    .describe(
      'Dicas práticas do recrutador em formato de tópicos com markdown, em português do Brasil',
    ),
})

const SYSTEM_PROMPT = `Você é um especialista sênior em sistemas ATS (Applicant Tracking Systems) e recrutamento para o mercado de trabalho BRASILEIRO.

Sua função é analisar um currículo em comparação com uma descrição de vaga e produzir uma otimização completa.

Diretrizes:
- Escreva TUDO em português do Brasil, com tom profissional e direto.
- Considere as particularidades do mercado brasileiro (formato de currículo, CLT/PJ, idiomas, certificações comuns no Brasil).
- O ats_score deve refletir objetivamente a compatibilidade entre o currículo e a vaga (0-100).
- keywords_found: termos e competências da vaga que JÁ aparecem no currículo.
- keywords_missing: termos e competências importantes da vaga que estão AUSENTES no currículo.
- curriculo_otimizado: reescreva o currículo incorporando naturalmente as palavras-chave que faltam, com verbos de ação e resultados quantificados, mantendo a veracidade das informações originais. Não invente experiências falsas.
- carta_apresentacao: carta de apresentação curta e personalizada para esta vaga específica.
- dicas: lista de dicas práticas do ponto de vista do recrutador, em markdown com tópicos.
- Seja específico e acionável, nunca genérico.`

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado.' },
        { status: 401 },
      )
    }

    const body = await req.json()
    const { resume_input, job_description, job_title, company } = body as {
      resume_input?: string
      job_description?: string
      job_title?: string
      company?: string
    }

    if (!resume_input || !resume_input.trim()) {
      return NextResponse.json(
        { error: 'Adicione o conteúdo do seu currículo.' },
        { status: 400 },
      )
    }
    if (!job_description || !job_description.trim()) {
      return NextResponse.json(
        { error: 'Cole a descrição da vaga.' },
        { status: 400 },
      )
    }

    // Consume a credit atomically (respects RLS via auth.uid()).
    const { data: creditData, error: creditError } = await supabase.rpc(
      'check_and_consume_credit',
    )

    if (creditError) {
      return NextResponse.json(
        { error: 'Não foi possível verificar seus créditos.' },
        { status: 500 },
      )
    }

    const credit = creditData as {
      allowed: boolean
      reason?: string
      credits_used?: number
      credits_limit?: number
    }

    if (!credit?.allowed) {
      return NextResponse.json(
        {
          error:
            credit?.reason === 'limit_reached'
              ? 'Você usou todas as suas análises gratuitas deste mês. Faça upgrade para o plano Pro.'
              : 'Não foi possível liberar a análise.',
          reason: credit?.reason,
          credits_used: credit?.credits_used,
          credits_limit: credit?.credits_limit,
        },
        { status: 402 },
      )
    }

    const userPrompt = `## DESCRIÇÃO DA VAGA
${job_title ? `Cargo: ${job_title}\n` : ''}${company ? `Empresa: ${company}\n` : ''}
${job_description}

## CURRÍCULO ATUAL DO CANDIDATO
${resume_input}`

    const { experimental_output: result } = await generateText({
      model: 'anthropic/claude-sonnet-4.5',
      system: SYSTEM_PROMPT,
      prompt: userPrompt,
      experimental_output: Output.object({ schema: analysisSchema }),
    })

    // Persist the analysis (RLS ensures user_id matches auth.uid()).
    const { data: saved } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        job_title: job_title || null,
        company: company || null,
        job_description,
        resume_input,
        ats_score: result.ats_score,
        score_label: result.score_label,
        score_desc: result.score_desc,
        keywords_found: result.keywords_found,
        keywords_missing: result.keywords_missing,
        curriculo_otimizado: result.curriculo_otimizado,
        carta_apresentacao: result.carta_apresentacao,
        dicas: result.dicas,
      })
      .select()
      .single()

    return NextResponse.json({
      ...result,
      id: saved?.id ?? null,
      credits_used: credit.credits_used,
      credits_limit: credit.credits_limit,
    })
  } catch (err) {
    console.error('[v0] analyze error:', err)
    return NextResponse.json(
      { error: 'Erro ao analisar o currículo. Tente novamente.' },
      { status: 500 },
    )
  }
}
