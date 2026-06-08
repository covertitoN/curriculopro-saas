import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Sparkles, Briefcase, Building2, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { SiteNav } from '@/components/site-nav'
import { ScoreBadge } from '@/components/score-badge'
import { Button } from '@/components/ui/button'
import type { AnalysisRecord } from '@/lib/types'

export const metadata = {
  title: 'Histórico — CurrículoPro',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/dashboard')
  }

  const { data: analyses } = await supabase
    .from('analyses')
    .select(
      'id, job_title, company, ats_score, score_label, created_at',
    )
    .order('created_at', { ascending: false })

  const records = (analyses ?? []) as Pick<
    AnalysisRecord,
    'id' | 'job_title' | 'company' | 'ats_score' | 'score_label' | 'created_at'
  >[]

  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl">Seu histórico</h1>
            <p className="mt-2 text-muted-foreground">
              Todas as análises que você já fez.
            </p>
          </div>
          <Button asChild>
            <Link href="/app">Nova análise</Link>
          </Button>
        </div>

        {records.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-accent">
              <Sparkles className="size-7 text-accent-foreground" />
            </div>
            <h2 className="mt-6 font-serif text-2xl">
              Nenhuma análise ainda
            </h2>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Faça sua primeira análise para ver o histórico aqui com score ATS,
              cargo e empresa.
            </p>
            <Button asChild className="mt-6">
              <Link href="/app">Analisar currículo</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {records.map((r) => (
              <div
                key={r.id}
                className="flex flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 truncate font-serif text-xl text-card-foreground">
                      <Briefcase className="size-4 shrink-0 text-muted-foreground" />
                      {r.job_title || 'Vaga sem título'}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="size-4 shrink-0" />
                      {r.company || 'Empresa não informada'}
                    </p>
                  </div>
                  <ScoreBadge score={r.ats_score} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {formatDate(r.created_at)}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {r.score_label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
