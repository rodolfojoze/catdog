"use client";
import React, { useState } from 'react';
import FormContainer from '../../../components/ui/FormContainer/FormContainer';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import Alert from '../../../components/ui/Alert/Alert';
import Logo from '../../../components/ui/Logo/Logo';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Placeholder: call useAuth().register in TASK-AUTH-002
    setTimeout(() => {
      setLoading(false);
      setError(null);
      alert('Registro simulado: verifique seu e-mail (fluxo backend necessário)');
    }, 800);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div>
        <Logo />
        <FormContainer title="Criar Conta" onSubmit={handleSubmit}>
          <Input label="Nome completo" name="name" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Senha" name="password" type="password" required />
          <Input label="Confirmar Senha" name="passwordConfirm" type="password" required />
          {error && <Alert type="error" message={error} />}
          <Button variant="primary" type="submit" disabled={loading}>{loading? 'Aguarde...':'Criar Conta'}</Button>
          <p style={{textAlign:'center'}}>Já tem conta? <a href="/auth/login">Fazer login</a></p>
        </FormContainer>
      </div>
    </div>
  );
}
