# Restrições e Decisões Técnicas

> **Como preencher:** registre aqui o que não deve ser usado neste projeto e por quê. Restrições sem justificativa são ignoradas — registre o motivo com clareza.
> **Caminho:** `02-systems/{sistema}/architecture/tech-restrictions.md`
> **Importante:** restrições que exigem mais contexto ou que divergem dos padrões organizacionais devem virar um ADR em `architecture/adr/`.

---

## Tecnologias Proibidas

> Liste tecnologias, bibliotecas, frameworks ou abordagens que não devem ser usados neste projeto, independentemente do contexto.

| O que não usar | Motivo | Alternativa recomendada |
|---|---|---|
| Qualquer banco de dados fora do Supabase/PostgreSQL | O projeto já definiu o Supabase com PostgreSQL como base principal de persistência, evitando dispersão tecnológica e complexidade operacional para um time pequeno | PostgreSQL provisionado via Supabase |
| Comunicação em tempo real (WebSocket, SSE ou similares) | O escopo atual da plataforma de adoção não exige atualização em tempo real e esse tipo de solução aumentaria a complexidade sem benefício proporcional | API REST tradicional |
| Aplicativo mobile nativo | O produto atual será entregue como aplicação web, e manter apps nativos ampliaria custo, escopo e esforço de manutenção para o time reduzido | Frontend web com Next.js |
| Arquitetura de microsserviços | O sistema é pequeno, com volume inicial baixo e equipe enxuta; microsserviços adicionariam complexidade operacional e arquitetural desnecessária | Monólito modular em camadas |

---

## Restrições de Ambiente

> Limitações impostas pelo ambiente do cliente, infraestrutura existente ou políticas da organização.

| Restrição | Descrição | Impacto no projeto |
|---|---|---|
| Hospedagem de baixo custo ou gratuita | A solução deve priorizar serviços com baixo custo inicial ou gratuitos, compatíveis com o estágio inicial do projeto | Influencia a escolha de provedores, limita serviços gerenciados mais caros e favorece soluções simples de operação |
| Time pequeno | O projeto conta com 2 desenvolvedores | Exige decisões técnicas com baixa complexidade operacional, rápida curva de aprendizado e manutenção simples |
| Sem infraestrutura própria | Não haverá servidores, datacenter ou estrutura dedicada mantida pela equipe | Reforça o uso de plataformas gerenciadas e reduz viabilidade de soluções que dependam de operação manual complexa |
| Monorepo obrigatório | Frontend e backend devem permanecer no mesmo repositório | Influencia organização do código, padronização de tooling e integração contínua |

---

## Restrições de Segurança e Compliance

> Requisitos obrigatórios de segurança, privacidade ou regulação que condicionam as decisões técnicas.

| Requisito | Descrição | Como é atendido |
|---|---|---|
| Autenticação obrigatória para administradores | Apenas usuários autenticados podem acessar o painel interno e executar ações administrativas | Uso de autenticação com Supabase Auth e proteção das rotas administrativas |
| Proteção de dados pessoais dos adotantes | Os dados informados em solicitações de adoção devem ser tratados com cuidado, evitando exposição indevida | Armazenamento controlado no backend, acesso restrito ao painel administrativo e segregação entre área pública e área interna |
| HTTPS obrigatório | Toda comunicação entre cliente, frontend, backend e serviços externos deve ocorrer com criptografia em trânsito | Publicação da aplicação somente em ambientes com HTTPS habilitado |
| Controle de acesso ao painel interno | Somente administradores autorizados podem visualizar e manipular dados administrativos e solicitações | Validação de autenticação e autorização nas rotas e funcionalidades do painel interno |

---

## Decisões Tomadas e Não Reverter

> Escolhas técnicas já feitas e consolidadas que não devem ser questionadas sem um ADR. Diferente de proibições — são decisões que já custaram tempo e que reverter teria custo alto.

| Decisão | Contexto | Por que não reverter |
|---|---|---|
| NestJS como framework do backend | Definido na arquitetura inicial do Catdog para estruturar a API REST em módulos e camadas | Trocar exigiria reestruturação da base backend, mudança de padrões do projeto e retrabalho técnico significativo |
| Next.js como framework do frontend | Definido para implementar a área pública e o painel administrativo em uma aplicação web moderna | A troca impactaria toda a implementação da interface, organização do frontend e integração com o backend |
| Supabase para database, auth e storage | Escolhido como plataforma principal para persistência, autenticação e armazenamento de arquivos | Reverter exigiria migração de dados, autenticação e arquivos, além de aumentar custo e risco técnico |
| Prisma como camada de acesso a dados | Definido como ORM/cliente de banco para integração com PostgreSQL | Substituir afetaria modelagem, acesso a dados, migrações e produtividade do time |
| Monorepo com frontend e backend | Decisão estrutural da solução para manter organização centralizada e simplificar desenvolvimento do time pequeno | Alterar para múltiplos repositórios aumentaria overhead de manutenção, integração e coordenação |
