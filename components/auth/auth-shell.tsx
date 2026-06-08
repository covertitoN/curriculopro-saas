import Link from 'next/link'

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2 text-foreground"
        >
          <span className="font-serif text-2xl">CurrículoPro</span>
        </Link>
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-balance font-serif text-3xl text-card-foreground">
              {title}
            </h1>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
