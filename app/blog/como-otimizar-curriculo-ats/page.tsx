import type { Metadata } from "next"
import Link from "next/link"
export const metadata: Metadata = { title: "Como Otimizar Seu Curriculo para ATS em 2026 | CurriculoPro", description: "75% dos curriculos sao eliminados pelo ATS. Aprenda passo a passo como fazer seu curriculo passar pelos filtros automaticos e conseguir mais entrevistas.", keywords: "curriculo ATS, otimizar curriculo, como passar pelo ATS, score ATS" }
export default function ArtigoATS() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <nav className="text-sm text-gray-500 mb-8"><Link href="/blog" className="hover:text-gray-700">Blog</Link><span className="mx-2">›</span><span>ATS</span></nav>
      <header className="mb-10">
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">ATS</span>
        <h1 className="text-3xl font-semibold leading-tight mb-4 mt-4">Como fazer seu curriculo passar pelo robo ATS (e chegar ao RH de verdade)</h1>
        <p className="text-xl text-gray-600">Voce envia 30 curriculos e nao recebe nenhum retorno. Nao e falta de experiencia — e o robo te eliminando antes mesmo de um humano te ver.</p>
      </header>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-10">
        <p className="font-medium mb-1">Quanto o seu curriculo pontua para a vaga que voce quer?</p>
        <p className="text-sm text-gray-500 mb-3">Veja seu score ATS em 2 minutos — gratis, sem cartao.</p>
        <Link href="/app" className="inline-block bg-gray-950 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition">Analisar meu curriculo →</Link>
      </div>
      <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-6">
        <h2 className="text-xl font-medium">O que e ATS e por que ele destroi sua candidatura</h2>
        <p>ATS (Applicant Tracking System) e um software de triagem automatica. Quando uma vaga recebe 300 inscricoes, o RH nao le tudo — o ATS faz a triagem inicial procurando palavras-chave especificas, formato legivel e estrutura organizada. <strong>75% dos curriculos sao eliminados pelo ATS</strong> antes de qualquer humano ver.</p>
        <h2 className="text-xl font-medium">Os 5 erros que fazem seu curriculo ser eliminado</h2>
        <p><strong>1. Usar tabelas ou colunas.</strong> O ATS le o arquivo como texto puro — tabelas viram uma baguncinha ilegivel. Use coluna unica sem elementos graficos.</p>
        <p><strong>2. PDF criado a partir de imagem.</strong> O ATS nao extrai texto de imagens. Salve como PDF de texto ou .docx. Teste: se voce consegue copiar o texto do PDF, o ATS tambem consegue ler.</p>
        <p><strong>3. Nao usar as palavras-chave da vaga.</strong> Se a vaga pede "Gestao de Projetos" e voce escreveu "Gerenciamento de Projetos", o ATS pode nao reconhecer. Use as mesmas palavras da descricao.</p>
        <p><strong>4. Resumo generico.</strong> "Profissional proativo com facilidade de trabalho em equipe" nao pontua. Escreva: cargo-alvo + anos de experiencia + 2-3 habilidades especificas.</p>
        <p><strong>5. Resultados sem numeros.</strong> "Aumentei as vendas em 34% em 6 meses" pontua muito mais que "aumentei as vendas".</p>
        <h2 className="text-xl font-medium">Como otimizar: passo a passo</h2>
        <p><strong>Passo 1:</strong> Leia a vaga como checklist. Destaque todos os termos tecnicos, ferramentas e competencias. Esses termos precisam estar no seu curriculo.</p>
        <p><strong>Passo 2:</strong> Use estrutura limpa: Nome/contatos → Resumo (3-4 linhas) → Experiencia (cronologica inversa) → Formacao → Habilidades tecnicas. Sem tabelas, sem graficos.</p>
        <p><strong>Passo 3:</strong> Reescreva cada bullet: verbo de acao + o que fez + resultado com numero. Ex: "Liderou equipe de 8 vendedores, atingindo 118% da meta trimestral por 3 trimestres."</p>
        <p><strong>Passo 4:</strong> Calcule seu score antes de enviar. O CurriculoPro analisa seu curriculo contra a vaga e mostra exatamente quais keywords estao faltando.</p>
        <h2 className="text-xl font-medium">Resultado real</h2>
        <p>Curriculo nao otimizado: score ATS 30-50%. Curriculo otimizado para a vaga: 75-95%. Em vez de 50 curriculos sem retorno, 10 otimizados e 3-4 entrevistas.</p>
      </div>
      <div className="bg-gray-950 text-white rounded-xl p-6 mt-10">
        <h3 className="text-xl font-medium mb-2">Teste seu curriculo agora — gratis</h3>
        <p className="text-gray-300 mb-4">Cole seu curriculo e a descricao da vaga. Em 2 minutos voce ve seu score ATS e as keywords que estao faltando.</p>
        <Link href="/app" className="inline-block bg-white text-gray-950 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition">Ver meu score ATS →</Link>
      </div>
    </article>
  )
}
