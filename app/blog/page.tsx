import type { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = { title: "Blog — Dicas de Curriculo ATS e Carreira | CurriculoPro", description: "Aprenda como otimizar seu curriculo para sistemas ATS, aumentar suas chances de entrevistas e navegar o mercado de trabalho brasileiro em 2026." }
const posts = [
  { slug: "como-otimizar-curriculo-ats", titulo: "Como fazer seu curriculo passar pelo robo ATS (guia completo 2026)", resumo: "75% dos curriculos sao eliminados antes de um humano ver. Aprenda como o ATS funciona e garanta que seu curriculo passe pela triagem automatica.", data: "08 jun 2026", categoria: "ATS" },
  { slug: "palavras-chave-curriculo-por-area", titulo: "As palavras-chave que todo curriculo precisa em 2026 (por area profissional)", resumo: "Lista completa de keywords para TI, Marketing, Financas, RH, Vendas e mais. Baseado em analise de milhares de vagas brasileiras.", data: "07 jun 2026", categoria: "Keywords" },
  { slug: "ia-otimizar-curriculo-entrevistas", titulo: "Usei IA para otimizar meu curriculo e recebi 4 entrevistas em 1 semana", resumo: "Como a analise de score ATS transformou minha busca de emprego. Do score 38% para 89% — e os resultados praticos que vieram depois.", data: "06 jun 2026", categoria: "Cases" },
]
export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-4">Blog CurriculoPro</h1>
      <p className="text-lg text-gray-600 mb-10">Dicas praticas sobre ATS, palavras-chave e mercado de trabalho para voce conseguir mais entrevistas.</p>
      <div className="bg-gray-950 text-white rounded-xl p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1"><p className="font-medium text-lg">Veja o score ATS do seu curriculo agora</p><p className="text-gray-400 text-sm mt-1">Analise gratuita — sem cartao de credito.</p></div>
        <Link href="/app" className="bg-white text-gray-950 px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-100 transition whitespace-nowrap">Analisar gratis →</Link>
      </div>
      <div className="space-y-8">
        {posts.map(p => (
          <article key={p.slug} className="border-b border-gray-100 pb-8 last:border-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{p.categoria}</span>
              <span className="text-sm text-gray-400">{p.data}</span>
            </div>
            <Link href={`/blog/${p.slug}`} className="group"><h2 className="text-xl font-medium mb-2 group-hover:text-blue-600 transition-colors">{p.titulo}</h2></Link>
            <p className="text-gray-600">{p.resumo}</p>
            <Link href={`/blog/${p.slug}`} className="inline-block mt-3 text-sm text-blue-600 font-medium">Ler artigo →</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
