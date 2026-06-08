import { scoreColorClasses } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ScoreCircle({
  score,
  size = 200,
}: {
  score: number
  size?: number
}) {
  const stroke = 14
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const colors = scoreColorClasses(score)

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn('transition-all duration-700 ease-out', colors.stroke)}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn('font-serif text-5xl', colors.text)}>{score}</span>
        <span className="text-xs text-muted-foreground">de 100</span>
      </div>
    </div>
  )
}
