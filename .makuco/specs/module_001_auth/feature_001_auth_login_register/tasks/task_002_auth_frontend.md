# TASK-AUTH-002 — Implementar frontend de autenticação (páginas, contexto, redirecionamento)

**Root**: `services/frontend/`
**Branch**: `feature/TASK-AUTH-002-login-register-frontend`
**Spec**: `.makuco/specs/module_001_auth/feature_001_auth_login_register/spec_context.md`
**Part**: 2 of 2 — Auth frontend pages, context, and role-based routing
**Generated**: 2026-06-08

## Context
Implementar o frontend de autenticação do Catdog com formulários de registro e login, contexto de sessão, middleware de proteção de rotas e redirecionamento baseado em role. Esta tarefa consome os endpoints de backend já implementados em TASK-AUTH-001 e entrega a experiência completa de autenticação com layouts diferenciados para `admin` e `adotante`.

## Scope
**In:**
- Criar páginas e componentes de registro (`/auth/register`), login (`/auth/login`) e verificação de e-mail (`/auth/verify-email`)
- Implementar `SessionContext` (React Context) para gerenciar estado de autenticação no frontend
- Criar hooks `useAuth()` e `useRole()` para acesso à sessão e role
- Implementar middleware Next.js (`middleware.ts`) para proteger rotas `/admin` e `/adotante`
- Criar componente `RoleRedirect` para redirecionar usuários após login baseado em role
- Gerenciar tokens em HTTP-only cookies via cliente API/service layer
- Implementar logout e limpeza de sessão
- Páginas de placeholder para `/admin/page.tsx` e `/adotante/page.tsx`

**Out:**
- Não implementar dashboard completo ou funcionalidades além da autenticação
- Não adicionar componentes reutilizáveis globais que não sejam específicos da autenticação
- Não integrar e-mail real; aceitar que TASK-AUTH-001 já gerencia envio de e-mail
- Não implementar recuperação de senha ou autenticação social nesta fase
- Não modificar endpoints de backend (já entregues em TASK-AUTH-001)
- Não adicionar testes (escopo separado)

## Ubiquitous Language
| Business Term | Code Mapping |
|---|---|
| `SessionContext` | React Context que armazena `user: { id, name, email, role, emailConfirmed }`, `accessToken`, `isLoading`, `login()`, `logout()`, `register()` |
| `role` | enum `'admin' \| 'adotante'`; determina redirecionamento e layouts |
| `refresh token` | armazenado em HTTP-only cookie; gerenciado automaticamente pelo cliente API |
| `Adotante` | role padrão após registro; acesso a `/adotante` e catálogo público |
| `Admin` | role de gestão; acesso a `/admin` e painel de controle |

## Files
| Action | Path | Why |
|---|---|---|
| create | `services/frontend/src/lib/auth/session-context.tsx` | React Context para estado de autenticação |
| create | `services/frontend/src/lib/auth/auth-client.ts` | cliente HTTP para chamar endpoints de auth |
| create | `services/frontend/src/lib/auth/token-service.ts` | gerenciar tokens em cookies HttpOnly |
| create | `services/frontend/src/hooks/useAuth.ts` | hook para acessar contexto de autenticação |
| create | `services/frontend/src/hooks/useRole.ts` | hook para verificar role do usuário |
| create | `services/frontend/src/lib/auth/protected-route.tsx` | componente para rotas protegidas por autenticação |
| create | `services/frontend/src/lib/auth/role-redirect.tsx` | componente que redireciona baseado em role |
| create | `services/frontend/src/app/auth/layout.tsx` | layout para páginas de auth (não autenticadas) |
| create | `services/frontend/src/app/auth/register/page.tsx` | página de registro |
| create | `services/frontend/src/app/auth/register/register.component.tsx` | componente de formulário de registro |
| create | `services/frontend/src/app/auth/login/page.tsx` | página de login |
| create | `services/frontend/src/app/auth/login/login.component.tsx` | componente de formulário de login |
| create | `services/frontend/src/app/auth/verify-email/page.tsx` | página de verificação de e-mail |
| create | `services/frontend/src/middleware.ts` | middleware Next.js para proteção de rotas |
| create | `services/frontend/src/app/admin/layout.tsx` | layout para painel admin |
| create | `services/frontend/src/app/admin/page.tsx` | página placeholder admin |
| create | `services/frontend/src/app/adotante/layout.tsx` | layout para painel adotante |
| create | `services/frontend/src/app/adotante/page.tsx` | página placeholder adotante |
| create | `services/frontend/src/app/layout.tsx` | root layout com SessionProvider |
| modify | `services/frontend/src/app/page.tsx` | redirecionar usuários não autenticados para `/auth/login` |

