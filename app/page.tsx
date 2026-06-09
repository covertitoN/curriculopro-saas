import Link from 'next/link'
import { ArrowRight, Gauge, Tags, FileText, Star, Globe } from 'lucide-react'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { PricingTable } from '@/components/pricing-table'
import { Button } from '@/components/ui/button'

const FEATURES = [
  {
    icon: Gauge,
    title: 'Score ATS',
    desc: 'Veja em segundos a nota de 0 a 100 do seu currículo nos sistemas de triagem automática.',
  },
  {
    icon: Tags,
    title: 'Otimizador de palavras-chave',
    desc: 'Identifique termos que faltam na sua vaga e que o robô procura para aprovar candidatos.',
  },
  {
    icon: FileText,
    title: 'Carta de apresentação',
    desc: 'Gere uma carta personalizada para a vaga, no tom certo para o recrutador brasileiro.',
  },
  {
    icon: Globe,
    title: 'otimização de LinkedIn',
    desc: 'Receba dicas para alinhar seu perfil do LinkedIn com a vaga e atrair recrutadores.',
  },
]

const PROOF = [
  {
    quote:
      'Apliquei para 12 vagas e não recebia retorno. Otimizei pelo CurrículoPro e fui chamada para 3 entrevistas na mesma semana.',
    name: 'Mariana Alves',
    role: 'Analista de Marketing',
  },
  {
    quote:
      'O score ATS me abriu os olhos. Meu currículo passou de 48 para 91 e finalmente comecei a ser chamado.',
    name: 'Rafael Souza',
    role: 'Desenvolvedor de Software',
  },
  {
    quote:
      'A carta de apresentação gerada economizou horas do meu tempo e ficou melhor do que eu escreveria.',
    name: 'Juliana Costa',
    role: 'Gerente de Projetos',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  otimização com IA para o mercado brasileiro
                </span>
                <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] md:text-6xl">
                  Seu currículo, pronto para vencer o robô.
                </h1>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                  76% dos currículos são descartados por sistemas ATS antes de
                  chegarem a um humano. O CurrículoPro analisa, pontua e otimiza
                  o seu para passar na triagem.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/app">
                      Analisar meu currículo
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pricing">Ver planos</Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  grátis para começar · 3 análises por mês · Sem cartão
                </p>
              </div>
              <ScorePreview />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="recursos" className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-balance font-serif text-4xl leading-tight">
                Tudo o que você precisa para ser chamado
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Quatro ferramentas em uma só plataforma, pensadas para o jeito
                brasileiro de recrutar.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <f.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-card-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <h2 className="mt-4 text-balance font-serif text-4xl leading-tight">
                Mais de 12.000 currículos otimizados
              </h2>
              <p className="mt-3 text-muted-foreground">
                Profissionais que pararam de ser ignorados pelos robôs.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PROOF.map((p) => (
                <figure
                  key={p.name}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6"
                >
                  <blockquote className="flex-1 text-pretty leading-relaxed text-card-foreground">
                    {`â€œ${p.quote}â€`}
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="font-medium text-card-foreground">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance font-serif text-4xl leading-tight">
                Comece grátis. Faça upgrade quando precisar.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Sem pegadinhas. Cancele a qualquer momento.
              </p>
            </div>
            <div className="mt-14">
              <PricingTable />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border/60">
          <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
            <h2 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
              Pare de ser descartado pelo robô.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              Faça sua primeira análise gratuita agora e veja exatamente o que
              está travando o seu currículo.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/app">
                Otimizar meu currículo grátis
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function ScorePreview() {
  const score = 91
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-xl shadow-foreground/5">
      <p className="text-sm font-medium text-muted-foreground">Score ATS</p>
      <div className="mt-6 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <svg width="180" height="180" className="-rotate-90">
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              strokeWidth="12"
              className="stroke-muted"
            />
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="stroke-success"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-serif text-5xl text-card-foreground">
              {score}
            </span>
            <span className="text-xs text-muted-foreground">de 100</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center font-medium text-success">
        Excelente compatibilidade
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {['Liderança', 'SQL', 'Gestão ágil', 'Power BI'].map((k) => (
          <span
            key={k}
            className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground"
          >
            {k}
          </span>
        ))}
        {['Inglês fluente', 'OKRs'].map((k) => (
          <span
            key={k}
            className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs text-warning-foreground"
          >
            {`${k} · falta`}
          </span>
        ))}
      </div>
    </div>
  )
}

