import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SiteNav } from '@/components/site-nav'
import { Toaster } from '@/components/ui/sonner'
import { AppWorkspace } from '@/components/app/app-workspace'

export const metadata = {
  title: 'Otimizar currículo — CurrículoPro',
}

export default async function AppPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/app')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, credits_used, credits_limit')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8">
          <h1 className="font-serif text-3xl">Otimizar currículo</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Envie seu currículo, cole a vaga e deixe a IA fazer o resto.
          </p>
        </div>
      </div>
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <AppWorkspace
          initialCreditsUsed={profile?.credits_used ?? 0}
          creditsLimit={profile?.credits_limit ?? 2}
          plan={profile?.plan ?? 'free'}
        />
      </main>
      <Toaster position="top-center" />
    </div>
  )
}
