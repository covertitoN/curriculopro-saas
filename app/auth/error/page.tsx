import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="Algo deu errado"
      subtitle="Não foi possível completar a autenticação. Tente novamente."
    >
      <Button asChild className="w-full">
        <Link href="/auth/login">Voltar ao login</Link>
      </Button>
    </AuthShell>
  )
}
