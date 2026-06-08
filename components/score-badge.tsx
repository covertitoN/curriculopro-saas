import { scoreColorClasses } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ScoreBadge({ score }: { score: number }) {
  const colors = scoreColorClasses(score)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        score < 50
          ? 'bg-destructive/15 text-destructive'
          : score < 75
            ? 'bg-warning/15 text-warning-foreground'
            : 'bg-success/15 text-success',
      )}
    >
      <span className={cn('size-1.5 rounded-full', colors.bg)} />
      {score}
    </span>
  )
}
