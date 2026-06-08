import Link from 'next/link'
import { AuthShell } from '@/components/auth/auth-shell'
import { Button } from '@/components/ui/button'

export default function SignUpSuccessPage() {
  return (
    <AuthShell
      title="Confira seu email"
      subtitle="Enviamos um link de confirmação. Confirme seu email para ativar sua conta."
    >
      <Button asChild className="w-full">
        <Link href="/auth/login">Ir para o login</Link>
      </Button>
    </AuthShell>
  )
}
