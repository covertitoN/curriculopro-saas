import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, PLAN_PRICING } from '@/lib/stripe'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
    }

    const { plan } = (await req.json()) as { plan?: string }
    if (!plan || !PLAN_PRICING[plan]) {
      return NextResponse.json({ error: 'Plano inválido.' }, { status: 400 })
    }

    const pricing = PLAN_PRICING[plan]
    const origin =
      req.headers.get('origin') ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000'

    // Reuse or create a Stripe customer.
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    let customerId = profile?.stripe_customer_id ?? undefined
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? profile?.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: pricing.name },
            unit_amount: pricing.amount,
            recurring: { interval: pricing.interval },
          },
          quantity: 1,
        },
      ],
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: {
        metadata: { supabase_user_id: user.id, plan },
      },
      success_url: `${origin}/app?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[v0] checkout error:', err)
    return NextResponse.json(
      { error: 'Erro ao iniciar o checkout.' },
      { status: 500 },
    )
  }
}
