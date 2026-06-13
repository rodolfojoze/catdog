"use client";
import React from 'react';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import Logo from '../../components/ui/Logo/Logo';

export default function AdotantePage(){
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:16,background:'var(--color-white)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}><Logo /><strong>Adotante</strong></div>
        <div><Button variant="secondary" onClick={()=>alert('Logout (backend)')}>Sair</Button></div>
      </header>
      <main style={{padding:24}}>
        <Card>
          <h1>Bem-vindo ao painel Adotante</h1>
          <p>Este é um placeholder. Navegue pelo catálogo de animais aqui.</p>
        </Card>
      </main>
    </div>
  );
}
