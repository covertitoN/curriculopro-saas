export type PlanId = 'free' | 'pro' | 'annual'

export type Plan = {
  id: PlanId
  name: string
  price: string
  priceSuffix: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  creditsLimit: number
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Grátis',
    price: 'R$0',
    priceSuffix: '/mês',
    description: 'Para experimentar e otimizar pontualmente.',
    features: [
      '2 análises por mês',
      'Score ATS completo',
      'Otimizador de palavras-chave',
      'Exportar em PDF',
    ],
    cta: 'Começar grátis',
    creditsLimit: 2,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$29',
    priceSuffix: '/mês',
    description: 'Para quem está em busca ativa de uma nova vaga.',
    features: [
      'Análises ilimitadas',
      'Score ATS completo',
      'Carta de apresentação gerada por IA',
      'Otimização de LinkedIn',
      'Dicas do recrutador',
      'Exportar em PDF e Word',
    ],
    cta: 'Assinar Pro',
    highlighted: true,
    creditsLimit: 1000,
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 'R$249',
    priceSuffix: '/ano',
    description: 'Todo o Pro com 2 meses grátis.',
    features: [
      'Tudo do plano Pro',
      'Análises ilimitadas',
      'Economize R$99 por ano',
      'Suporte prioritário',
    ],
    cta: 'Assinar Anual',
    creditsLimit: 1000,
  },
]
