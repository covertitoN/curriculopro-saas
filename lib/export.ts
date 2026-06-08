'use client'

import { Document, Packer, Paragraph, TextRun } from 'docx'

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

export function exportPdf(title: string, content: string) {
  // Lightweight client-side PDF via the browser print dialog of a new window.
  const win = window.open('', '_blank')
  if (!win) return
  const safe = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  win.document.write(`<!doctype html><html><head><title>${title}</title>
    <meta charset="utf-8" />
    <style>
      body { font-family: Georgia, serif; max-width: 720px; margin: 48px auto; padding: 0 24px; color: #1A1A18; line-height: 1.6; }
      h1 { font-size: 20px; margin-bottom: 24px; }
      pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; }
    </style></head>
    <body><h1>${title}</h1><pre>${safe}</pre>
    <script>window.onload = () => { window.print(); }</script>
    </body></html>`)
  win.document.close()
}

export async function exportWord(title: string, content: string) {
  const paragraphs = content.split('\n').map(
    (line) =>
      new Paragraph({
        children: [new TextRun(line)],
      }),
  )

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: title, bold: true, size: 32 })],
          }),
          new Paragraph({ children: [new TextRun('')] }),
          ...paragraphs,
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title}.docx`
  a.click()
  URL.revokeObjectURL(url)
}
