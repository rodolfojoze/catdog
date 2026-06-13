# FEATURE-001 — Autenticação inicial com login, registro e permissão por role

---

## Grupo 1 — Identificação

**Feature:** RF-001 — Autenticação inicial com login, registro e permissão por role
**Módulo:** MODULE-001 — Auth
**Status:** Rascunho Completo — Pronto para Implementação
**Criado por:** Makuco Specify Agent — 2026-06-07
**Refinado por:** Makuco Specify Agent (com elicitação de requisitos) — 2026-06-08
**Aprovado por:** _Nome — YYYY-MM-DD_ (aguardando aprovação)

---

## Objetivo da Feature

Esta feature resolve a necessidade de permitir que usuários adotantes e administradores acessem o sistema Catdog de forma segura, com registro e confirmação de conta por e-mail, além de garantir que cada perfil receba o fluxo e layout adequados após o login. Ela entrega controle de permissão por role, validação de sessão via refresh token e separação clara entre o ambiente do adotante e do administrador.

---

## Grupo 2 — Contexto

### Quem Acessa

| Perfil / Permissão | Nível de acesso | Observação |
|---|---|---|
| Admin | Total | Acesso ao painel administrativo e às funcionalidades de gestão da ONG |
| Adotante | Escrita / Leitura | Acesso ao catálogo de animais e ao fluxo de interesse e adoção |

### Premissas

- O usuário só terá a conta ativa após confirmar o e-mail enviado na criação da conta.
- O cadastro inicial de `admin` deve ser criado via database seed script (`npm run seed` ou similar) — não via UI pública.
- O sistema possui um serviço de e-mail (Supabase) disponível para envio do link de confirmação.
- O refresh token será usado para verificar as permissões a cada renovação; tokens expirados invalidam a sessão.
- Duração máxima de sessão: **30 minutos** (mesmo para admin e adotante).
- Link de confirmação de e-mail válido por **24 horas**; usuário pode re-solicitar envio se expirado.
- Política de senha: **mínimo 8 caracteres com 1 maiúscula e 1 número**.
- Um usuário pode ter **múltiplas roles simultaneamente** (ex: ser admin E adotante).
- Deletação de conta permitida com **confirmação por email + re-inserção de senha**.

### Dependências

| Dependência | Tipo | Status | Impacto se não resolvida |
|---|---|---|---|
| Serviço de envio de e-mail | API / Integração | ✅ Resolvida (Supabase) | Registro de usuário não pode ser confirmado e ativado |
| Infraestrutura de tokens (access / refresh) | Decisão técnica | ✅ Resolvida (JWT + HTTP-only cookies) | Não há garantia de sessão segura nem verificação de permissões atualizada |
| Rotas de redirecionamento por role | FEATURE / UI | ✅ Resolvida (Next.js middleware) | Usuário pode acessar layout incorreto após login |
| Base de dados de usuários com roles | FEATURE / DB | ✅ Resolvida (Prisma schema) | Não é possível distinguir `admin` de `adotante` ou aplicar permissionamento |
| LGPD Compliance (direito de deleção) | Legal | ✅ Resolvida (fluxo de deleção com confirmação) | Sistema não atende regulação brasileira |

### Referências e Insumos

**Protótipo / Wireframe:**
- Arquivo local: _não aplicável nesta etapa_

**Prints de referência (estado atual):**
- _não aplicável_

**Artefatos consultados:**
- .makuco/overview/project_goal_context.md — contexto do projeto Catdog e perfis de usuário
- Requisitos do produto: autenticação segura e experiência por role
- Referência de e-mail de confirmação anexada pelo usuário

**Tabelas de banco de dados:**
- Usuário (nome, e-mail, senha criptografada, role, status de confirmação)

**MCPs utilizados:**
- _não aplicável_

**SKILLs utilizados:**
- _makuco-business-analyst_ para elicitação de requisitos

---

## Grupo 3 — Comportamento

### Histórias de Usuário

#### HU-01 — Registro de conta

