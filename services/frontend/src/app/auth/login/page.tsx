"use client";
import React, { useState } from 'react';
import FormContainer from '../../../components/ui/FormContainer/FormContainer';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import Alert from '../../../components/ui/Alert/Alert';
import Logo from '../../../components/ui/Logo/Logo';

export default function LoginPage(){
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState(false);

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(()=>{setLoading(false); alert('Login simulado');},700);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div>
        <Logo />
        <FormContainer title="Fazer Login" onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" required />
          <Input label="Senha" name="password" type="password" required />
          {error && <Alert type="error" message={error} />}
          {loading && <Alert type="warning" message="Entrando..." />}
          <Button variant="primary" type="submit">Entrar</Button>
          <p style={{textAlign:'center'}}>Não tem conta? <a href="/auth/register">Criar uma</a></p>
        </FormContainer>
      </div>
    </div>
  );
}
