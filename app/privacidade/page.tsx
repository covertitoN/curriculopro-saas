import type { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = { title: "Politica de Privacidade — CurriculoPro", description: "Como coletamos, usamos e protegemos seus dados pessoais." }
export default function PoliticaPrivacidade() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-2">Politica de Privacidade</h1>
      <p className="text-sm text-gray-500 mb-10">Ultima atualizacao: junho de 2026</p>
      <div className="space-y-8 text-sm leading-relaxed text-gray-700">
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">1. Quem somos</h2><p>O CurriculoPro e um servico de otimizacao de curriculos com IA operado no Brasil. Contato: <a href="mailto:privacidade@curriculopro.com.br" className="text-blue-600">privacidade@curriculopro.com.br</a></p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">2. Dados coletados</h2><ul className="list-disc pl-5 space-y-1"><li>Dados de cadastro: nome e e-mail (via Google OAuth)</li><li>Conteudo do curriculo inserido para analise</li><li>Descricao de vagas inseridas para comparacao</li><li>Historico de analises e pontuacoes</li><li>Dados tecnicos: IP, navegador, logs de acesso</li><li>Dados de pagamento: processados pela Cakto (nao armazenamos cartoes)</li></ul></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">3. Uso dos dados</h2><ul className="list-disc pl-5 space-y-1"><li>Fornecer e melhorar o servico</li><li>Processar pagamentos e gerenciar assinatura</li><li>Enviar comunicacoes do servico (com consentimento)</li><li>Prevenir fraudes e garantir seguranca</li><li>Cumprir obrigacoes legais</li></ul></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">4. Terceiros (transferencia internacional)</h2><p className="mb-2">Ao usar o servico, voce autoriza a transferencia de dados para:</p><ul className="list-disc pl-5 space-y-1"><li><strong>Anthropic (EUA):</strong> processa o texto do curriculo para gerar a analise. Nao armazena apos o processamento.</li><li><strong>Supabase (EUA):</strong> banco de dados com suas analises e perfil.</li><li><strong>Vercel (EUA):</strong> infraestrutura de hospedagem.</li><li><strong>Cakto (Brasil):</strong> processador de pagamentos.</li></ul></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">5. Seus direitos (LGPD)</h2><p className="mb-2">Nos termos da Lei 13.709/2018 voce tem direito a: acesso, correcao, exclusao, portabilidade, revogacao de consentimento e oposicao ao tratamento. Envie solicitacao para <a href="mailto:privacidade@curriculopro.com.br" className="text-blue-600">privacidade@curriculopro.com.br</a>. Respondemos em ate 15 dias uteis.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">6. Retencao</h2><p>Dados mantidos enquanto a conta estiver ativa. Apos cancelamento ou solicitacao, removidos em ate 30 dias.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">7. Seguranca</h2><p>Comunicacao criptografada (HTTPS), autenticacao segura e controle de acesso. Em caso de incidente, titulares afetados serao notificados.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">8. Menores de idade</h2><p>Servico nao destinado a menores de 18 anos.</p></section>
        <section><h2 className="text-lg font-medium text-gray-900 mb-2">9. Contato</h2><p>E-mail: <a href="mailto:privacidade@curriculopro.com.br" className="text-blue-600">privacidade@curriculopro.com.br</a></p></section>
      </div>
    </div>
  )
}
