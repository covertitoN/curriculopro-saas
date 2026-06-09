import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Palavras-chave no Currículo por Área Profissional | CurrículoPro',
  description: 'Descubra as palavras-chave essenciais para o seu currículo passar no ATS em TI, Marketing, Finanças, RH e Vendas. Guia completo 2026.',
  openGraph: { title: 'Palavras-chave no Currículo por Área Profissional', type: 'article' },
}

const AREAS = [
  { id: 'ti', title: 'Tecnologia da Informação (TI)', keywords: ['React / Next.js / Vue.js','Node.js / Python / Java','SQL / PostgreSQL','Docker / Kubernetes','AWS / GCP / Azure','CI/CD / DevOps','Scrum / Kanban','REST API / GraphQL','Git / GitHub','TypeScript'], tip: 'Nunca escreva apenas "desenvolvimento web". Especifique: "desenvolvimento front-end com React e TypeScript".' },
  { id: 'marketing', title: 'Marketing Digital', keywords: ['SEO / SEM / Google Ads','Meta Ads / Facebook Ads','Google Analytics / GA4','CRM / HubSpot / RD Station','Inbound Marketing','Copywriting / UX Writing','Funil de vendas','KPI / ROI / CAC / LTV','A/B Testing','Branding / Identidade visual'], tip: 'Inclua resultados com números: "Aumentei o tráfego orgânico em 140% em 6 meses via SEO".' },
  { id: 'financas', title: 'Finanças e Contabilidade', keywords: ['IFRS / CPC / Contabilidade societária','Planejamento financeiro / FP&A','Fluxo de caixa / DRE / Balanço','SAP / Oracle / TOTVS','Excel avançado / Power BI','Auditoria interna / Compliance','Gestão de riscos','CRC / CFA / CPA-20','Conciliação bancária','Budget / Forecast / Capex'], tip: 'Liste certificações no formato completo: "CPA-20 — ANBIMA".' },
  { id: 'rh', title: 'Recursos Humanos', keywords: ['Recrutamento e seleção / R&S','Employer Branding','People Analytics','Gestão de desempenho / PDI','Onboarding / Offboarding','Folha de pagamento / eSocial','CLT / Legislação trabalhista','Treinamento e desenvolvimento / T&D','HRBP / Business Partner','OKR / Gestão por objetivos'], tip: 'Se migrou de RH operacional para HRBP, deixe isso explícito no resumo profissional.' },
  { id: 'vendas', title: 'Vendas e Comercial', keywords: ['Inside Sales / Field Sales','SDR / BDR / Account Executive','CRM / Salesforce / Pipedrive','Prospecção ativa / Cold call','Funil de vendas / Pipeline','Cota / Meta / OTE','Vendas consultivas / Solution Selling','Churn / Retenção / Upsell','SPIN Selling / MEDDIC','NPS / Satisfação do cliente'], tip: 'Quantifique TUDO: "Atingi 120% da cota por 3 trimestres, gerando R$ 2,4M em receita".' },
]

export default function PalavrasChavePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="flex-1">
        <section className="border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground">Blog</Link>
              <span>›</span>
              <span className="text-foreground">Palavras-chave por área</span>
            </nav>
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">Guia Completo · 10 min de leitura</span>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Palavras-chave no Currículo por Área Profissional</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">Os sistemas ATS filtram currículos por palavras-chave específicas. Saiba exatamente quais termos usar em TI, Marketing, Finanças, RH e Vendas para passar pela triagem automática.</p>
          </div>
        </section>

        {AREAS.map((area) => (
          <section key={area.id} id={area.id} className="border-b border-border/60">
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
              <h2 className="font-serif text-3xl">{area.title}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {area.keywords.map((kw) => (
                  <span key={kw} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-card-foreground">{kw}</span>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <p className="text-sm leading-relaxed"><span className="font-medium">Dica: </span>{area.tip}</p>
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
            <h2 className="font-serif text-3xl md:text-4xl">Descubra quais keywords faltam no seu currículo</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">O CurrículoPro analisa seu currículo contra a vaga e aponta exatamente os termos que o ATS está buscando e não encontrou.</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg"><Link href="/app">Analisar grátis <ArrowRight className="size-4" /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/pricing">Ver planos</Link></Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">3 análises gratuitas · Sem cartão</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}