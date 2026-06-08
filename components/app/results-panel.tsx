'use client'

import { useState } from 'react'
import { Sparkles, Copy, FileDown, FileText, Check, Loader2 } from 'lucide-react'
import type { AnalysisResult } from '@/lib/types'
import { scoreColorClasses } from '@/lib/types'
import { ScoreCircle } from '@/components/app/score-circle'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { copyText, exportPdf, exportWord } from '@/lib/export'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function ResultsPanel({
  result,
  loading,
}: {
  result: AnalysisResult | null
  loading: boolean
}) {
  if (loading) return <LoadingState />
  if (!result) return <EmptyState />

  const colors = scoreColorClasses(result.ats_score)

  return (
    <div className="flex h-full flex-col">
      {/* Score */}
      <div className="flex flex-col items-center text-center">
        <ScoreCircle score={result.ats_score} />
        <p className={cn('mt-4 font-serif text-2xl', colors.text)}>
          {result.score_label}
        </p>
        <p className="mt-1 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {result.score_desc}
        </p>
      </div>

      {/* Keywords */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-foreground">
            Encontradas{' '}
            <span className="text-muted-foreground">
              ({result.keywords_found.length})
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.keywords_found.length === 0 && (
              <span className="text-sm text-muted-foreground">Nenhuma</span>
            )}
            {result.keywords_found.map((k) => (
              <span
                key={k}
                className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Faltando{' '}
            <span className="text-muted-foreground">
              ({result.keywords_missing.length})
            </span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {result.keywords_missing.length === 0 && (
              <span className="text-sm text-muted-foreground">Nenhuma</span>
            )}
            {result.keywords_missing.map((k) => (
              <span
                key={k}
                className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs font-medium text-warning-foreground"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="curriculo" className="mt-8 flex flex-1 flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="curriculo">Currículo otimizado</TabsTrigger>
          <TabsTrigger value="carta">Carta de apresentação</TabsTrigger>
          <TabsTrigger value="dicas">Dicas do recrutador</TabsTrigger>
        </TabsList>

        <TabsContent value="curriculo" className="mt-4">
          <ContentBlock
            title="Currículo otimizado"
            content={result.curriculo_otimizado}
          />
        </TabsContent>
        <TabsContent value="carta" className="mt-4">
          <ContentBlock
            title="Carta de apresentação"
            content={result.carta_apresentacao}
          />
        </TabsContent>
        <TabsContent value="dicas" className="mt-4">
          <ContentBlock
            title="Dicas do recrutador"
            content={result.dicas}
            exportable={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ContentBlock({
  title,
  content,
  exportable = true,
}: {
  title: string
  content: string
  exportable?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleCopy = async () => {
    await copyText(content)
    setCopied(true)
    toast.success('Copiado para a área de transferência')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWord = async () => {
    setExporting(true)
    try {
      await exportWord(title, content)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-end gap-2 border-b border-border p-3">
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copiar
        </Button>
        {exportable && (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => exportPdf(title, content)}
            >
              <FileDown className="size-4" />
              PDF
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleWord}
              disabled={exporting}
            >
              {exporting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}
              Word
            </Button>
          </>
        )}
      </div>
      <div className="max-h-[28rem] overflow-y-auto p-5">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-card-foreground">
          {content}
        </pre>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-96 flex-col items-center justify-center text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-accent">
        <Sparkles className="size-7 text-accent-foreground" />
      </div>
      <h3 className="mt-6 font-serif text-2xl text-foreground">
        Seus resultados aparecem aqui
      </h3>
      <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
        Envie seu currículo e cole a descrição da vaga para receber o score ATS,
        palavras-chave e a versão otimizada.
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center">
        <Skeleton className="size-48 rounded-full" />
        <Skeleton className="mt-4 h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-64" />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </div>
      <Skeleton className="mt-8 h-10 w-full rounded-lg" />
      <Skeleton className="mt-4 h-64 w-full rounded-xl" />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Analisando seu currículo com IA...
      </p>
    </div>
  )
}