Um visitante preenche nome, e-mail, senha e confirmação de senha para criar uma conta no Catdog. O sistema valida os dados, cria a conta como `adotante` e envia um e-mail de confirmação. O usuário só é ativado após clicar no link recebido.

**Pode ser testada independentemente:** preencher o formulário de registro e verificar o envio do e-mail de confirmação.

**Cenários de aceite:**

1. **Dado** que um visitante informa nome, e-mail válido, senha e confirmação igual, **quando** ele envia o formulário, **então** a conta é criada em estado pendente e um e-mail de confirmação é enviado.
2. **Dado** que os campos de senha e confirmação não coincidem, **quando** ele envia o formulário, **então** o sistema mostra mensagem de erro e não cria a conta.

---

#### HU-02 — Confirmação de e-mail

Um usuário que registrou a conta recebe um e-mail com link de confirmação. Ao abrir o link, o sistema valida o token do e-mail e ativa a conta, permitindo o primeiro login.

**Pode ser testada independentemente:** usar o link de confirmação direto em uma conta pendente.

**Cenários de aceite:**

1. **Dado** uma conta pendente com token válido, **quando** o usuário acessa o link de confirmação, **então** a conta é ativada e o sistema mostra mensagem de sucesso.
2. **Dado** um token expirado ou inválido, **quando** o usuário acessa o link, **então** o sistema mostra mensagem de erro e não ativa a conta.

---

#### HU-03 — Login e redirecionamento por role

Um usuário ativo faz login com e-mail e senha. Após autenticar, o sistema verifica as roles do usuário e redireciona para o layout correspondente. Se o usuário tiver múltiplas roles, prioriza `admin` (se tiver) > `adotante`.

**Pode ser testada independentemente:** efetuar login com contas de `admin`, `adotante` e contas com múltiplas roles.

**Cenários de aceite:**

1. **Dado** uma conta ativa com role `adotante`, **quando** faz login com credenciais válidas, **então** é redirecionado para `/adotante` e vê o layout de adotante.
2. **Dado** uma conta ativa com role `admin`, **quando** faz login com credenciais válidas, **então** é redirecionado para `/admin` e vê o layout de administrador.
3. **Dado** uma conta com múltiplas roles (admin + adotante), **quando** faz login, **então** é redirecionado para `/admin` (prioridade máxima).
4. **Dado** uma conta com email não confirmado, **quando** tenta fazer login, **então** erro específico é exibido: "Confirme seu e-mail antes de acessar a plataforma."

---

#### HU-04 — Verificação de permissionamento via refresh token

Um usuário autenticado mantém a sessão ativa por meio de refresh token. A cada renovação, o sistema re-valida as roles atuais no banco de dados e rejeita tokens expirados. Se a role foi removida/alterada, a sessão é invalidada imediatamente.

**Pode ser testada independentemente:** simular refresh com token válido, token expirado, e mudança de role durante sessão ativa.

**Cenários de aceite:**

1. **Dado** um refresh token válido com roles atualizadas no banco, **quando** solicita renovação, **então** novo access token é emitido com as roles atuais.
2. **Dado** um refresh token expirado (>7 dias), **quando** tenta renovar, **então** erro 401 é retornado e sessão é encerrada.
3. **Dado** um usuário cuja role foi removida por admin durante sessão ativa, **quando** refresh token é solicitado, **então** sessão é invalidada e usuário é redirecionado para login.
4. **Dado** um refresh token que já foi utilizado uma vez (rotação ativada), **quando** tenta reusar o mesmo token, **então** request é rejeitado (token já consumido).

---

### Regras de Negócio

