# TASK-AUTH-001 — Implementar backend de autenticação inicial

**Root**: `services/backend/`
**Branch**: `feature/TASK-AUTH-001-login-register`
**Spec**: `.makuco/specs/module_001_auth/feature_001_auth_login_register/spec_context.md`
**Part**: 1 of 1 — Auth backend
**Generated**: 2026-06-07

## Context
Implementar o backend de autenticação do Catdog para registro, confirmação de e-mail, login, refresh de sessão e logout. Esta tarefa entrega o ciclo de tokens e a validação de `role` necessária para suportar o fluxo de login do frontend sem amarrar a implementação a um provider de e-mail específico.

## Scope
**In:**
- Criar o módulo de autenticação em `services/backend/src/modules/auth/`
- Expor endpoints de `register`, `confirm-email`, `login`, `refresh`, `logout` e `me`
- Persistir usuário com `emailConfirmed`, `role` e hash de senha
- Gerar access token JWT e refresh token seguro
- Implementar validação de refresh token e rotação/invalidação de sessão
- Definir DTOs de request/response para auth

**Out:**
- Não implementar páginas React ou guards de rota no frontend
- Não construir painéis `admin` ou `adotante` além dos endpoints de auth
- Não integrar um serviço de e-mail concreto além de um `EmailService` abstrato
- Não implementar OAuth/social login ou SSO
- Não adicionar auditoria de sessão avançada ou métricas de autenticação

## Ubiquitous Language
| Business Term | Code Mapping |
|---|---|
| `emailConfirmed` | `User.emailConfirmed: boolean` |
| `refreshToken` | long-lived token validado pelo endpoint de refresh e enviado em cookie HttpOnly |
| `role` | perfil de usuário, valores `admin` ou `adotante` |

## Files
| Action | Path | Why |
|---|---|---|
| create | `services/backend/src/modules/auth/auth.controller.ts` | auth HTTP handlers |
| create | `services/backend/src/modules/auth/auth.service.ts` | token e fluxo de auth |
| create | `services/backend/src/modules/auth/auth.routes.ts` | roteamento de endpoints auth |
| create | `services/backend/src/modules/auth/auth.dto.ts` | schemas de request/response |

## Implementation

### `auth.controller.ts` *(create)*
**Reference pattern**: no repo, usar controlador REST auth padrão.
**Differences from reference**:
- Expor endpoints `register`, `confirmEmail`, `login`, `refresh`, `logout`, `me`
- Retornar payload de usuário com `id`, `name`, `email`, `role`, `emailConfirmed`
- Configurar refresh token em cookie HttpOnly quando possível

### `auth.service.ts` *(create)*
**Reference pattern**: no repo, usar serviço auth padrão.
**Differences from reference**:
- Criar usuário público sempre como `role = 'adotante'`
- Criar contas em estado pendente com `emailConfirmed = false`
- Gerar token de confirmação de e-mail e delegar envio ao `EmailService`
- Bloquear login antes da confirmação de e-mail
- Emitir access token JWT e refresh token seguro
- Validar refresh token e rotacionar/invalidate tokens em `refresh`
- Expor lookup `me` por payload de access token

### `auth.routes.ts` *(create)*
**Reference pattern**: rota Express/Node genérica.
**Differences from reference**:
- Montar `/api/auth` com rotas listadas no escopo
- Aplicar middleware de auth apenas em `me` e `logout`
- Deixar `EmailService` pluggable para integração futura

### `auth.dto.ts` *(create)*
**Reference pattern**: módulo DTO típico de validação.
**Differences from reference**:
- Definir `RegisterRequest`, `LoginRequest`, `ConfirmEmailRequest`, `RefreshRequest`, `AuthResponse`
- Incluir regras de validação de formato de e-mail e confirmação de senha

## Acceptance Criteria
- [ ] **Given** nome, e-mail válido, senha e confirmação iguais, **When** `POST /api/auth/register` is chamado, **Then** um usuário pendente é criado com `emailConfirmed=false` e `EmailService.sendConfirmationEmail` é invocado.
- [ ] **Given** um e-mail já cadastrado, **When** `POST /api/auth/register` é chamado, **Then** retorna `400` e nenhum novo usuário é criado.
- [ ] **Given** token de confirmação válido, **When** `GET /api/auth/confirm-email?token=...` é chamado, **Then** o usuário é marcado como `emailConfirmed=true` e o token não pode ser reutilizado.
- [ ] **Given** token de confirmação inválido ou expirado, **When** `GET /api/auth/confirm-email?token=...` é chamado, **Then** retorna `400` e o usuário permanece pendente.
- [ ] **Given** credenciais corretas e `emailConfirmed=true`, **When** `POST /api/auth/login` é chamado, **Then** retorna access token, payload de usuário com `role` e cookie de refresh token.
- [ ] **Given** credenciais corretas e `emailConfirmed=false`, **When** `POST /api/auth/login` é chamado, **Then** retorna `401` com mensagem de confirmação de e-mail necessária.
- [ ] **Given** cookie de refresh token válido, **When** `POST /api/auth/refresh` é chamado, **Then** um novo access token é emitido.
- [ ] **Given** refresh token inválido ou revogado, **When** `POST /api/auth/refresh` é chamado, **Then** retorna `401` e o cookie de refresh é limpo.
- [ ] **Given** access token válido, **When** `GET /api/auth/me` é chamado, **Then** retorna o perfil autenticado com `role`.
- [ ] **Given** `POST /api/auth/logout`, **When** o cookie de refresh existir, **Then** o refresh token é invalidado e o cookie é limpo.

## Authorization
- `register`, `confirm-email`, `login`, `refresh` → públicas
- `me`, `logout` → requerem usuário autenticado

## API Notes
- **Endpoint**: `POST /api/auth/register`
  - **Input**: `{ name, email, password, passwordConfirm }`
  - **Success**: `201` — `{ message: string, userId: string }`
  - **Errors**: `400` — dado inválido ou e-mail em uso
- **Endpoint**: `GET /api/auth/confirm-email`
  - **Input**: `token` query string
  - **Success**: `200` — `{ message: string }`
  - **Errors**: `400` — token inválido/expirado
- **Endpoint**: `POST /api/auth/login`
  - **Input**: `{ email, password }`
  - **Success**: `200` — `{ accessToken, user: { id, name, email, role, emailConfirmed } }`
  - **Errors**: `401` — credenciais inválidas ou e-mail não confirmado
- **Endpoint**: `POST /api/auth/refresh`
  - **Input**: cookie `refreshToken`
  - **Success**: `200` — `{ accessToken }`
  - **Errors**: `401` — refresh token inválido/expirado
- **Endpoint**: `POST /api/auth/logout`
  - **Input**: cookie `refreshToken`
  - **Success**: `204`
  - **Errors**: `401` — usuário não autenticado
- **Endpoint**: `GET /api/auth/me`
  - **Input**: header `Authorization: Bearer <accessToken>`
  - **Success**: `200` — `{ user: { id, name, email, role, emailConfirmed } }`

## Dependencies
- **Requires**: none
- **Blocks**: frontend auth pages and route guards for login/registration/role redirects
