# Detalhamento do Escopo Macro do Projeto

## Visão Geral do Produto

O Catdog é uma plataforma de adoção de animais voltada para uma única organização. O produto centraliza o cadastro e a divulgação dos animais disponíveis, além de permitir que pessoas interessadas registrem solicitação de adoção pela própria plataforma. O sistema organiza internamente o processo de análise das solicitações, reduzindo a dependência de controles manuais e descentralizados em redes sociais. Quando o projeto estiver completo, a ONG terá um catálogo público atualizado de animais e um fluxo interno estruturado para gestão das adoções.

---

## Roadmap

| Ordem | Módulo | O que entrega ao negócio |
|---|---|---|
| 1 | Cadastro de animais e espécies | Permite à ONG manter uma base centralizada e atualizada dos animais disponíveis para adoção |
| 2 | Listagem de animais disponíveis | Disponibiliza ao público um catálogo claro e padronizado dos animais aptos para adoção |
| 3 | Gestão de solicitações de adoção | Dá controle interno sobre o andamento das solicitações e apoia a tomada de decisão dos administradores |

---

## Módulos e Features

---

### Módulo: Cadastro de animais e espécies

Este módulo permite que os administradores da ONG mantenham o catálogo de animais atualizado dentro da plataforma. Ele resolve a necessidade de registrar e organizar os dados dos animais disponíveis para adoção, além de manter um cadastro simples das espécies aceitas no sistema. O valor principal é garantir que a base pública de animais seja confiável e administrável.

#### Feature: Cadastro de animais

Esta feature permite ao administrador registrar um animal disponível para adoção com os dados necessários para exibição pública e controle interno. O cadastro inclui nome, espécie, raça, idade, sexo, porte, descrição e fotos, formando uma ficha completa para avaliação pelos adotantes. O valor entregue é a centralização das informações dos animais em um único sistema, reduzindo a dependência de publicações dispersas em redes sociais.

#### Feature: Edição e inativação de animais

Esta feature permite ao administrador atualizar os dados de um animal já cadastrado e também inativá-lo quando ele não deve mais aparecer para adoção. A edição garante que mudanças de descrição, fotos ou dados do animal possam ser refletidas no catálogo sem recriar registros. A inativação é uma regra importante do negócio, pois remove automaticamente o animal da listagem pública e evita que ele continue sendo exibido quando não estiver mais disponível.

#### Feature: Cadastro de espécies

Esta feature permite ao administrador manter um cadastro simples de espécies, composto apenas pelo nome da espécie, como por exemplo cão e gato. O objetivo é padronizar o preenchimento do cadastro de animais e viabilizar a organização posterior da listagem pública. O valor entregue é consistência na base de dados e apoio à filtragem e categorização dos animais sem tornar o processo administrativo complexo.

---

### Módulo: Listagem de animais disponíveis

Este módulo entrega ao adotante uma vitrine pública com os animais que realmente estão disponíveis para adoção. Ele resolve o problema da divulgação descentralizada e facilita a consulta das informações mais relevantes antes do registro de interesse. O valor para o produto é tornar a descoberta dos animais mais clara, padronizada e acessível.

#### Feature: Exibição pública dos animais disponíveis

Esta feature mostra ao adotante os animais ativos e aptos para adoção com suas principais informações e fotos. A exibição inclui foto, nome, espécie, raça, idade, sexo, porte e descrição, permitindo uma avaliação inicial do perfil do animal. O valor entregue é oferecer um catálogo mais organizado e confiável do que publicações avulsas em redes sociais, concentrando as informações relevantes em um único ambiente.

#### Feature: Filtros de busca por espécie e porte

Esta feature permite ao adotante refinar a listagem de animais disponíveis utilizando filtros por espécie e porte. O objetivo é tornar a navegação mais eficiente, principalmente quando a ONG possuir vários animais cadastrados ao mesmo tempo. O valor entregue é melhorar a experiência de consulta e aumentar a chance de o adotante encontrar com rapidez animais alinhados ao seu interesse.

#### Feature: Regras de visibilidade da listagem

Esta feature define quais animais podem ou não aparecer para o público na vitrine do sistema. Animais inativados pelo administrador ou animais que já tenham adoção aprovada não devem ser exibidos na listagem pública. O valor entregue é preservar a confiabilidade do catálogo e evitar que adotantes iniciem interesse em animais que já não estão disponíveis.

---

### Módulo: Gestão de solicitações de adoção

Este módulo permite que a ONG registre e acompanhe internamente o processo de adoção a partir do interesse demonstrado pelos adotantes. Ele organiza as etapas de análise sem substituir a comunicação externa, que continuará acontecendo por WhatsApp e redes sociais. O valor principal é dar rastreabilidade ao processo e apoiar a decisão dos administradores.

#### Feature: Registro de solicitação de adoção

Esta feature permite que o adotante inicie uma solicitação diretamente a partir da página de um animal disponível. Para registrar o interesse, o adotante informa nome, telefone, cidade e tipo de moradia, gerando uma solicitação vinculada ao animal escolhido. O valor entregue é transformar um interesse informal em um registro estruturado dentro do sistema, criando uma base inicial para a análise da ONG.

#### Feature: Controle de solicitação ativa por adotante e animal

Esta feature aplica a regra de negócio de permitir apenas uma solicitação ativa por animal para o mesmo adotante. O objetivo é evitar duplicidade de registros e reduzir confusão no acompanhamento administrativo. O valor entregue é manter o processo mais consistente e organizado, impedindo que o mesmo interesse seja registrado várias vezes de forma redundante.

#### Feature: Acompanhamento do fluxo de análise

Esta feature permite ao administrador avançar manualmente a solicitação pelas etapas do processo de adoção. O fluxo previsto contempla os status Formulário, Envio da documentação, Entrevista, Visita domiciliar e Aprovação final, refletindo o processo real da ONG. O valor entregue é visibilidade operacional sobre o estágio de cada solicitação, mesmo quando o contato com o adotante acontece fora da plataforma.

#### Feature: Aprovação, rejeição e observação interna

Esta feature permite ao administrador concluir a análise da solicitação com uma decisão de aprovação ou rejeição registrada no sistema. Além da decisão, o administrador pode manter uma observação interna para documentar informações relevantes do processo, sem expor esse conteúdo ao adotante. O valor entregue é fortalecer o controle interno da ONG e preservar histórico de decisão para acompanhamento posterior.

---

## Fora do Escopo

| Item excluído | Motivo |
|---|---|
| Pagamentos na plataforma | O processo de adoção desta versão não envolve transações financeiras dentro do sistema |
| Comunicação com adotantes pela plataforma | O contato continuará sendo realizado por canais externos, como WhatsApp e redes sociais |
| Suporte a múltiplas organizações | O produto será dedicado à operação de uma única ONG |
| Aplicativo mobile nativo | O escopo atual está focado na plataforma principal, sem expansão para app dedicado nesta fase |
