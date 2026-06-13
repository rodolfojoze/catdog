# Definição de Arquitetura

## Padrão Arquitetural Adotado

**Padrão:** Monólito modular em camadas com frontend e backend separados em um monorepo

**Justificativa:** O Catdog é um projeto pequeno, com volume inicial baixo e um time reduzido, atualmente composto por um único desenvolvedor. Nesse contexto, um monólito modular em camadas oferece menor complexidade operacional do que uma arquitetura distribuída, ao mesmo tempo em que mantém separação clara de responsabilidades por domínio. A adoção de um monorepo com frontend e backend separados facilita a organização do código, a evolução coordenada entre as aplicações e a manutenção do projeto, sem exigir a sobrecarga técnica de microsserviços.

---

## Como o Sistema está Organizado

O sistema será mantido em um monorepo com dois serviços principais: um frontend em Next.js e um backend em Node.js com NestJS. O frontend consome diretamente uma API REST exposta pelo backend, sem camada intermediária de BFF. No backend, a organização seguirá o padrão modular em camadas do NestJS, com separação por domínio e responsabilidades distribuídas entre módulos como autenticação, animais, espécies, solicitações de adoção, administração e upload de fotos. O Supabase será utilizado como base de dados e também como storage para arquivos da aplicação.

---

## Decisões Arquiteturais Importantes

| Decisão | O que foi decidido | Justificativa |
|---|---|---|
| Estrutura da solução | Uso de monorepo com frontend e backend separados | Facilita manutenção centralizada, versionamento conjunto e evolução coordenada do produto por um time pequeno |
| Padrão arquitetural do backend | Monólito modular em camadas usando organização padrão do NestJS | É suficiente para a complexidade atual do domínio e mantém boa separação de responsabilidades sem aumentar custo operacional |
| Comunicação entre aplicações | O frontend Next.js consumirá diretamente uma API REST do backend NestJS | Evita complexidade desnecessária com BFF ou camadas intermediárias em um produto de pequeno porte |
| Controle de acesso | Área pública sem login para consulta e solicitação, e painel interno restrito a administradores autenticados | Atende a separação natural entre uso público e operação interna da ONG |
| Autenticação | Uso de Supabase Auth para autenticação de administradores | Reduz esforço de implementação de autenticação e aproveita um serviço já alinhado ao restante da infraestrutura escolhida |
| Persistência e arquivos | Uso do Supabase para banco de dados e storage de fotos | Centraliza serviços essenciais da aplicação em uma única plataforma e simplifica a operação inicial do projeto |

---

## Diagramas

**C1 — Contexto:** `A definir` — visão do sistema no ecossistema  
**C2 — Containers:** `A definir` — principais blocos e tecnologias  
**C3 — Componentes:** `A definir` — organização interna
