# MOTION

## Integrantes

- Pedro Henrique

---

## Sobre o produto

MOTION é um protótipo web editorial automotivo com identidade visual "Black Editorial": fundo escuro, tipografia forte e composições cinematográficas que valorizam fotografias e textos editoriais. O projeto reúne um arquivo de carros, conteúdo editorial (Stories), fabricantes (Brands) e coleções curadas (Collections). A experiência foca em descoberta visual, narrativa e numa apresentação tipo revista digital, voltada para entusiastas e estudantes de design/UX.

Público-alvo: entusiastas automotivos, colecionadores, estudantes de design/UX e leitores interessados em conteúdo editorial sobre carros.

Proposta: demonstrar, em formato de protótipo client-side, uma experiência editorial automotiva navegável. O projeto não possui backend — todos os dados são mockados e a persistência local (Garagem) usa localStorage.

Diferenciais: linguagem visual Black Editorial, curadoria de conteúdo, navegação por coleções e histórias, microinterações com Framer Motion e componentes reutilizáveis para consistência visual.

---

## Jornada de construção

Esta seção descreve como o MOTION nasceu, evoluiu e foi implementado até a versão entregue.

### Ideia inicial

A ideia surgiu da combinação entre interesse por automóveis e a necessidade acadêmica de produzir um projeto frontend que contemplasse produto, UX e design editorial. O tema automotivo foi escolhido por oferecer ativos visuais fortes (fotografia, formas, textura) e uma narrativa rica (história dos modelos, fabricantes e cultura automotiva) — um bom cenário para trabalhar composição tipográfica, hierarquia e storytelling visual.

Inicialmente o projeto foi pensado como um catálogo de carros com fichas técnicas. Com o tempo, a proposta evoluiu para uma experiência editorial que combina:

- artigos e spreads (Stories) para contextualizar os veículos;
- curadorias (Collections) para agrupar por tema/ideia;
- uma área de descoberta (Discovery) com recortes do arquivo;
- uma Garagem local (persistência via localStorage) para salvar favoritos;
- navegação e detalhes por marcas e veículos (Brands, CarDetail).

Essa evolução manteve o foco em apresentação visual e usabilidade: a Home/landing foi simplificada para servir como vitrine do produto (hero, benefícios, prova visual e CTA) enquanto as páginas de demonstração preservam a navegação e os estados relevantes para a atividade acadêmica.

### Pesquisa e referências

Pesquisas e referências guiaram decisões de estética, tipografia e composição. Entre os insumos de design consideramos:

- linguagem editorial contemporânea (hierarquia tipográfica, margens e ritmo); 
- referências visuais de revistas automotivas e projetos com foco em fotografia cinematográfica;
- Awwwards como inspiração de polimento e qualidade de execução — usado apenas como referência de linguagem (o layout não foi copiado);
- o conceito "Black Editorial": superfície escura, contraste forte para destaque das imagens e tipografia com presença, buscando criar atmosfera editorial e foco na imagem.

As referências foram usadas como inspiração e ponto de partida para escolhas tipográficas, espaçamentos e composição, sem reproduzir layouts específicos de terceiros.

### Ferramentas utilizadas

- React (interface)
- TypeScript (tipagem)
- Vite (dev server / build)
- React Router (navegação)
- Framer Motion (microinterações/entradas animadas)
- CSS com tokens (design system mínimo)
- localStorage (persistência da Garagem)
- Git / GitHub (controle de versão)
- VS Code (desenvolvimento)
- Ferramentas de edição de imagem (uso típico para preparar ativos — não parte do código)
- OpenCode (agente de auxílio durante desenvolvimento/documentação)

---

## Uso de IA

Esta seção descreve honestamente como e quando a IA (agente OpenCode) foi utilizada no desenvolvimento.

### Ferramenta / agente utilizado

O projeto recebeu assistência do agente OpenCode (um fluxo de auxílio automatizado durante o desenvolvimento). OpenCode foi usado como ferramenta de suporte para auditoria, sugestões de correção e geração de trechos de documentação. Todas as decisões finais foram tomadas pelo desenvolvedor.

### Como a IA foi utilizada (resumo real)

