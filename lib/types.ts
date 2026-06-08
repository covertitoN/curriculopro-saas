export type Keyword = {
  term: string
  reason?: string
}

export type AnalysisResult = {
  ats_score: number
  score_label: string
  score_desc: string
  keywords_found: string[]
  keywords_missing: string[]
  curriculo_otimizado: string
  carta_apresentacao: string
  dicas: string
}

export type AnalysisRecord = AnalysisResult & {
  id: string
  user_id: string
  job_title: string | null
  company: string | null
  job_description: string | null
  resume_input: string | null
  created_at: string
}

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  plan: 'free' | 'pro' | 'annual'
  credits_used: number
  credits_limit: number
  credits_reset_at: string
  stripe_customer_id: string | null
}

export function scoreColor(score: number): 'red' | 'yellow' | 'green' {
  if (score < 50) return 'red'
  if (score < 75) return 'yellow'
  return 'green'
}

export function scoreColorClasses(score: number): {
  text: string
  stroke: string
  bg: string
} {
  const c = scoreColor(score)
  if (c === 'red')
    return {
      text: 'text-destructive',
      stroke: 'stroke-destructive',
      bg: 'bg-destructive',
    }
  if (c === 'yellow')
    return {
      text: 'text-warning',
      stroke: 'stroke-warning',
      bg: 'bg-warning',
    }
  return {
    text: 'text-success',
    stroke: 'stroke-success',
    bg: 'bg-success',
  }
}
