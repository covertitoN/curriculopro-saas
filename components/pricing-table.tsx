'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import { PLANS } from '@/lib/plans'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function PricingTable({ isAuthed = false }: { isAuthed?: boolean }) {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  const handleSelect = async (planId: string) => {
    if (planId === 'free') {
      router.push(isAuthed ? '/app' : '/auth/sign-up')
      return
    }

    if (!isAuthed) {
      router.push(`/auth/login?next=/pricing`)
      return
    }

    setLoadingPlan(planId)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        toast.error(data.error ?? 'Erro ao iniciar o checkout.')
        setLoadingPlan(null)
        return
      }
      window.location.href = data.url
    } catch {
      toast.error('Erro de conexão. Tente novamente.')
      setLoadingPlan(null)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'relative flex flex-col rounded-2xl border bg-card p-8',
            plan.highlighted
              ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary'
              : 'border-border',
          )}
        >
          {plan.highlighted && (
            <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Mais popular
            </span>
          )}
          <h3 className="font-serif text-2xl text-card-foreground">
            {plan.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {plan.description}
          </p>
          <div className="mt-6 flex items-baseline gap-1">
            <span className="font-serif text-4xl text-card-foreground">
              {plan.price}
            </span>
            <span className="text-sm text-muted-foreground">
              {plan.priceSuffix}
            </span>
          </div>
          <ul className="mt-8 flex flex-1 flex-col gap-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-card-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="mt-8 w-full"
            variant={plan.highlighted ? 'default' : 'outline'}
            disabled={loadingPlan === plan.id}
            onClick={() => handleSelect(plan.id)}
          >
            {loadingPlan === plan.id ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Redirecionando...
              </>
            ) : (
              plan.cta
            )}
          </Button>
        </div>
      ))}
    </div>
  )
}