## Implementation

### `session-context.tsx` *(create)*
**Reference pattern**: contexto de autenticação padrão Next.js com Provider; inspirar em padrão Redux/Zustand se houver no projeto.
**Differences from reference**:
- Exportar interface `Session = { user: { id, name, email, role: 'admin' | 'adotante', emailConfirmed }, accessToken }`
- Exportar interface `AuthContextType = { session: Session | null, isLoading: boolean, error: string | null, login(email, password), logout(), register(name, email, password), verifyEmail(token) }`
- Contexto deve re-validar sessão ao montar (checar se token não expirou)
- Usar `axios` ou `fetch` para chamar `/api/auth/me` ao montar; se falhar, limpar sessão
- Armazenar `accessToken` em memória (não localStorage), mas cookies gerenciam refresh automaticamente

### `auth-client.ts` *(create)*
**Reference pattern**: cliente HTTP especializado; buscar exemplo em `src/lib/` se existir padrão de `*-client.ts`
**Differences from reference**:
- Exportar funções: `register(name, email, password)`, `login(email, password)`, `refresh()`, `logout()`, `verifyEmail(token)`, `getMe()`
- Cada função retorna `{ data: ... } | { error: string }`
- Baseado em: `http://localhost:3001/api/auth` (backend) — usar `process.env.NEXT_PUBLIC_API_BASE_URL` ou variável de config
- Se resposta tem cookie `refreshToken`, não fazer nada (Next.js gerencia automaticamente com `credentials: 'include'`)
- Lançar erro específico se `emailNotVerified` (para mostrar mensagem diferente no login)

### `token-service.ts` *(create)*
**Reference pattern**: serviço de gerenciamento de tokens; se não houver, usar padrão simples
**Differences from reference**:
- Exportar: `getAccessToken()`, `setAccessToken(token)`, `clearTokens()`, `getRefreshToken()` (readonly — apenas lê do cookie)
- `accessToken` armazenado em memória; `refreshToken` vem do cookie HttpOnly (read-only do ponto de vista do JS)
- Função `isTokenExpired(token)` que decodifica JWT e verifica `exp` claim
- Não expor `refreshToken` para escrita; apenas lê-lo (cookies HttpOnly)

### `useAuth.ts` *(create)*
**Reference pattern**: hook genérico de contexto
**Differences from reference**:
- Retornar `Session | null`, `isLoading`, `login(email, password)`, `logout()`, `register(name, email, password)`, `verifyEmail(token)`, `error: string | null`
- Se contexto não estiver disponível, lançar erro: "useAuth deve ser usado dentro de SessionProvider"
- `login()` deve chamar `auth-client.login()`, atualizar contexto e fazer redirect automático para `/admin` ou `/adotante` (usar `useRouter` + `useRole()`)

### `useRole.ts` *(create)*
**Reference pattern**: hook especializado para role
**Differences from reference**:
- Retornar `role: 'admin' | 'adotante' | null`
- Internamente usar `useAuth()` para obter `session.user.role`
- Se não autenticado, retornar `null`

### `protected-route.tsx` *(create)*
**Reference pattern**: componente wrapper com redirecionamento
**Differences from reference**:
- Props: `children: ReactNode`, `requiredRoles?: ('admin' | 'adotante')[]` (opcional; se vazio, apenas requer autenticação)
- Usar `useAuth()` para verificar `isLoading`, `session`, `role`
- Se `isLoading`, retornar spinner/skeleton
- Se não autenticado, redirecionar para `/auth/login`
- Se autenticado mas role não permitida, redirecionar para `/` ou mostar erro 403
- Se OK, renderizar `children`

### `role-redirect.tsx` *(create)*
**Reference pattern**: componente de redirecionamento com lógica condicional
**Differences from reference**:
- Props: `children: ReactNode` (opcional; se fornecido, render na landing page autenticada; se não, redirect automático)
- Usar `useAuth()` e `useRouter()` para obter role e fazer redirect
- Se não autenticado, não fazer nada (deixar renderizar — middleware protegerá)
- Se autenticado, redirecionar imediatamente para `/admin` se role=admin, ou `/adotante` se role=adotante
- Se `children` fornecido, usar para landing page neutra que redireciona ao montar

### `app/auth/layout.tsx` *(create)*
**Reference pattern**: layout de Next.js App Router
**Differences from reference**:
- Layout sem header/footer; apenas container centralizado para formulários de auth
- Usar Tailwind: `min-h-screen flex items-center justify-center bg-gray-50`
- Renderizar `children` em card com max-width-md
- Adicionar logo ou branding básico (se existir design system)

