"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '../../../components/ui/Card/Card';
import Button from '../../../components/ui/Button/Button';
import Alert from '../../../components/ui/Alert/Alert';
import Logo from '../../../components/ui/Logo/Logo';

type State = 'sent' | 'expired' | 'confirmed';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<State>('sent');

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'confirmed') setState('confirmed');
    else if (status === 'expired') setState('expired');
  }, [searchParams]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div>
        <Logo />
        <Card>
          {state === 'sent' && (
            <div>
              <h2>Verifique seu Email</h2>
              <p>Enviamos um link de confirmação para seu e-mail. Clique no link recebido para ativar sua conta.</p>
              <Button onClick={() => alert('Re-enviar email (backend necessário)')}>Re-enviar Email</Button>
            </div>
          )}
          {state === 'expired' && (
            <div>
              <Alert type="error" message="Link de verificação expirado." />
              <Button onClick={() => alert('Solicitar novo link (backend necessário)')}>Solicitar novo link</Button>
            </div>
          )}
          {state === 'confirmed' && (
            <div>
              <Alert type="success" message="Email confirmado! Você já pode fazer login." />
              <Button onClick={() => window.location.href = '/auth/login'}>Ir para Login</Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
