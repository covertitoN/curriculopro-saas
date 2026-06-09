"use client"
import { useState } from "react"
import Link from "next/link"
const FAQS = [
  { p: "Preciso de cartao para o plano gratis?", r: "Nao. O plano gratis nao exige cartao. Basta criar conta com Google." },
  { p: "Posso cancelar quando quiser?", r: "Sim. Cancele a qualquer momento. O acesso Pro permanece ate o fim do periodo pago." },
  { p: "O que acontece quando uso minhas 3 analises gratis?", r: "O limite renova no inicio de cada mes. Faca upgrade para Pro para analises ilimitadas." },
  { p: "Garante que vou conseguir entrevistas?", r: "Nao fazemos essa garantia. O que garantimos e que voce vai saber exatamente o que falta no seu curriculo para aquela vaga." },
  { p: "Meus dados ficam armazenados?", r: "Seu curriculo e processado para gerar a analise. Voce pode solicitar exclusao a qualquer momento. Veja nossa Politica de Privacidade." },
]
export default function PricingPage() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold mb-4">Planos simples, sem surpresas</h1>
        <p className="text-lg text-gray-600">Comece gratis. Faca upgrade quando quiser mais.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="rounded-2xl p-8 border border-gray-200 bg-white">
          <h2 className="text-xl font-medium mb-1">Gratis</h2>
          <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-semibold">R$0</span><span className="text-sm text-gray-500">para sempre</span></div>
          <Link href="/app" className="block text-center py-3 px-6 rounded-xl font-medium mb-8 bg-gray-950 text-white hover:bg-gray-800 transition">Comecar gratis</Link>
          <ul className="space-y-3 text-sm text-gray-600">
            {["3 analises de curriculo por mes","Score ATS com keywords faltando","Sugestoes de melhoria"].map(r => <li key={r} className="flex gap-2"><span className="text-green-600">✓</span>{r}</li>)}
            {["Sem carta de apresentacao","Sem historico de analises"].map(r => <li key={r} className="flex gap-2"><span className="text-gray-400">✗</span><span className="text-gray-400">{r}</span></li>)}
          </ul>
        </div>
        <div className="rounded-2xl p-8 border border-gray-950 bg-gray-950 text-white">
          <div className="inline-block bg-white/10 text-white text-xs font-medium px-3 py-1 rounded-full mb-4">Mais popular</div>
          <h2 className="text-xl font-medium mb-1 text-white">Pro</h2>
          <div className="flex items-baseline gap-1 mb-6"><span className="text-4xl font-semibold text-white">R$29,90</span><span className="text-sm text-gray-400">por mes</span></div>
          <Link href="https://pay.cakto.com.br/21f2ddc2-5974-4f39-9e3b-c69e4f45a29d" className="block text-center py-3 px-6 rounded-xl font-medium mb-8 bg-white text-gray-950 hover:bg-gray-100 transition">Assinar Pro</Link>
          <ul className="space-y-3 text-sm text-gray-300">
            {["Analises ilimitadas","Score ATS detalhado","Carta de apresentacao","Historico completo","Suporte prioritario","Acesso antecipado a novos recursos"].map(r => <li key={r} className="flex gap-2"><span className="text-green-400">✓</span>{r}</li>)}
          </ul>
        </div>
      </div>
      <div className="text-center py-10 border-y border-gray-100 mb-12">
        <p className="text-3xl font-semibold mb-2">10.000+</p>
        <p className="text-gray-500">curriculos analisados por brasileiros em busca de emprego</p>
      </div>
      <h2 className="text-2xl font-medium mb-6 text-center">Perguntas frequentes</h2>
      <div className="space-y-2 mb-12">
        {FAQS.map((f, i) => (
          <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
            <button className="w-full text-left px-6 py-4 flex justify-between hover:bg-gray-50 transition font-medium" onClick={() => setOpen(open === i ? null : i)}>
              {f.p}<span className="text-gray-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="px-6 pb-4 text-sm text-gray-600">{f.r}</div>}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-400 space-x-4">
        <Link href="/privacidade" className="hover:text-gray-600">Politica de Privacidade</Link>
        <Link href="/termos" className="hover:text-gray-600">Termos de Uso</Link>
      </div>
    </div>
  )
}
