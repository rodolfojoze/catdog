# TASK-AUTH-003 — Implementar telas HTML + CSS minimalista (Registro, Login, Verificação, Dashboards)

**Root**: `services/frontend/`
**Branch**: `feature/TASK-AUTH-003-frontend-pages-ui`
**Spec**: `.makuco/specs/module_001_auth/feature_001_auth_login_register/spec_context.md`
**Part**: 2a of 2 — Auth UI pages with minimalist white design (dependent on TASK-AUTH-002)
**Generated**: 2026-06-08

---

## Context

Implementar a camada visual (HTML + CSS) das páginas de autenticação do Catdog com **design minimalista, palette branca** e acessibilidade básica. Esta tarefa depende de TASK-AUTH-002 (SessionContext, hooks, middleware já implementados) e **reutiliza os componentes de contexto/lógica existentes**, focando exclusivamente na **apresentação visual**.

A estratégia é usar **CSS puro (vanilla CSS)** sem frameworks pesados, mantendo a simplicidade e performance. Componentes são estilizados inline em `.module.css` próximos às páginas (colocation pattern).

---

## Scope

**In:**
- Criar componentes React/TSX para **cada página visual** com HTML + CSS minimalista
- Implementar **design system visual minimalista** (cores, tipografia, spacing)
- Temas de página:
  - `/auth/register` — Formulário de registro (nome, email, senha, confirmação)
  - `/auth/login` — Formulário de login (email, senha)
  - `/auth/verify-email` — Página de verificação (token enviado, link expirado, re-envio)
  - `/admin` — Dashboard admin (placeholder com navegação minimalista)
  - `/adotante` — Dashboard adotante (placeholder com navegação minimalista)
- Componentes reutilizáveis **visuais** (não lógica):
  - `<FormContainer>` — wrapper de formulário com padding/border minimalista
  - `<Input>` — input HTML estilizado (branco/cinza)
  - `<Button>` — botão minimalista (texto escuro em fundo branco com borda)
  - `<Card>` — container genérico com sombra leve
  - `<Alert>` — notificações de erro/sucesso (vermelho/verde minimalista)
  - `<Logo>` — logo/branding placeholder
- Implementar **validação visual** (erro em vermelho claro, sucesso em verde claro)
- Acessibilidade básica: labels, focus states, contrast
- Responsividade mobile-first (breakpoints: 320px, 768px, 1024px)

**Out:**
- Não implementar lógica de autenticação (já feita em TASK-AUTH-002)
- Não usar CSS frameworks (Tailwind, Bootstrap, etc.) — vanilla CSS apenas
- Não criar componentes com lógica de estado complexa (apenas presentacionais)
- Não implementar animações avançadas (transições simples OK)
- Não estilizar páginas do dashboard além de placeholder + navegação básica
- Não implementar temas escuros/customização — apenas branco como padrão

---

## Ubiquitous Language

