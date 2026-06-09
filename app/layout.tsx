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
  title: 'CurrÃ­culoPro â€” Otimize seu currÃ­culo para o robÃ´ ATS',
  description:
    'Otimizador de currÃ­culos com IA para o mercado brasileiro. Score ATS, palavras-chave, carta de apresentaÃ§Ã£o e otimizaÃ§Ã£o de LinkedIn.',
  generator: 'v0.app',
}

import { SiteFooter } from "@/components/site-footer"
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
      <SiteFooter /></body>
    </html>
  )
}