- **RN-01:** Um usuário só pode receber acesso completo ao Catdog após confirmar o e-mail de registro.
- **RN-02:** A role `admin` deve ser tratada como perfil de gestão e **não pode ser concedida automaticamente** a partir do registro público — apenas via admin ou seed script.
- **RN-03:** O fluxo de redirecionamento deve direcionar para `/admin` (prioridade) ou `/adotante` com layouts distintos e permissões específicas.
- **RN-04:** O token de refresh deve ser verificado a cada renovação; não é permitido uso permanente do mesmo token (rotação obrigatória).
- **RN-05:** O sistema deve rejeitar acesso a rotas protegidas quando o usuário não estiver autenticado ou não tiver permissionamento válido.
- **RN-06:** Duração máxima de sessão é **30 minutos** — após este período, usuário deve fazer re-login.
- **RN-07:** A role é **re-validada a cada refresh token** — alterações de role por admin entram em efeito na próxima renovação.
- **RN-08:** Um usuário pode ter **múltiplas roles simultaneamente** — redirecionamento prioriza `admin` > `adotante`.
- **RN-09:** Se uma conta é deletada, os dados são **anonimizados mas retidos** para auditoria (LGPD compliance).
- **RN-10:** Email é **único** no sistema — não pode haver mais de uma conta ativa com mesmo email.

---

### Requisitos Funcionais

#### O que o sistema exibe ao ser acessado

Ao acessar a aplicação não autenticada, o sistema exibe uma tela de login com opção clara de registrar nova conta. O formulário de login solicita e-mail e senha, e o registro solicita nome, e-mail, senha e confirmação de senha.

#### Ações disponíveis

**Ação 1 — Registrar conta**

O usuário preenche nome, e-mail, senha e confirmação de senha.

Regras condicionais:
- Se todos os campos estiverem válidos e o e-mail for único → cria conta em estado pendente e envia e-mail de confirmação.
- Se o e-mail já existir → mostra mensagem de erro informando que o e-mail já está em uso.
- Se senha e confirmação não coincidirem → mostra mensagem de erro e não envia e-mail.

**Ação 2 — Confirmar e-mail**

O usuário clica no link de confirmação recebido por e-mail.

Regras condicionais:
- Se o token de confirmação for válido e não expirado → ativa a conta e informa sucesso.
- Se o token for inválido ou expirado → informa erro e orienta a solicitação de novo e-mail (se esse fluxo estiver disponível).

**Ação 3 — Login**

O usuário autentica com e-mail e senha.

Regras condicionais:
- Se credenciais estiverem corretas e a conta estiver ativa → autentica e redireciona conforme a role.
- Se credenciais estiverem corretas e a conta estiver pendente → informa que é preciso confirmar o e-mail.
- Se credenciais estiverem incorretas → informa erro de autenticação sem detalhar qual campo falhou.

**Ação 4 — Renovar sessão via refresh token**

O cliente solicita refresh de sessão quando o access token expira.

Regras condicionais:
- Se o refresh token for válido → emite novo access token e mantém a role atual.
- Se o refresh token estiver inválido, expirado ou reutilizado indevidamente → encerra a sessão e exige novo login.

---

#### Validações e Restrições

- `nome` é obrigatório (mínimo 3 caracteres, máximo 255).
- `e-mail` é obrigatório, deve ter formato válido (RFC 5322 simplificado) e ser **único no sistema**.
- `senha` é obrigatória e deve obedecer à **política: mínimo 8 caracteres, 1 maiúscula, 1 número**.
- `confirmação de senha` é obrigatória e deve **coincidir exatamente com `senha`**.
- `role` pode ser `admin` ou `adotante` nesta fase (future: mais roles); um usuário pode ter múltiplas roles.
- O usuário **não pode efetuar login** enquanto o e-mail não estiver confirmado.
- O access token expira em **15 minutos**; refresh token expira em **7 dias**.
- Refresh token **não pode ser reutilizado** — novo token é emitido a cada refresh (rotação).
- **Sessão expira em 30 minutos** de inatividade — requer novo login.
- **Link de confirmação de email** válido por **24 horas** apenas.
- **Tentativas de login falhadas**: após 5 tentativas, bloqueio de 15 minutos no IP (proteção contra força bruta).

---

#### Mensagens ao Usuário

