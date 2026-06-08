import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'

export const maxDuration = 30

// Map subscription -> plan + credits.
function planFromInterval(interval?: string): {
  plan: string
  creditsLimit: number
} {
  if (interval === 'year') return { plan: 'annual', creditsLimit: 1000 }
  return { plan: 'pro', creditsLimit: 1000 }
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook não configurado.' },
        { status: 400 },
      )
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[v0] webhook signature error:', err)
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 })
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.supabase_user_id
        const plan = session.metadata?.plan ?? 'pro'
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (userId) {
          const { creditsLimit } = planFromInterval(
            plan === 'annual' ? 'year' : 'month',
          )
          await supabase
            .from('profiles')
            .update({
              plan,
              credits_limit: creditsLimit,
              credits_used: 0,
              stripe_customer_id: customerId,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId)

          await supabase.from('subscriptions').upsert(
            {
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              status: 'active',
              plan,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'stripe_subscription_id' },
          )
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.supabase_user_id
        const interval = sub.items.data[0]?.price.recurring?.interval
        const { plan, creditsLimit } = planFromInterval(interval)
        const active = sub.status === 'active' || sub.status === 'trialing'

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              plan: active ? plan : 'free',
              credits_limit: active ? creditsLimit : 2,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId)

          await supabase.from('subscriptions').upsert(
            {
              user_id: userId,
              stripe_customer_id: sub.customer as string,
              stripe_subscription_id: sub.id,
              status: sub.status,
              plan,
              current_period_end: new Date(
                // @ts-expect-error current_period_end exists on subscription
                sub.current_period_end * 1000,
              ).toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'stripe_subscription_id' },
          )
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const userId = sub.metadata?.supabase_user_id

        if (userId) {
          await supabase
            .from('profiles')
            .update({
              plan: 'free',
              credits_limit: 2,
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId)

          await supabase
            .from('subscriptions')
            .update({
              status: 'canceled',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', sub.id)
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error('[v0] webhook handler error:', err)
    return NextResponse.json(
      { error: 'Erro ao processar evento.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ received: true })
}