- Auditoria de código: análise de warnings e erros no console e identificação de causas (ex.: ordem de hooks, uso de require no ambiente ESM, aninhamento inválido de tags HTML).
- Implementação e patches: a IA sugeriu mudanças pontuais no código (p. ex. mover algumas chamadas de hooks useMemo antes de retornos condicionais, substituir require por import, e ajustar marcação HTML para evitar <p> aninhado). Essas alterações foram revisadas e aplicadas pelo desenvolvedor.
- Geração de conteúdo/documentação: auxílio na redação do README e sugestões de estrutura textual.
- Verificação e QA orientado: a IA ajudou a identificar pontos a validar após mudanças (reiniciar dev server, rotas a testar, verificar console).

### Processo de interação (fluxo real)

O ciclo seguido foi: Prompt (descrever problema ou tarefa) → análise do código e do console → sugestão de patch pela IA → revisão humana do patch → aplicação (commit) quando aprovada → verificação local pelo desenvolvedor.

### Decisões humanas

As sugestões da IA foram tratadas como recomendações. O desenvolvedor aprovou e aplicou mudanças quando compatíveis com os objetivos e com a regra de não alterar arquivos além do necessário para consertos. Decisões estéticas, textuais e de produto foram decididas pelo desenvolvedor.

### Exemplos reais de sugestões mantidas

- Mover hooks (useMemo) para antes de retornos condicionais em Discovery, Stories e StoryDetail para corrigir erro de ordem de hooks.
- Substituir require(...) por import ESM em CollectionDetail para eliminar ReferenceError no ambiente de desenvolvimento (Vite/browser).
- Corrigir nested <p> para <span> em Discovery para eliminar warning de validação DOM.

### Sugestões alteradas ou descartadas

- A IA sugeriu optar por future flags do React Router (opt-in para alterações do v7). A equipe optou por não aplicar o opt‑in durante esta entrega, mantendo comportamento padrão (a sugestão foi documentada e ficou como opção futura).

### Troca de modelo

Durante o desenvolvimento não houve troca de modelo reportada. O uso foi centralizado no agente OpenCode conforme necessidade; não foram registradas mudanças de modelo durante o processo.

---

## Evolução da solução (narrativa)

O projeto começou como uma experiência para reunir imagens e fichas técnicas de carros. Com o avanço das iterações, percebeu‑se que a riqueza visual do tema permitia algo além de um catálogo: uma revista digital. Esse insight levou à inclusão de Stories (textos editoriais) e Collections (curadorias), tornando o produto mais narrativo.

Para atender à Atividade 01, a Home foi remodelada para funcionar como uma Landing Page de produto — com hero, benefícios, explicação de funcionamento, prova visual, prova social fictícia, oferta simulada e FAQ — enquanto as páginas do arquivo (Cars, Brands, Collections e detalhes) permaneceram como demonstração das funcionalidades. Houve atenção especial à legibilidade (contraste e tokens de cor), responsividade e consistência tipográfica. O projeto passou por ciclos de QA: testes manuais, correção de imports e ajustes de layout menores.

Decisões técnicas relevantes:

- Mantivemos toda a lógica client-side (sem backend) para simplificar a entrega e focar na experiência visual e de navegação.
- Dados ampliados simulados em src/data/mock.ts para demonstrar conteúdo suficiente para a atividade.
- A Garagem persiste slugs em localStorage, suficiente para demonstração de fluxo de salvar/favoritar.

---

## Resultado final

### Como avaliamos o resultado

- Pontos fortes: identidade visual consistente (Black Editorial), navegação clara entre páginas, seções editoriais (Stories), curadorias (Collections) e interações sutis com Framer Motion.
- Experiência visual: imagens com destaque, tipografia hierarquizada e composição editorial que destaca conteúdo e navegação.
- Navegação: rotas implementadas e CTAs funcionais que direcionam para páginas existentes (/discovery, /cars, /garage, etc.).
- Atendimento ao enunciado: o protótipo contém hero, benefícios, como funciona, prova social fictícia, oferta simulada, FAQ e CTA funcional.

### O que aprendemos

- React e regras de hooks: atenção à ordem de hooks (useState/useMemo) e impactos em renders condicionais.
- Componentização: utilidade de primitives (card, card-media, card-body) para consistência e repetibilidade.
- Design editorial: importância do contraste, ritmo tipográfico e tratamento de imagens para composições cinematográficas.
- Uso de IA: o agente ajudou a acelerar auditoria e a propor patches, porém a validação humana foi essencial.

