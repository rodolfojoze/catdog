# Gestão do Projeto e Ciclo de Desenvolvimento

> **Como preencher:** registre aqui como o projeto é gerenciado — onde o trabalho vive, como está organizado e como o time opera no dia a dia. Qualquer pessoa que entre no projeto deve conseguir entender o fluxo de trabalho lendo este documento.
> **Caminho:** `02-systems/{sistema}/management/project-management.md`

---

## Plataforma de Gestão

**Plataforma:** GitHub Projects  
**URL / Acesso:** Acesso via repositório no GitHub; link específico do board ainda a definir  
**Como solicitar acesso:** A definir

---

## Modelo de Organização do Trabalho

> Defina o significado de cada nível da hierarquia de trabalho neste projeto. Sem essa definição, cada pessoa do time interpreta os conceitos de forma diferente.

| Nível | Nome utilizado | O que representa | Exemplo |
|---|---|---|---|
| 1 — mais alto | Epic | Grande entrega do produto que agrupa um conjunto relevante de funcionalidades orientadas a um objetivo de negócio | Módulo de adoção |
| 2 | Feature | Funcionalidade de negócio dentro de uma epic, com valor identificável para o sistema | Cadastro de animal |
| 3 | Task | Atividade técnica necessária para implementar parte de uma feature | Criar endpoint de cadastro de animal |
| 4 — mais baixo | Não utilizado atualmente | O projeto não definiu um nível adicional abaixo de task neste momento | A definir |

---

## Tamanho e Critérios de um PBI

> O tamanho máximo de um PBI define o ritmo de entrega e a capacidade de revisão do time. Estabeleça limites claros para evitar PBIs que duram semanas.

**Tamanho máximo:** A definir

**Um bom PBI deve:**
- Ter um objetivo claro e compreensível para quem vai implementar
- Representar uma entrega pequena o suficiente para ser acompanhada pelo time reduzido
- Poder ser desenvolvido e revisado sem depender de decomposição excessiva fora do fluxo definido
- Estar associado a uma epic ou feature de negócio do projeto

**Um PBI deve ser quebrado quando:**
- Ficar grande demais para acompanhamento simples dentro do fluxo Kanban
- Misturar mais de uma responsabilidade principal
- Dificultar revisão ou validação por outro desenvolvedor

---

## Modelo de Desenvolvimento

**Metodologia:** Kanban simples

**Duração do ciclo:** Fluxo contínuo, sem sprints formais

**Início do ciclo:** Não se aplica; os itens entram no fluxo conforme priorização e necessidade do projeto

---

## Cerimônias e Rituais

> Liste apenas as cerimônias que este time realmente pratica. Remova as que não se aplicam.

| Cerimônia | Frequência | Duração | Objetivo |
|---|---|---|---|
| Alinhamentos informais entre os desenvolvedores | Conforme necessidade | Variável | Sincronizar andamento, discutir dúvidas e resolver bloqueios do projeto |

---

## Fluxo de Status

> Defina os status que um item percorre desde a criação até a entrega. Mapeie exatamente como está configurado na plataforma de gestão.

| Status | Descrição | Quem move para cá |
|---|---|---|
| Backlog | Item registrado, mas ainda não iniciado | Desenvolvedor responsável ou time ao registrar/priorizar o item |
| In Progress | Item em desenvolvimento ativo | Próprio desenvolvedor responsável |
| Review | Implementação concluída e aguardando revisão do outro desenvolvedor | Próprio desenvolvedor responsável |
| Done | Item revisado e considerado concluído | Desenvolvedor responsável após revisão ou em alinhamento com o outro desenvolvedor |

---

## Definição de Pronto (Definition of Done)

> Um item só pode ser marcado como Done quando todos os critérios abaixo forem atendidos. Esta lista é do time — ajuste conforme a realidade do projeto.

- Funcionalidade implementada e funcionando conforme especificado
- Código revisado pelo outro desenvolvedor
- Sem erros evidentes em ambiente de desenvolvimento

---

## Acompanhamento e Monitoramento

**Responsável pelo acompanhamento:** Os próprios desenvolvedores

**Métricas acompanhadas:**

| Métrica | O que mede | Onde é acompanhada | Frequência |
|---|---|---|---|
| A definir | As métricas formais do projeto ainda não foram definidas | A definir | A definir |

**Reporte para stakeholders:** Reporte informal para Maria, dona da ONG, conforme o avanço do projeto
