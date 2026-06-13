"use client";
import React from 'react';
import Card from '../../components/ui/Card/Card';
import Button from '../../components/ui/Button/Button';
import Logo from '../../components/ui/Logo/Logo';

export default function AdminPage(){
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:16,background:'var(--color-white)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}><Logo /><strong>Admin</strong></div>
        <div><Button variant="secondary" onClick={()=>alert('Logout (backend)')}>Sair</Button></div>
      </header>
      <main style={{padding:24}}>
        <Card>
          <h1>Bem-vindo ao painel Admin</h1>
          <p>Este é um placeholder. Implemente funcionalidades de gestão aqui.</p>
        </Card>
      </main>
    </div>
  );
}