| Condição | Mensagem |
|---|---|
| Registro bem-sucedido | `Conta criada. Verifique seu e-mail para confirmar sua conta.` |
| E-mail já cadastrado | `Este e-mail já está em uso.` |
| Senhas não coincidem | `A senha e a confirmação devem ser iguais.` |
| Formato de e-mail inválido | `Informe um e-mail válido.` |
| Conta pendente de confirmação | `Confirme seu e-mail antes de acessar a plataforma.` |
| Link de confirmação inválido | `O link de confirmação é inválido ou expirou.` |
| Login falhou | `E-mail ou senha incorretos.` |
| Sessão expirada | `Sua sessão expirou. Faça login novamente.` |

---

#### Integrações

| Sistema externo | O que é enviado | O que é recebido | Em caso de falha |
|---|---|---|---|
| Serviço de e-mail | Pedido de envio de e-mail de confirmação com token seguro | Status de envio (sucesso / falha) | Exibe mensagem de erro e pede nova tentativa mais tarde |
| Serviço de autenticação / tokens | Dados de login e refresh token | Access token renovado / erro de refresh | Encerra sessão e exige novo login |

---

### Requisitos Não Funcionais

| ID | Tipo | Requisito | Critério mensurável |
|---|---|---|---|
| RNF-01 | Segurança | Senhas devem ser armazenadas de forma criptografada e segura | 100% das senhas não são armazenadas em claro |
| RNF-02 | Disponibilidade | O fluxo de autenticação deve ser acessível para 99,5% do tempo durante horário comercial | Monitoramento de disponibilidade com alertas em falhas |
| RNF-03 | Desempenho | Login e registro devem responder em menos de 2 segundos | 95% das requisições de login/registro atendidas em < 2s |
| RNF-04 | Confiabilidade | O refresh token deve ser invalidado e renovado corretamente | 0% de refresh tokens reutilizáveis indevidamente em auditoria de sessão |

---

### O que Não Deve Ser Feito

- Não implementar autenticação social (Google, Facebook, etc.) nesta fase.
- Não permitir que o registro público atribua automaticamente a role `admin`.
- Não usar o mesmo refresh token para manter sessão indefinidamente.
- Não liberar acesso ao painel administrativo para usuários com role `adotante`.

---

## Grupo 4 — Validação

### Casos de Teste

| ID | Cenário | Entrada | Resultado esperado | Tipo |
|---|---|---|---|---|
| CT-01 | Registro válido | Nome, e-mail, senha e confirmação válidos | Conta criada pendente e e-mail enviado | Positivo |
| CT-02 | Senhas divergentes | Senha e confirmação diferentes | Erro exibido e conta não criada | Negativo |
| CT-03 | Confirmação válida | Link de confirmação válido | Conta ativada | Positivo |
| CT-04 | Confirmação inválida | Token inválido ou expirado | Erro exibido e conta permanece pendente | Negativo |
| CT-05 | Login de adotante ativo | E-mail e senha corretos | Redireciona para layout de adotante | Positivo |
| CT-06 | Login de admin ativo | E-mail e senha corretos | Redireciona para layout de admin | Positivo |
| CT-07 | Refresh token válido | Refresh token autenticado | Emite novo access token | Positivo |
| CT-08 | Refresh token expirado | Refresh token expirado ou inválido | Sessão encerrada e login requerido | Negativo |

---

### Critérios de Aceite

**Comportamento e entrega:**
- [ ] CA-01: O usuário pode registrar nova conta com nome, e-mail, senha e confirmação de senha.
- [ ] CA-02: O sistema envia um e-mail de confirmação após registro bem-sucedido.
- [ ] CA-03: A conta só é ativada após a confirmação do link enviado por e-mail.
- [ ] CA-04: Usuários com role `adotante` são redirecionados para o layout de adotante.
- [ ] CA-05: Usuários com role `admin` são redirecionados para o layout de administrador.
- [ ] CA-06: O refresh token é verificado a cada renovação e não permite manter sessão com token inválido ou expirado.
- [ ] CA-07: A role é avaliada no refresh, garantindo que o permissionamento seja revisado periodicamente.

**Regressão:**
- [ ] A autenticação não deve quebrar a navegação pública e as rotas não autenticadas existentes.

