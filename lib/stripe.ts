import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

// Pricing in centavos (BRL)
export const PLAN_PRICING: Record<
  string,
  { amount: number; interval: 'month' | 'year'; name: string }
> = {
  pro: { amount: 2900, interval: 'month', name: 'CurrículoPro Pro (Mensal)' },
  annual: { amount: 24900, interval: 'year', name: 'CurrículoPro Pro (Anual)' },
}
