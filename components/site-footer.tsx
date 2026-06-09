import Link from "next/link"
export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-semibold text-lg">CurriculoPro</Link>
            <p className="text-sm text-gray-500 mt-2">Seu curriculo otimizado para passar pelo robo ATS.</p>
          </div>
          <div><h3 className="text-sm font-medium mb-3">Produto</h3><ul className="space-y-2"><li><Link href="/app" className="text-sm text-gray-500 hover:text-gray-900">Analisar curriculo</Link></li><li><Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Planos e precos</Link></li></ul></div>
          <div><h3 className="text-sm font-medium mb-3">Conteudo</h3><ul className="space-y-2"><li><Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link></li><li><Link href="/blog/como-otimizar-curriculo-ats" className="text-sm text-gray-500 hover:text-gray-900">O que e ATS?</Link></li></ul></div>
          <div><h3 className="text-sm font-medium mb-3">Legal</h3><ul className="space-y-2"><li><Link href="/privacidade" className="text-sm text-gray-500 hover:text-gray-900">Privacidade</Link></li><li><Link href="/termos" className="text-sm text-gray-500 hover:text-gray-900">Termos</Link></li><li><a href="mailto:suporte@curriculopro.com.br" className="text-sm text-gray-500 hover:text-gray-900">Suporte</a></li></ul></div>
        </div>
        <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
          <p className="text-xs text-gray-400">© 2026 CurriculoPro. Todos os direitos reservados.</p>
          <p className="text-xs text-gray-400">Feito no Brasil 🇧🇷</p>
        </div>
      </div>
    </footer>
  )
}