| Business Term | Visual/UI Mapping |
|---|---|
| **Página de Registro** | Hero branco com form side-by-side (desktop) ou stacked (mobile); CTA verde minimalista |
| **Página de Login** | Minimalista centrada; form com 2 inputs + botão; link "Não tem conta?" |
| **Verificação de Email** | Estado: "Enviado", "Link Expirado", "Confirmado"; botão "Re-enviar"; timer visual (opcional) |
| **Dashboard Admin** | Header minimalista com logo + menu vertical; área principal branca; logout no header |
| **Dashboard Adotante** | Layout similar a admin; branding diferente via cores secundárias (opcional) |
| **Palette Minimalista** | Branco (#FFF), Cinza claro (#F5F5F5), Cinza escuro (#333), Verde (#27AE60), Vermelho (#E74C3C) |
| **Tipografia** | Sans-serif padrão (system fonts: -apple-system, Segoe UI, Roboto); size base 16px |

---

## Design System — Definição Visual

### Cores
```
--color-white: #FFFFFF
--color-bg-light: #F5F5F5
--color-text-dark: #333333
--color-text-light: #666666
--color-border: #E0E0E0
--color-success: #27AE60
--color-error: #E74C3C
--color-warning: #F39C12
```

### Tipografia
```
Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif
Base Font Size: 16px
Line Height: 1.5
```

**Font Sizes:**
- H1 (page title): 32px / 28px mobile
- H2 (section): 24px / 20px mobile
- Body: 16px
- Small: 14px
- Tiny: 12px

### Spacing (8px base grid)
```
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
```

### Componentes Reutilizáveis

#### `Button.module.css`
- Base: `padding: 12px 24px`, `border: 1px solid #333`, `background: white`, `color: #333`
- Primary (submit): `background: #27AE60`, `color: white`, `border: 1px solid #27AE60`
- Secondary (cancel): `background: transparent`, `color: #333`, `border: 1px solid #333`
- Hover: lighter/darker variant
- Focus: outline 2px offset
- Disabled: opacity 0.5

#### `Input.module.css`
- `border: 1px solid #E0E0E0`, `padding: 12px`, `border-radius: 4px`, `background: #FAFAFA`
- Focus: `border-color: #333`, `outline: none`
- Error state: `border-color: #E74C3C`, `background: #FFF5F5`
- Placeholder: color #999

#### `FormContainer.module.css`
- `max-width: 400px`, `padding: 32px`, `background: white`, `border-radius: 8px`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`
- Spacing entre inputs: `gap: 16px`

#### `Alert.module.css`
- Success: `background: #E8F8F5`, `border-left: 4px solid #27AE60`, `color: #27AE60`
- Error: `background: #FADBD8`, `border-left: 4px solid #E74C3C`, `color: #E74C3C`
- Padding: 16px, border-radius: 4px

#### `Card.module.css`
- `background: white`, `border: 1px solid #E0E0E0`, `border-radius: 8px`, `padding: 24px`
- `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`

---

## Files

| Action | Path | Why |
|---|---|---|
| create | `services/frontend/src/components/ui/Button/Button.tsx` | Botão reutilizável (primary, secondary, disabled states) |
| create | `services/frontend/src/components/ui/Button/Button.module.css` | Estilos de botão minimalista |
| create | `services/frontend/src/components/ui/Input/Input.tsx` | Input reutilizável com error state |
| create | `services/frontend/src/components/ui/Input/Input.module.css` | Estilos de input |
| create | `services/frontend/src/components/ui/FormContainer/FormContainer.tsx` | Container de formulário |
| create | `services/frontend/src/components/ui/FormContainer/FormContainer.module.css` | Estilos container |
| create | `services/frontend/src/components/ui/Card/Card.tsx` | Card genérico |
| create | `services/frontend/src/components/ui/Card/Card.module.css` | Estilos card |
| create | `services/frontend/src/components/ui/Alert/Alert.tsx` | Alerta de sucesso/erro |
| create | `services/frontend/src/components/ui/Alert/Alert.module.css` | Estilos alert |
| create | `services/frontend/src/components/ui/Logo/Logo.tsx` | Branding placeholder |
| modify | `services/frontend/src/app/auth/register/register.component.tsx` | Substituir HTML genérico por componentes styled + validação visual |
| modify | `services/frontend/src/app/auth/login/login.component.tsx` | Substituir HTML genérico por componentes styled |
| modify | `services/frontend/src/app/auth/verify-email/page.tsx` | Implementar UI de verificação com status states |
| modify | `services/frontend/src/app/admin/layout.tsx` | Adicionar header minimalista com logo + menu + logout |
| modify | `services/frontend/src/app/admin/page.tsx` | Substituir placeholder por card info + navegação |
| modify | `services/frontend/src/app/adotante/layout.tsx` | Adicionar header minimalista |
| modify | `services/frontend/src/app/adotante/page.tsx` | Substituir placeholder por card info + navegação |
| create | `services/frontend/src/styles/globals.css` | Estilos globais (reset, typography, spacing) |

---

## Implementation

### `globals.css` *(create)*

Define reset CSS, tipografia base, variáveis CSS, breakpoints.

**Must include:**
- CSS Reset (margin/padding/border-box)
- `:root` com todas as cores e espaçamentos como variáveis
- `body { font-family: system fonts, font-size: 16px, line-height: 1.5, color: #333 }`
- Breakpoints: `@media (max-width: 768px)` para mobile, `@media (max-width: 1024px)` para tablet
- Focus states globais: `*:focus { outline: 2px solid #333, outline-offset: 2px }`

---

### `Button.tsx` *(create)*

```typescript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

export default function Button({ variant = 'primary', ...props }) {
  // Return <button className={`${styles.button} ${styles[variant]}`} />
}
```

**Acceptance:**
- Primary button: verde, texto branco, borda escura
- Secondary button: branco com borda, texto escuro
- Disabled: opacidade 50%
- Focus: outline visível
- Hover: cor ligeiramente diferente

---

### `Input.tsx` *(create)*

```typescript
interface InputProps {
  label?: string
  name: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  value?: string
  onChange?: (e) => void
  required?: boolean
}

export default function Input({ label, error, ...props }) {
  // Return <div> com <label>, <input>, <span error>
}
```

**Acceptance:**
- Label acima do input (16px margin-bottom)
- Input: borda cinza claro, padding 12px
- Error state: borda vermelha, fundo rosa claro, mensagem em vermelho abaixo
- Placeholder: cinza claro
- Focus: borda escura, sem outline padrão

---

### `FormContainer.tsx` *(create)*

Wrapper que centraliza formulário com padding padrão e sombra leve.

```typescript
interface FormContainerProps {
  children: React.ReactNode
  onSubmit: (e) => void
  title?: string
  subtitle?: string
}
```

---

### `Alert.tsx` *(create)*

Notificação de sucesso/erro.

```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning'
  message: string
  onClose?: () => void
}
```

**Acceptance:**
- Success: verde, ícone checkmark (unicode ✓)
- Error: vermelho, ícone X (unicode ✗)
- Warning: laranja, ícone ! (unicode !)
- Borda esquerda destacada (4px)
- Padding: 16px, border-radius: 4px

---

### `register.component.tsx` *(modify)*

Integrar componentes `FormContainer`, `Input`, `Button`, `Alert`.

**Structure:**
```
<div className="register-page">
  <div className="register-container">
    <Logo />
    <FormContainer title="Criar Conta" onSubmit={handleRegister}>
      <Input label="Nome completo" name="name" required />
      <Input label="Email" name="email" type="email" required />
      <Input label="Senha" name="password" type="password" required />
      <Input label="Confirmar Senha" name="passwordConfirm" type="password" required />
      {error && <Alert type="error" message={error} />}
      <Button variant="primary" type="submit">Criar Conta</Button>
      <p>Já tem conta? <a href="/auth/login">Fazer login</a></p>
    </FormContainer>
  </div>
</div>
```

**Visual Details:**
- Center página (flex, min-height: 100vh)
- FormContainer em branco com sombra
- Links em azul (#0066CC) com underline hover
- Validações em tempo real (vermelho se mismatch de senha)

---

### `login.component.tsx` *(modify)*

Similar a registro, mas com 2 inputs (email + senha).

**Structure:**
```
<FormContainer title="Fazer Login" onSubmit={handleLogin}>
  <Input label="Email" name="email" type="email" required />
  <Input label="Senha" name="password" type="password" required />
  {error && <Alert type="error" message={error} />}
  {isLoading && <Alert type="warning" message="Entrando..." />}
  <Button variant="primary" type="submit">Entrar</Button>
  <p>Não tem conta? <a href="/auth/register">Criar uma</a></p>
</FormContainer>
```

---

### `verify-email/page.tsx` *(modify)*

Estados visuais para verificação:

1. **Estado: Enviado** (padrão)
   ```
   <Card>
     <h2>Verifique seu Email</h2>
     <p>Enviamos um link de confirmação para {email}</p>
     <Button>Re-enviar Email</Button>
   </Card>
   ```

2. **Estado: Expirado**
   ```
   <Alert type="error" message="Link de verificação expirado" />
   <Button>Solicitar novo link</Button>
   ```

3. **Estado: Confirmado**
   ```
   <Alert type="success" message="Email confirmado! Você já pode fazer login." />
   <Button><a href="/auth/login">Ir para Login</a></Button>
   ```

---

### Admin/Adotante Layouts *(modify)*

**Header minimalista:**
```
<header className="dashboard-header">
  <div className="header-left">
    <Logo />
    <span>Catdog - Admin / Adotante</span>
  </div>
  <div className="header-right">
    <span>Olá, {userName}</span>
    <Button variant="secondary" onClick={logout}>Sair</Button>
  </div>
</header>
```

**Main Content:**
```
<main className="dashboard-main">
  <Card>
    <h1>Bem-vindo ao Catdog</h1>
    <p>Role: {role}</p>
    <p>Email: {email}</p>
  </Card>
</main>
```

---

## Acceptance Criteria

- [ ] Todas as 7 páginas (register, login, verify-email, admin, adotante) carregam com CSS correto
- [ ] Design é minimalista, branco como fundo principal, cinzas e acentos em verde/vermelho
- [ ] Componentes reutilizáveis (`Button`, `Input`, `Card`, `Alert`) são consistentes
- [ ] Inputs têm validação visual (erro em vermelho, sucesso em verde)
- [ ] Formulários são responsivos (mobile-first, 320px+)
- [ ] Focus states são visíveis (outline 2px para acessibilidade)
- [ ] Nenhum framework CSS externo (vanilla CSS only)
- [ ] Labels associadas com inputs (`<label htmlFor>`)
- [ ] Botões têm tipos corretos (`type="submit"` etc)
- [ ] Links internos não têm recarga (use `<Link>` Next.js, não `<a>`)
- [ ] Palette consistente com variáveis CSS globais
- [ ] Sem margin/padding excessivo; espaçamento segue grid 8px

---

## QA Checklist

- [ ] Executar `npm run build` sem erros
- [ ] Testar em 3 viewports: 320px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Validar acessibilidade: labels, focus states, contrast (WCAG AA mínimo)
- [ ] Verificar que SessionContext está sendo consumido (useAuth hook)
- [ ] Confirmar que TASK-AUTH-002 foi concluído (contexto, hooks disponíveis)
- [ ] Testar fluxo completo: register → verify → login → dashboard redirect
- [ ] Revisar código contra makuco-code-practices skill (SOLID, clean code)
- [ ] Validação de CSS: sem conflitos de classe, colocation em `.module.css`

---

## Dependencies

- ✅ TASK-AUTH-002 (SessionContext, useAuth, useRole, middleware) — **DEVE estar completo**
- ✅ TASK-AUTH-001 (backend endpoints) — **DEVE estar completo**
- Node.js + Next.js 14+ (já configurado)
- React 18+ (já no projeto)

---

## Effort Estimate

- **Button + Input + FormContainer components**: 4 horas
- **Register page UI**: 3 horas
- **Login page UI**: 2 horas
- **Verify-email page UI**: 2 horas
- **Admin/Adotante dashboards**: 3 horas
- **Alert + Card + Logo components**: 2 horas
- **Globals CSS + responsive testing**: 3 horas
- **QA + accessibility validation**: 2 horas
- **Total**: ~22 horas

---

## Notes

- **Simplicidade é a prioridade**: Evitar CSS complexo; vanilla CSS é suficiente
- **Colocation**: Cada componente tem seu `.module.css` ao lado do `.tsx`
- **Acessibilidade**: Focus states, labels, contrast. Testar com Tab key em browser
- **Responsividade**: Mobile-first; usar `@media` queries para breakpoints
- **Paleta fixa**: Branco + cinzas + verde + vermelho; sem gradientes
- **Tipografia**: System fonts (não imports de Google Fonts); base 16px
- **Sem JavaScript externo**: Toda lógica vem do React/Context (TASK-AUTH-002)