### Limitações e o que faríamos diferente com mais tempo

Possíveis melhorias realistas:

- Backend e API para persistência real de garagem e conteúdo editorial;
- Painel administrativo para gerenciar Stories/Collections/Carros;
- Autenticação e perfis de usuário;
- Testes automatizados (unit e integration tests);
- Otimizações de performance e lazy-loading mais preciso;
- Acessibilidade: foco em leitura por screen readers, contraste refinado e testes com ferramentas de A11Y;
- Internacionalização (i18n) se necessário.

---

## Requisitos da Atividade 01 (Checklist)

- [x] Identidade visual
- [x] Nome e proposta
- [x] Hero
- [x] Benefícios
- [x] Diferenciais
- [x] Imagens/representações
- [x] Como funciona
- [x] Prova social (fictícia)
- [x] Oferta/preço (simulado)
- [x] FAQ
- [x] CTA funcional

---

## Arquitetura

Estrutura principal do frontend (preservada):

- src/pages — páginas e rotas (Home, Cars, CarDetail, Stories, StoryDetail, Brands, BrandDetail, Collections, CollectionDetail, Discovery, Search, Garage)
- src/components — componentes reutilizáveis (Navigation, Footer, estados UI: Loading, ErrorState, EmptyState)
- src/sections — seções editoriais (Hero, FeaturedCar, FeaturedStory, Discovery, GarageInvite)
- src/data — modelos, mock.ts (dados mockados) e repo.ts (repositório local que retorna os mocks)
- src/styles — tokens.css e global.css (design tokens e regras globais)

Observação: a estrutura de código não foi alterada nesta etapa de documentação.

---

## Stack

As tecnologias utilizadas:

| Tecnologia | Finalidade |
|:----------:|-----------|
| React | Construção da interface |
| TypeScript | Tipagem |
| Vite | Desenvolvimento / build |
| React Router | Navegação |
| Framer Motion | Animações |
| CSS (tokens) | Design system |
| localStorage | Persistência local (Garagem) |

---

## Rotas

Rotas principais implementadas:

- / — Home (Landing Page)
- /discovery — Discovery
- /cars — Index de carros
- /cars/:slug — Car Detail
- /stories — Histórias
- /stories/:slug — Story Detail
- /brands — Marcas
- /brands/:slug — Brand Detail
- /collections — Coleções
- /collections/:slug — Collection Detail
- /collections/create — Criar coleção (simulado)
- /garage — Garagem pessoal
- /search — Busca

> Observação: as rotas listadas refletem as páginas existentes em src/pages.

---

## Como executar

Instalação e execução local:

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Limitações (reiteradas)

- Projeto 100% client-side — sem backend, API ou banco de dados;
- Dados mockados em src/data/mock.ts — servem como fonte de verdade para a demo;
- Persistência limitada: somente a Garagem usa localStorage para salvar slugs;
- Não há autenticação nem painel administrativo;
- Testes automatizados não incluídos nesta entrega.

---

## Estado final

POLISHED STATIC PRODUCT PROTOTYPE — uma vitrine navegável do conceito editorial automotivo, adequada para apresentação acadêmica.

---

## Confirmações de entrega

1. O arquivo README.md foi revisado e atualizado conforme o enunciado da atividade.
2. Resumo objetivo das melhorias: reorganização do documento, detalhes ampliados sobre Ideia Inicial, Pesquisa/Referências (conceito Black Editorial), Ferramentas, Uso de IA (documentação detalhada e factual), Evolução da solução e Resultado Final; preservação das seções técnicas (Stack, Rotas, Execução).
3. Requisitos não documentados por falta de evidência: nenhuma funcionalidade obrigatória descrita no enunciado deixou de ser documentada; onde havia incerteza (ex.: consumo/contagem de tokens ou custos exatos da IA) preferimos omitir números e descrever o uso qualitativamente.
4. Nenhum arquivo além do README.md foi alterado nesta etapa.

---

Se desejar, posso gerar uma versão resumida (para apresentação) ou adaptar o README para incluir prints de tela (necessita que você disponibilize as imagens a serem referenciadas).  