### `app/auth/register/page.tsx` *(create)*
**Reference pattern**: página do App Router
**Differences from reference**:
- Usar server component por padrão; se houver estado, usar `'use client'`
- Retornar `<RegisterComponent />` dentro do layout de auth
- Sem lógica; apenas apresentação

### `app/auth/register/register.component.tsx` *(create)*
**Reference pattern**: formulário reutilizável; se houver componente de formulário base no projeto, espelhar
**Differences from reference**:
- `'use client'` directive
- Usar `react-hook-form` + `zod` para validação (verificar stack)
- Campos: `name` (required), `email` (required, email validation), `password` (required, min 8), `passwordConfirm` (required, must match password)
- Botão de submit mostra loading durante envio
- Ao submeter, chamar `useAuth().register(name, email, password)` via hook
- Se sucesso, redirecionar para `/auth/verify-email?email=...` ou mostrar mensagem "Verifique seu e-mail"
- Se erro, mostrar toast ou mensagem de erro (ex: "E-mail já em uso")
- Link para login: "Já tem conta? Faça login"

### `app/auth/login/page.tsx` *(create)*
**Reference pattern**: página do App Router
**Differences from reference**:
- Usar server component por padrão; se houver estado, usar `'use client'`
- Retornar `<LoginComponent />` dentro do layout de auth
- Sem lógica; apenas apresentação

### `app/auth/login/login.component.tsx` *(create)*
**Reference pattern**: formulário reutilizável
**Differences from reference**:
- `'use client'` directive
- Usar `react-hook-form` + `zod`
- Campos: `email` (required, email validation), `password` (required)
- Botão submit mostra loading
- Ao submeter, chamar `useAuth().login(email, password)`
- Se erro `emailNotVerified`, mostrar: "Confirme seu e-mail antes de fazer login. Verifique sua caixa de entrada."
- Se erro de credenciais, mostrar: "E-mail ou senha incorretos."
- Ao sucesso, redirect automático é feito por `useAuth().login()` via `useRouter`
- Link para registro: "Não tem conta? Registre-se"

### `app/auth/verify-email/page.tsx` *(create)*
**Reference pattern**: página dinâmica que consome query params
**Differences from reference**:
- `'use client'` directive (precisa usar `useSearchParams()`)
- Extrair `token` de query string ou obter de props
- Ao montar, chamar `useAuth().verifyEmail(token)`
- Mostrar loading enquanto valida
- Se sucesso: mostrar mensagem "E-mail confirmado! Você pode fazer login agora." + link para `/auth/login`
- Se erro: mostrar "Link de verificação inválido ou expirado." + link para `/auth/register` (solicitar novo e-mail, se suportado)

### `middleware.ts` *(create)*
**Reference pattern**: Next.js middleware v13+; baseado no padrão de auth público documentado
**Differences from reference**:
- Proteger rotas `/admin` e `/adotante` — verificar se token é válido antes de permitir
- Se token ausente ou inválido, redirecionar para `/auth/login`
- Se token expirado, tentar fazer refresh automaticamente (chamar endpoint de refresh do backend)
- Se refresh falhar, limpar cookies e redirecionar para `/auth/login`
- Não bloquear rotas públicas (`/auth/**`, `/`, `/_next/**`)
- Usar `process.env.NEXT_PUBLIC_API_BASE_URL` para chamar backend

### `app/admin/layout.tsx` *(create)*
**Reference pattern**: layout para seção protegida (admin)
**Differences from reference**:
- Uso de `ProtectedRoute` com `requiredRoles={['admin']}`
- Layout com header, sidebar ou navbar de admin (placeholder básico é OK)
- Renderizar `<LogoutButton />` com `onClick={() => useAuth().logout()}`
- Breadcrumb ou título indicando "Painel Administrativo"
- Renderizar `children`

### `app/admin/page.tsx` *(create)*
**Reference pattern**: página vazia de placeholder
**Differences from reference**:
- Usar server component
- Conteúdo: card com "Bem-vindo ao Painel Administrativo" + lista vazia de ações (placeholder para próximas features)
- Sem lógica

### `app/adotante/layout.tsx` *(create)*
**Reference pattern**: layout para seção protegida (adopter)
**Differences from reference**:
- Uso de `ProtectedRoute` com `requiredRoles={['adotante']}`
- Layout com header/navbar de adotante (diferente de admin)
- Renderizar `<LogoutButton />` com `onClick={() => useAuth().logout()}`
- Título indicando "Meu Perfil de Adotante"
- Renderizar `children`

### `app/adotante/page.tsx` *(create)*
**Reference pattern**: página vazia de placeholder
**Differences from reference**:
- Usar server component
- Conteúdo: card com "Bem-vindo ao Catdog" + intro aos animais disponíveis (placeholder para próximas features)
- Sem lógica

