# Glossário do Projeto

## Termos do Domínio

| Termo | Tradução EN | Definição | Evitar (sinônimos incorretos) |
|---|---|---|---|
| Administrador | Administrator | Membro da ONG com acesso ao painel interno do Catdog. É responsável por cadastrar e manter animais, gerenciar espécies e acompanhar as solicitações de adoção. Também pode aprovar ou rejeitar solicitações dentro do sistema. No contexto atual, existem 3 administradores atuando na operação. | admin, gestor, operador |
| Adotante | Adopter | Pessoa externa à ONG que acessa a plataforma para consultar os animais disponíveis e registrar interesse em adoção. O adotante informa dados básicos no momento da solicitação, como nome, telefone, cidade e tipo de moradia. A comunicação posterior com a ONG ocorre fora da plataforma. | usuário, cliente, interessado |
| Animal | Animal | Entidade principal da plataforma que representa um ser disponibilizado pela ONG para adoção. Cada animal possui informações públicas como nome, espécie, raça, idade, sexo, porte, descrição e fotos. O animal é gerenciado pelo administrador e pode estar disponível, inativo ou adotado, conforme o andamento do processo de adoção. | pet, item, anúncio |
| Aprovação final | Final approval | Etapa final do fluxo de solicitação de adoção que indica que o processo foi concluído com sucesso pela ONG. Quando uma solicitação chega a esse status, entende-se que a adoção foi aprovada e concluída. Esse status integra o acompanhamento interno realizado pelos administradores. | conclusão informal, fechamento |
| Espécie | Species | Classificação básica do animal dentro do sistema, utilizada para organizar o cadastro e apoiar a filtragem da listagem pública. A espécie é cadastrada e mantida pelo administrador e contém apenas o nome, como por exemplo cão ou gato. Cada animal deve estar vinculado a uma espécie. | tipo de animal, categoria |
| Solicitação de adoção | Adoption request | Registro formal de interesse realizado por um adotante para um animal específico dentro da plataforma. A solicitação inicia o fluxo interno de análise da ONG e passa por etapas como formulário, envio da documentação, entrevista, visita domiciliar e aprovação final, podendo também ser rejeitada ou cancelada. Cada adotante pode ter apenas uma solicitação ativa por animal. | pedido, requisição |

---

## Status e Ciclos de Vida

### Animal

O ciclo de vida do animal define sua disponibilidade para adoção e sua visibilidade na listagem pública. O administrador controla esse status conforme a situação operacional da ONG.

| Status | Descrição | Transições permitidas |
|---|---|---|
| Disponível | Animal cadastrado e visível na listagem pública para adoção. Pode receber solicitações de adotantes. | Inativo, Adotado |
| Inativo | Animal mantido no sistema, mas removido da listagem pública e indisponível para novas solicitações. | Disponível, Adotado |
| Adotado | Animal com adoção concluída. Não aparece mais na listagem pública. | Sem transição prevista |

### Solicitação de adoção

O ciclo de vida da solicitação representa o processo interno de análise realizado pela ONG a partir do interesse registrado pelo adotante no sistema. Embora a comunicação externa aconteça fora da plataforma, o acompanhamento do progresso fica registrado no Catdog.

| Status | Descrição | Transições permitidas |
|---|---|---|
| Formulário | Etapa inicial criada quando o adotante registra interesse e envia seus dados básicos. | Envio da documentação, Cancelada, Rejeitada |
| Envio da documentação | Etapa em que a ONG solicita e acompanha externamente o envio dos documentos necessários para análise. | Entrevista, Cancelada, Rejeitada |
| Entrevista | Etapa em que ocorre a entrevista com o adotante, realizada fora da plataforma, com controle interno no sistema. | Visita domiciliar, Cancelada, Rejeitada |
| Visita domiciliar | Etapa de avaliação final antes da decisão, quando a ONG realiza ou registra a visita domiciliar do adotante. | Aprovação final, Cancelada, Rejeitada |
| Aprovação final | Etapa de conclusão bem-sucedida da solicitação, indicando adoção aprovada e encerrada. | Sem transição prevista |
| Rejeitada | Solicitação encerrada por decisão do administrador durante o processo de análise. | Sem transição prevista |
| Cancelada | Solicitação encerrada por desistência do adotante ou interrupção do processo. | Sem transição prevista |

---

## Relações Entre Termos

- Um animal pertence a uma espécie.
- Uma solicitação de adoção pertence a exatamente um animal.
- Uma solicitação de adoção pertence a exatamente um adotante.
- Um administrador pode gerenciar múltiplos animais e múltiplas solicitações de adoção.
- Um adotante pode ter apenas uma solicitação ativa por animal.
- Quando uma solicitação chega em aprovação final, o animal deixa de estar disponível na listagem pública.

---

## Siglas e Abreviações

No momento, o projeto Catdog não possui siglas ou abreviações de negócio definidas e padronizadas.

| Sigla | Significado | Contexto de uso |
|---|---|---|

---

## Histórico de Alterações

| Data | Termo | Alteração | Motivo |
|---|---|---|---|
| 2026-06-06 | Administrador, Adotante, Animal, Aprovação final, Espécie, Solicitação de adoção | Adicionado | Registro inicial do glossário do domínio do projeto Catdog |
| 2026-06-06 | Status de Animal e Solicitação de adoção | Adicionado | Formalização dos ciclos de vida e transições do processo de adoção |
