'use client'

import { useRef, useState } from 'react'
import { Upload, FileText, Loader2, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export type AnalyzeInput = {
  resume_input: string
  job_description: string
  job_title: string
  company: string
}

export function InputPanel({
  onAnalyze,
  loading,
  creditsUsed,
  creditsLimit,
  plan,
}: {
  onAnalyze: (input: AnalyzeInput) => void
  loading: boolean
  creditsUsed: number
  creditsLimit: number
  plan: string
}) {
  const [mode, setMode] = useState<'upload' | 'paste'>('upload')
  const [resume, setResume] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [jobDesc, setJobDesc] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [parsing, setParsing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const remaining = Math.max(creditsLimit - creditsUsed, 0)
  const isUnlimited = plan !== 'free'

  const parsePdf = async (file: File) => {
    setParsing(true)
    try {
      const pdfjs = await import('pdfjs-dist')
      // Use the bundled worker
      pdfjs.GlobalWorkerOptions.workerSrc = (
        await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
      ).default
      const buffer = await file.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: buffer }).promise
      let text = ''
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        text +=
          content.items
            // @ts-expect-error pdfjs item typing
            .map((item) => item.str)
            .join(' ') + '\n'
      }
      setResume(text.trim())
      setFileName(file.name)
    } catch (err) {
      console.error('[v0] pdf parse error:', err)
      setFileName(null)
    } finally {
      setParsing(false)
    }
  }

  const handleFile = (file?: File) => {
    if (!file) return
    if (file.type === 'application/pdf') {
      parsePdf(file)
    }
  }

  const clearFile = () => {
    setResume('')
    setFileName(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const canSubmit =
    resume.trim().length > 0 && jobDesc.trim().length > 0 && !loading

  return (
    <div className="flex h-full flex-col">
      {/* Resume input */}
      <div>
        <Label className="text-sm font-medium">Seu currículo</Label>
        <div className="mt-3 inline-flex rounded-lg border border-border bg-secondary p-1">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              mode === 'upload'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground',
            )}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => setMode('paste')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors',
              mode === 'paste'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground',
            )}
          >
            Colar texto
          </button>
        </div>

        <div className="mt-3">
          {mode === 'upload' ? (
            fileName ? (
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      {fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {resume.length} caracteres extraídos
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Remover arquivo"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault()
                  setDragOver(false)
                  handleFile(e.dataTransfer.files?.[0])
                }}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors',
                  dragOver
                    ? 'border-primary bg-accent'
                    : 'border-border bg-card hover:border-primary/50',
                )}
              >
                {parsing ? (
                  <Loader2 className="size-6 animate-spin text-primary" />
                ) : (
                  <Upload className="size-6 text-muted-foreground" />
                )}
                <p className="mt-3 text-sm font-medium text-card-foreground">
                  {parsing
                    ? 'Lendo seu PDF...'
                    : 'Arraste seu currículo em PDF aqui'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  ou clique para selecionar
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
            )
          ) : (
            <Textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Cole aqui o conteúdo do seu currículo..."
              className="min-h-44 resize-none bg-card"
            />
          )}
        </div>
      </div>

      {/* Job description */}
      <div className="mt-6">
        <Label htmlFor="jobdesc" className="text-sm font-medium">
          Descrição da vaga
        </Label>
        <Textarea
          id="jobdesc"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          placeholder="Cole aqui a descrição completa da vaga que você quer conquistar..."
          className="mt-3 min-h-40 resize-none bg-card"
        />
      </div>

      {/* Optional fields */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobtitle" className="text-sm font-medium">
            Cargo{' '}
            <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="jobtitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Ex: Analista de Dados"
            className="bg-card"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="company" className="text-sm font-medium">
            Empresa{' '}
            <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Ex: Nubank"
            className="bg-card"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <Button
          className="w-full"
          size="lg"
          disabled={!canSubmit}
          onClick={() =>
            onAnalyze({
              resume_input: resume,
              job_description: jobDesc,
              job_title: jobTitle,
              company,
            })
          }
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Analisando...
            </>
          ) : (
            <>
              Analisar e otimizar
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          {isUnlimited
            ? 'Análises ilimitadas no seu plano'
            : remaining === 1
              ? '1 análise gratuita restante'
              : `${remaining} análises gratuitas restantes`}
        </p>
      </div>
    </div>
  )
}