### `app/layout.tsx` *(create)*
**Reference pattern**: root layout do Next.js App Router
**Differences from reference**:
- Envolver com `<SessionProvider>` (usar Context Provider)
- Importar `SessionContext` e renderizar `<SessionContext.Provider value={...}>`
- Configurar fonte, meta tags, favicon
- Incluir `<RoleRedirect />` como wrapper do children (opcional, se quiser redirect automático em root)
- Estrutura básica: `<html><body>{children}</body></html>`

### `app/page.tsx` *(modify)*
**Reference pattern**: página de landing existente ou gerada
**Differences from reference**:
- Se usuário não autenticado, renderizar landing page simples com links para `/auth/login` e `/auth/register`
- Se usuário autenticado, redirecionar para `/admin` ou `/adotante` baseado em role via `<RoleRedirect />`
- Componente deve ser server component com `'use client'` apenas se usar hooks

## Acceptance Criteria
- [ ] **Given** visitante não autenticado acessa `/`, **When** página carrega, **Then** mostra landing com links para login/registro.
- [ ] **Given** visitante não autenticado acessa `/admin` ou `/adotante`, **When** middleware valida token, **Then** redireciona para `/auth/login`.
- [ ] **Given** formulário de registro preenchido com dados válidos, **When** usuário clica submit, **Then** chamada `POST /api/auth/register` é feita e exibe "Verifique seu e-mail".
- [ ] **Given** e-mail já cadastrado, **When** usuário tenta registrar, **Then** erro "E-mail já em uso" é mostrado.
- [ ] **Given** senhas não coincidem, **When** usuário tenta registrar, **Then** erro é mostrado e nenhuma chamada de API é feita.
- [ ] **Given** link de verificação válido em `?token=...`, **When** página `verify-email` carrega, **Then** chamada `POST /api/auth/verify-email` valida token e mostra sucesso.
- [ ] **Given** link inválido ou expirado, **When** página carrega, **Then** erro é mostrado.
- [ ] **Given** login com credenciais corretas e e-mail verificado, **When** usuário clica submit, **Then** chamada `POST /api/auth/login` retorna token e usuário é redirecionado para `/admin` (se admin) ou `/adotante` (se adotante).
- [ ] **Given** login com e-mail não verificado, **When** submit é feito, **Then** erro específico "Confirme seu e-mail" é mostrado.
- [ ] **Given** login com credenciais inválidas, **When** submit é feito, **Then** erro genérico "E-mail ou senha incorretos" é mostrado.
- [ ] **Given** token de acesso expirado e refresh válido, **When** middleware valida, **Then** refresh automático é feito e rota protegida é acessada.
- [ ] **Given** logout é disparado, **When** clicado, **Then** `POST /api/auth/logout` é chamado, cookies são limpos, contexto de sessão é zerado, usuário é redirecionado para `/auth/login`.
- [ ] **Given** usuário admin autenticado, **When** acessa `/admin/page.tsx`, **Then** layout de admin é renderizado sem erros.
- [ ] **Given** usuário adotante autenticado, **When** acessa `/adotante/page.tsx`, **Then** layout de adotante é renderizado sem erros.
- [ ] `useAuth()` fora de `SessionProvider` — hook lança erro descritivo em console (dev) e componente não quebra produção.
- [ ] Recarga de página com token válido — sessão é restaurada sem logout forçado (checar `/api/auth/me`).
- [ ] Token expirado durante navegação — próxima chamada de API ou middleware tenta refresh; se falhar, redireciona para login.

## Authorization
- `/auth/register`, `/auth/login`, `/auth/verify-email` → públicas
- `/admin/**` → requerem role `admin`
- `/adotante/**` → requerem role `adotante`
- `/api/auth/logout`, `/api/auth/me` → requerem `accessToken` válido

## API Notes
- **Todos os endpoints já implementados em TASK-AUTH-001** — frontend apenas consome.
- **Base URL**: `process.env.NEXT_PUBLIC_API_BASE_URL` (ex: `http://localhost:3001`)
- **Cookie `refreshToken`**: gerenciado automaticamente por Next.js com `credentials: 'include'` em fetch/axios.
- **Retry de refresh**: middleware tenta 1x refresh se token expirou; se falhar, limpa sessão.

## Dependencies
- **Requires**: TASK-AUTH-001 (backend endpoints já implementado), Node.js + Next.js configurado
- **Blocks**: TASK-AUTH-003 (proteção de rotas mais granulares), TASK-ANIMAL-001 (listagem de animais, que reusa auth context)
