# Objetivo do Projeto

## Identificação do Sistema

**Nome do sistema:** Catdog

**Status:** Em desenvolvimento

**Repositório de código:** A definir

**Última atualização:** 2026-06-06 — José

### Ambientes

| Ambiente | URL |
|---|---|
| Desenvolvimento | A definir |
| Homologação | A definir |
| Produção | A definir |

---

## Problema a Ser Resolvido

**Situação atual:** Hoje a divulgação dos animais disponíveis para adoção é feita manualmente e de forma descentralizada em redes sociais como Facebook, WhatsApp e Instagram. As pessoas interessadas entram em contato por esses canais e demonstram interesse diretamente por mensagem. O processo de acompanhamento das solicitações não fica centralizado em uma única ferramenta.

**Causa raiz:** O problema existe porque a ONG não possui um sistema próprio para cadastrar os animais, publicar informações de forma organizada e registrar o andamento das solicitações de adoção. Com isso, o processo depende de interações manuais em canais externos e do controle individual dos administradores.

**Impacto:** A ONG sofre com perda de padronização, dificuldade para acompanhar cada interessado, risco de dispersão de informações e maior esforço operacional para avaliar adoções. Os adotantes também enfrentam um processo menos claro, com menos visibilidade sobre os animais disponíveis e dependência de contato manual para demonstrar interesse.

---

## Objetivo do Projeto

**Onde devemos chegar com o projeto entregue:**

- Centralizar em uma única plataforma o cadastro e a divulgação dos animais disponíveis para adoção.
- Permitir que pessoas interessadas registrem solicitação de adoção pelo sistema, informando dados básicos para avaliação inicial.
- Dar aos administradores da ONG um controle interno do processo de análise das solicitações, com registro do andamento por status.
- Organizar o processo de adoção mesmo mantendo a comunicação e as entrevistas com o adotante em canais externos, como WhatsApp e redes sociais.

---

## Visão Geral do Sistema

### Propósito

O Catdog é uma plataforma de adoção de animais de uma única organização. Seu propósito é centralizar a divulgação dos animais disponíveis, permitir que adotantes registrem interesse de adoção e oferecer aos administradores uma forma estruturada de controlar o processo de análise. O sistema reduz a dependência de controles manuais e melhora a organização interna da ONG, mesmo com a comunicação externa acontecendo fora da plataforma.

### Público-Alvo e Usuários

**Perfil 1 — Administrador da ONG**  
Descrição: responsável pelo cadastro e manutenção dos animais disponíveis, além da análise das solicitações de adoção recebidas. Atua como aprovador do processo.  
O que faz e quando faz: cadastra animais, informa fotos e dados relevantes, acompanha solicitações recebidas, altera status do processo e aprova ou rejeita pedidos conforme a avaliação interna da ONG.

**Perfil 2 — Adotante**  
Descrição: pessoa interessada em adotar um animal disponibilizado pela ONG.  
O que faz e quando faz: consulta a listagem de animais disponíveis, visualiza informações e fotos, registra interesse em um animal e envia os dados solicitados para iniciar a avaliação de adoção.

**Perfil 3 — Responsável pela ONG**  
Descrição: pessoa de negócio com interesse direto no funcionamento da operação de adoção e na aprovação do projeto. Neste contexto, representa a gestão da organização.  
O que faz e quando faz: acompanha a aderência do sistema às necessidades da ONG, valida decisões de escopo e garante que o processo de adoção esteja alinhado à operação real.

### Contexto de Mercado e Posicionamento

**Contexto de mercado:** O sistema atua no segmento de adoção de animais por organizações de proteção animal. Nesse contexto, muitas ONGs pequenas e médias ainda operam com divulgação e triagem feitas manualmente por redes sociais e aplicativos de mensagens.

**Posicionamento:** O Catdog se posiciona como uma plataforma simples e focada na operação de uma única ONG, priorizando centralização do catálogo de animais e controle interno das solicitações de adoção, sem tentar substituir os canais externos de comunicação já usados pela organização.

**Público-alvo de mercado:** O sistema se destina a organizações de adoção e proteção animal que precisam organizar a divulgação dos animais e o fluxo de análise de interessados, especialmente operações com processo ainda manual e descentralizado.

### Contexto de Uso pelo Cliente

O Catdog será usado pela ONG como ferramenta central para cadastrar os animais disponíveis e registrar as solicitações de adoção. No dia a dia, os administradores irão manter atualizado o catálogo de animais e acompanhar internamente o andamento de cada solicitação. O sistema suporta a organização do processo, mas o contato com o adotante, entrevistas e demais interações continuarão acontecendo fora da plataforma, principalmente por WhatsApp e redes sociais. Neste momento, não há integrações definidas com outros sistemas.

---

## Contexto de Negócio

**Sobre o negócio:** A organização responsável pelo Catdog atua com adoção de animais e precisa de mais controle sobre a divulgação dos animais disponíveis e sobre o processo de triagem de interessados. O objetivo de negócio é reduzir a informalidade operacional, centralizar informações e facilitar a gestão das demandas de adoção.

**Domínio e segmento:** O sistema se insere no domínio de adoção de animais, dentro do segmento de organizações de proteção animal e intermediação de adoções.

**Processo atual (como as pessoas fazem hoje):** Atualmente os animais são divulgados em redes sociais como Facebook, Instagram e WhatsApp. Os interessados entram em contato por esses canais para demonstrar interesse. A análise ocorre de forma individual, com retorno manual dos administradores, também por WhatsApp. O controle do processo não está concentrado em uma ferramenta única.

**Restrições e regras de negócio relevantes:** O sistema atenderá uma única organização. A comunicação com os adotantes ocorrerá fora da plataforma. O adotante registra apenas o interesse inicial no sistema, informando nome, telefone, cidade e tipo de moradia. O administrador pode aprovar ou rejeitar a solicitação dentro do sistema. O acompanhamento interno do processo deve contemplar os status: Formulário, Envio da documentação, Entrevista, Visita domiciliar e Aprovação final.

---

## Escopo Macro do Projeto

| # | Módulo / Epic | Prioridade |
|---|---|---|
| 1 | Cadastro de animais e espécies | Alta |
| 2 | Listagem de animais disponíveis | Alta |
| 3 | Gestão de solicitações de adoção | Alta |

---

## Escopo Negativo do Projeto

| O que não será feito | Motivo |
|---|---|
| Pagamentos na plataforma | Não faz parte do processo de adoção definido para esta versão do projeto |
| Comunicação com adotantes pela plataforma | A ONG continuará usando canais externos como WhatsApp e redes sociais |
| Marketplace ou operação com múltiplas organizações | O sistema será voltado para uma única organização |

---

## Pessoas e Interesses (Stakeholders)

| Nome | Empresa / Área | Papel no Projeto |
|---|---|---|
| Maria | Catdog / ONG | Patrocinadora e responsável pelo negócio |
| José | Desenvolvimento | Desenvolvedor |
| Administradores da ONG | Catdog / Operação | Usuários internos e aprovadores das solicitações |
| Adotantes | Público externo | Usuários finais |
