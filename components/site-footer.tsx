import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl">CurrículoPro</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Seu currículo, pronto para vencer o robô.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <Link href="/#recursos" className="hover:text-foreground">
            Recursos
          </Link>
          <Link href="/pricing" className="hover:text-foreground">
            Preços
          </Link>
          <Link href="/app" className="hover:text-foreground">
            Otimizar agora
          </Link>
          <Link href="/auth/login" className="hover:text-foreground">
            Entrar
          </Link>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} CurrículoPro. Feito para o mercado brasileiro.
        </div>
      </div>
    </footer>
  )
}