**Qualidade de código (SonarQube):**
- [ ] Quality Gate aprovado sem bloqueadores
- [ ] Cobertura de testes mínima aplicada às classes/módulos de autenticação
- [ ] Zero issues de segurança críticas no fluxo de autenticação

---

### Critério de Sucesso da Feature

| Métrica | Baseline atual | Meta após entrega | Como será medida |
|---|---|---|---|
| Taxa de ativação de conta | 0% | 100% de contas registradas exigem confirmação por e-mail | Verificação de contas em estado pendente vs ativadas no banco |
| Redirecionamento por role | N/A | 100% de logins exibem layout correto para `admin` ou `adotante` (prioridade aplicada) | Testes funcionais e-2-e de rota pós-login |
| Renovação de sessão segura | N/A | 0% de refresh tokens reutilizados indevidamente | Auditoria de logs de refresh, verificação de rotação |
| Latência de autenticação | N/A | < 2 segundos para 95% das requisições de login/registro | APM (Application Performance Monitoring) em staging |
| Detecção de mudança de role | N/A | 100% de mudanças de role detectadas no próximo refresh | Teste de revogação: mudar role e validar que sessão é invalidada |
| Conformidade de segurança | N/A | Quality Gate SonarQube aprovado, zero issues críticas | SonarQube scan + análise de código |
| Erros de login legítimos | N/A | < 0.5% em produção (alertas se > 1%) | Monitoramento de taxa de erro de 401/403 |
| Cobertura de testes | N/A | Mínimo 80% em módulo de auth | Coverage report de Jest/Vitest |

---

## Grupo 5 — Estimativa

### Esforço de Implementação

| Componente | Esforço | Notas |
|---|---|---|
| Backend Auth Module (NestJS) | ~40 horas | Controllers, services, persistence, email abstraction, JWT/refresh token logic |
| Frontend Pages & Forms (Next.js) | ~35 horas | Register, login, email verification pages + form validation + styling |
| Frontend Context & Hooks | ~20 horas | SessionContext, useAuth, useRole, protected routes middleware |
| Database Schema (Prisma) | ~8 horas | User, UserRole, EmailVerificationToken models + migrations |
| Testing (Unit + E2E) | ~25 horas | Backend service tests, frontend component tests, auth flow e-2-e |
| Documentation & DevOps | ~10 horas | API documentation, env setup, CORS, deployment checklist |
| **TOTAL** | **~138 horas** | **~3-4 semanas com 1 dev, ~2 semanas com 2 devs paralelos** |

### Story Points
**Estimativa: 21 Story Points** (usando fibonacci scale; baseado em complexidade de autenticação + multiple roles + refresh validation)

### Dependências de Bloqueia
- ✅ Stack confirmado (NestJS, Next.js, PostgreSQL, Supabase)
- ✅ Prisma configurado e migrations funcionando
- ✅ Supabase Auth integrado (email service funcional)
- ✅ Environment variables configuradas (.env)
- ⏳ Build process configurado (npm/yarn)

### Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Sincronização de role entre Supabase e PostgreSQL | Média | Alto | Refresh token valida roles a cada renovação; logs de auditoria |
| Token expiration na prática diferente da teoria | Baixa | Médio | Testes de token expiration em staging com timers precisos |
| Rate limiting de email (Supabase) | Baixa | Médio | Implementar cooldown de re-envio (1 min entre tentativas) |
| XSS via localStorage/sessionStorage | Baixa | Crítico | Usar HTTP-only cookies; validação de CSP headers |
| CSRF em refresh endpoint | Baixa | Médio | CSRF token middleware + SameSite cookie flag |

### Próximas Etapas
1. ✅ Spec aprovada e completa
2. ⏳ Criar tasks detalhadas (TASK-AUTH-001 backend, TASK-AUTH-002 frontend)
3. ⏳ Validar permissões e criar diagrama de fluxo sequencial
4. ⏳ Setup de ambiente (DB, Supabase config, email templates)
5. ⏳ Implementação paralela (backend + frontend)
6. ⏳ Testes e validação em staging
7. ⏳ Deploy para produção com monitoramento
