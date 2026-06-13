# MAKUCO.md

This file provides guidance for Makuco agents.

## What is Catdog?

Catdog é uma plataforma de adoção de animais voltada para uma única organização (ONG). Seu propósito é centralizar o cadastro e a divulgação dos animais disponíveis para adoção, permitir que adotantes registrem interesse de adoção e oferecer aos administradores uma forma estruturada de controlar o processo de análise. O sistema é monorepo com backend NestJS e frontend Next.js, integrado ao Supabase para autenticação, banco de dados PostgreSQL e armazenamento de fotos.

## Tech Stack

- **Linguagem:** TypeScript
- **Runtime:** Node.js
- **Backend:** NestJS (REST API, porta 3001)
- **Frontend:** Next.js 14 (App Router, porta 3000)
- **Banco de dados:** PostgreSQL via Supabase (acesso via Prisma)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (fotos dos animais)
- **Gerenciador de pacotes:** npm
- **Monorepo:** `services/backend/` e `services/frontend/`

## Architecture

### Backend (`services/backend/src/`)
- Entry point: `src/main.ts` — inicializa o NestJS na porta 3001
- Módulos: `src/modules/<dominio>/` — cada domínio tem seu próprio módulo NestJS com controller, service e repository
- Shared: `src/common/` — guards, decorators, filters e pipes reutilizáveis
- Config: `src/config/` — variáveis de ambiente e configuração do Prisma

### Frontend (`services/frontend/src/`)
- Entry point: `src/app/layout.tsx` — root layout do Next.js App Router
- Páginas: `src/app/` — rotas do sistema usando App Router
  - `auth/login` — tela de login
  - `auth/register` — tela de cadastro
  - `auth/verify-email` — confirmação de e-mail
  - `admin/` — painel administrativo da ONG
  - `adotante/` — área do adotante
- Componentes: `src/components/ui/` — biblioteca de componentes reutilizáveis
- Estilos: `src/styles/globals.css` — design tokens e reset global

## Code Rules

- **Nunca use `any`** — sempre tipagem explícita
- **Idioma do projeto:** Português (BR) — mensagens de erro, labels, comentários e documentação
- **Path alias:** `@/*` mapeia para `src/*` (configurado no `tsconfig.json`)
- **Componentes Next.js:** use `"use client"` apenas quando necessário (eventos, hooks de estado); páginas server-side não precisam da diretiva
- **Imports:** sempre use barras (`/`), nunca barras invertidas (`\`)
- **API prefix:** todas as rotas do backend usam o prefixo `/api`

## Design System

Os tokens de design estão em `services/frontend/src/styles/globals.css`:

| Token | Valor | Uso |
|---|---|---|
| `--color-white` | #FFFFFF | Fundos de cards e header |
| `--color-bg-light` | #F5F5F5 | Background da página |
| `--color-text-dark` | #333333 | Texto principal |
| `--color-text-light` | #666666 | Texto secundário |
| `--color-border` | #E0E0E0 | Bordas e divisores |
| `--color-success` | #27AE60 | Alertas de sucesso |
| `--color-error` | #E74C3C 	| Alertas de erro |
| `--color-warning` | #F39C12 | Alertas de aviso |

### Componentes disponíveis em `src/components/ui/`

- `Button` — variantes `primary` e `secondary`
- `Input` — campo com label e mensagem de erro
- `FormContainer` — wrapper de formulário com título e subtítulo
- `Card` — container visual para conteúdo
- `Alert` — tipos `success`, `error`, `warning`
- `Logo` — logotipo do Catdog

## Domínios do Sistema

| Domínio | Descrição |
|---|---|
| Animais | Cadastro, edição e inativação de animais disponíveis |
| Espécies | Cadastro simples de espécies (ex: cão, gato) |
| Solicitações | Registro e acompanhamento do fluxo de adoção |
| Auth | Autenticação de administradores via Supabase Auth |

## Status dos Fluxos de Adoção

`Formulário` → `Envio da documentação` → `Entrevista` → `Visita domiciliar` → `Aprovação final`

## Key Patterns

- Monorepo: cada serviço tem seu próprio `package.json` e `tsconfig.json`
- vscode codegenerator maps to `.github/` folder; claude maps to `.claude/`
- O projeto é em Português (BR) — prompts, mensagens de erro e documentação
- Autenticação é exclusiva para administradores da ONG; adotantes não criam conta
