import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CurrículoPro — Otimize seu currículo para o robô ATS',
  description:
    'Otimizador de currículos com IA para o mercado brasileiro. Score ATS, palavras-chave, carta de apresentação e otimização de LinkedIn.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
