import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'

export async function SiteNav() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          CurrículoPro
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#recursos"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Recursos
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Preços
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Blog
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Histórico
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/app">Abrir app</Link>
              </Button>
              <UserMenu email={user.email ?? ''} />
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/sign-up">Começar grátis</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
