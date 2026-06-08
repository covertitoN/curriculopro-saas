'use client'

import { useState } from 'react'
import { InputPanel, type AnalyzeInput } from '@/components/app/input-panel'
import { ResultsPanel } from '@/components/app/results-panel'
import type { AnalysisResult } from '@/lib/types'
import { toast } from 'sonner'

export function AppWorkspace({
  initialCreditsUsed,
  creditsLimit,
  plan,
}: {
  initialCreditsUsed: number
  creditsLimit: number
  plan: string
}) {
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [creditsUsed, setCreditsUsed] = useState(initialCreditsUsed)

  const handleAnalyze = async (input: AnalyzeInput) => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Erro ao analisar.')
        if (typeof data.credits_used === 'number') {
          setCreditsUsed(data.credits_used)
        }
        setLoading(false)
        return
      }

      setResult(data as AnalysisResult)
      if (typeof data.credits_used === 'number') {
        setCreditsUsed(data.credits_used)
      }
      toast.success('Análise concluída!')
    } catch {
      toast.error('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid flex-1 lg:grid-cols-2 lg:divide-x lg:divide-border">
      <div className="border-b border-border p-6 sm:p-8 lg:border-b-0">
        <InputPanel
          onAnalyze={handleAnalyze}
          loading={loading}
          creditsUsed={creditsUsed}
          creditsLimit={creditsLimit}
          plan={plan}
        />
      </div>
      <div className="bg-card/30 p-6 sm:p-8">
        <ResultsPanel result={result} loading={loading} />
      </div>
    </div>
  )
}
