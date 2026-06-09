import type { Metadata } from "next"
export const metadata: Metadata = { title: "Termos de Uso — CurriculoPro", description: "Termos e condicoes de uso do CurriculoPro." }
export default function TermosDeUso() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Termos de Uso</h1>
      <p className="text-sm text-gray-500 mb-10">Ultima atualizacao: junho de 2026</p>
      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">1. Aceitacao</h2><p>Ao usar o CurriculoPro, voce concorda com estes termos.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">2. Servico</h2><p>Plataforma de analise e otimizacao de curriculos com IA. Nao garantimos entrevistas ou contratacoes — somos uma ferramenta de auxilio.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">3. Planos e pagamentos</h2><ul className="list-disc pl-5 space-y-1"><li>Plano gratuito: 3 analises/mes, sem cartao</li><li>Plano Pro R$29,90/mes: analises ilimitadas + carta de apresentacao</li><li>Cancelamento a qualquer momento. Acesso pro ate fim do periodo pago.</li><li>Direito de arrependimento em 7 dias corridos (art. 49 CDC)</li></ul></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">4. Uso aceitavel</h2><p>E proibido usar bots, contornar limites, inserir dados de terceiros sem autorizacao, usar para fins ilegais ou revender resultados comercialmente.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">5. Propriedade dos dados</h2><p>Voce mantem todos os direitos sobre seu conteudo. Concede licenca limitada apenas para prestacao do servico. Nao usamos seu curriculo para treinar modelos de IA.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">6. Limitacao de responsabilidade</h2><p>Servico fornecido como esta. Nossa responsabilidade e limitada ao valor pago nos ultimos 12 meses.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">7. Lei aplicavel</h2><p>Lei brasileira. Foro: comarca de Sao Paulo/SP. Sem prejuizo de consumidor.gov.br.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">8. Contato</h2><p>Suporte: <a href="mailto:suporte@curriculopro.com.br" className="text-blue-600">suporte@curriculopro.com.br</a></p></section>
      </div>
    </div>
  )
}
