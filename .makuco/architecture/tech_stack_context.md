# Stack de Tecnologia

## Linguagem e Runtime

| Item | Tecnologia | Versão | Observação |
|---|---|---|---|
| Linguagem principal | TypeScript | A definir | Linguagem principal usada no backend NestJS e no frontend Next.js |
| Runtime / Plataforma | Node.js | A definir | Runtime principal para execução das aplicações JavaScript/TypeScript do projeto |
| Gerenciador de pacotes | npm | A definir | Gerenciador de pacotes adotado no monorepo |

---

## Frameworks e Bibliotecas Principais

| Camada | Framework / Biblioteca | Versão | Finalidade |
|---|---|---|---|
| Backend | NestJS | A definir | Estruturar a API backend do sistema e organizar os módulos de negócio |
| Frontend | Next.js | A definir | Implementar a interface pública e o painel administrativo da aplicação |
| ORM / Acesso a dados | Prisma | A definir | Realizar acesso ao banco PostgreSQL provisionado via Supabase |
| Testes | A definir | A definir | Biblioteca de testes ainda não definida |

---

## Banco de Dados

| Tipo | Tecnologia | Versão | Uso no sistema |
|---|---|---|---|
| Relacional | PostgreSQL via Supabase | A definir | Armazenamento dos dados de administradores, animais, espécies e solicitações de adoção |
| Cache | A definir | A definir | Nenhuma tecnologia de cache definida até o momento |
| Busca | A definir | A definir | Nenhuma tecnologia de busca especializada definida até o momento |

---

## Infraestrutura e Cloud

| Item | Tecnologia | Observação |
|---|---|---|
| Cloud provider | A definir | Plataforma de hospedagem ainda não decidida |
| Containers | A definir | Uso de Docker ainda não definido |
| Orquestração | A definir | Não há estratégia de orquestração definida no momento |
| CI/CD | A definir | Pipeline de integração e entrega contínua ainda não definido |
| Monitoramento | A definir | Ferramentas de logs e monitoramento ainda não definidas |

---

## Sistemas e Componentes Externos

| Sistema / Componente | Tipo | Finalidade | Como integra |
|---|---|---|---|
| Supabase Database | API / Plataforma gerenciada | Persistência relacional dos dados do sistema | Acesso via Prisma ao PostgreSQL provisionado no Supabase |
| Supabase Auth | API / Serviço gerenciado | Autenticação dos administradores do painel interno | Integração com backend e fluxo de autenticação da aplicação |
| Supabase Storage | API / Serviço gerenciado | Armazenamento de fotos dos animais | Upload e recuperação de arquivos pela aplicação |

---

## Ferramentas de Desenvolvimento

| Ferramenta | Finalidade |
|---|---|
| Git | Controle de versão do código-fonte |
| GitHub | Hospedagem do repositório e colaboração de desenvolvimento |
| IDE/editor a definir | Ambiente principal de desenvolvimento ainda não definido |
| Ferramenta de teste de API a definir | Testes e inspeção das rotas da API ainda sem ferramenta escolhida |
