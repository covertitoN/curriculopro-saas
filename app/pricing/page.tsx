import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PricingTable } from '@/components/pricing-table'
import { Toaster } from '@/components/ui/sonner'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Preços — CurrículoPro',
  description: 'Planos do CurrículoPro: Grátis, Pro e Anual.',
}

export default async function PricingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
              Preços simples, sem surpresas
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Comece grátis com 2 análises por mês. Faça upgrade quando precisar
              de mais.
            </p>
          </div>
          <div className="mt-14">
            <PricingTable isAuthed={!!user} />
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Pagamento seguro processado pela Stripe. Cancele quando quiser.
          </p>
        </section>
      </main>
      <SiteFooter />
      <Toaster position="top-center" />
    </div>
  )
}
