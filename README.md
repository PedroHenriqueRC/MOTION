# MOTION

## Integrantes

- Pedro Henrique

---

## Sobre o produto

MOTION é um protótipo web editorial automotivo com identidade "Black Editorial": fundo escuro, tipografia forte, imagens de grande presença e composição cinematográfica. O produto agrega um arquivo de carros, conteúdo editorial (histórias), fabricantes e coleções curadas, com uma experiência pensada para entusiastas automotivos e públicos que valorizam descoberta visual e narrativa.

Público-alvo: entusiastas automotivos, colecionadores, estudantes de design e UX, e qualquer pessoa interessada em uma experiência editorial premium sobre carros.

Proposta: apresentar o universo automotivo de forma editorial, permitindo descobrir, explorar e salvar veículos e coleções em uma garagem pessoal (persistência local). O objetivo do protótipo é demonstrar um produto visual e navegável, não um serviço com backend real.

Diferencial: foco editorial (não um catálogo técnico simples), curadoria visual, narrativa e componentes que combinam experiência cinematográfica com tipografia editorial. Todo o conteúdo é mockado e a interface é otimizada para apresentação acadêmica.

---

## Jornada de construção

### Ideia inicial

A ideia do MOTION nasceu da intersecção entre paixão por automóveis e a necessidade acadêmica de construir um projeto frontend que abrangesse produto, UX e design. O tema automotivo foi escolhido por seu potencial visual e cultural, permitindo trabalhar com imagens impactantes, história, engenharia e narrativas editoriais.

O MOTION evoluiu de um catálogo simples para uma plataforma editorial ao incorporar:

- Conteúdo editorial (Stories) para contextualizar máquinas;
- Curadorias (Collections) para agrupar por ideia/tema;
- Garagem pessoal para salvar e organizar favoritos;
- Discovery como local de prova do conteúdo editorial.

Ao longo do desenvolvimento priorizamos a preservação das páginas robustas (Cars, Stories, Brands, CarDetail, BrandDetail) e transformamos a Home em uma Landing Page que apresenta o produto e direciona o usuário às demos do sistema.

### Pesquisa e referências

As referências visuais e conceituais que nortearam o projeto incluem:

- Design editorial contemporâneo (tipografia, hierarquia, margens generosas);
- Cultura automotiva e conteúdo de revistas especializadas;
- Padrões visuais de sites premium e experiências cinematográficas;
- Awwwards como referência de linguagem visual e polimento estético.

As referências foram usadas como inspiração — o layout não foi copiado de nenhum site. As decisões visuais buscaram gerar uma estética "Black Editorial" adaptada ao conteúdo automotivo.

### Ferramentas utilizadas

- React
- TypeScript
- Vite
- React Router
- Framer Motion
- Lucide React / SVG (dependendo do estado final do build, ícones simples em SVG podem ser usados)
- VS Code
- OpenCode (agente de auxílio)
- Ferramentas de edição/geração de imagem (quando aplicável)
- Git / GitHub
- npm

### Uso de IA

O desenvolvimento foi assistido pelo OpenCode atuando como agente de desenvolvimento. O processo ocorreu em ciclos curtos de trabalho conduzidos pelo seguinte padrão:

Prompt → Implementação → Build → Auditoria → Correção

Como foi utilizado o OpenCode:

- Prompts foram usados para auditoria do código, sugestões de conteúdo e geração de trechos de README e relatórios;
- A IA sugeriu mudanças e implementou patches quando apropriado, sempre com validação do desenvolvedor;
- Decisões de produto, textos finais e escolhas visuais foram aprovadas e controladas pelo desenvolvedor (não automatizadas);
- Algumas sugestões da IA foram rejeitadas quando colidiam com requisitos da atividade ou com o princípio de preservação do código existente.

Consumo aproximado (valores simulados e aproximados):

- Tokens: ~1.000.000 (aproximado)
- Custo aproximado: ~US$ 3,21 (~R$ 16,78)

Esses valores são estimativas aproximadas e servem apenas para documentação do uso de IA no projeto.

### Evolução da solução

Resumo cronológico e decisões:

1. Fundação com React + Vite + TypeScript; configuração inicial do projeto.
2. Implementação das páginas principais: Home, Cars e CarDetail.
3. Stories: área editorial com artigos e spreads.
4. Brands: arquivo de fabricantes e navegação por marcas.
5. Collections: curadorias e índice de coleções.
6. Discovery: agregador que mostra recortes do produto (cars, stories, brands, collections).
7. Search: busca full-text client-side por carros, histórias, marcas e coleções.
8. Garage: persistência local (localStorage) para salvar carros e coleções.
9. Design System: tokens, classes de card, grids e tipografia editorial.
10. Correção de contraste: tokens semânticos e ajustes contextuais para legibilidade.
11. Refinamento editorial: microinterações com Framer Motion e polimento de imagens.
12. Expansão do mock: dados ampliados em src/data/mock.ts para demonstrar o arquivo.
13. BrandDetail e CarDetail: relação Car → Brand preservada e exploração relacionada de máquinas.
14. Adequação final: Home transformada em Landing Page de produto com hero, benefícios, como funciona, prova visual, prova social, oferta e FAQ.
15. QA final: build, correções de import e pequenas correções de layout/responsividade.

Decisões importantes tomadas durante a evolução:

- Em uma versão intermediária a Home ficou poluída e foi simplificada para recuperar foco editorial;
- O Hero passou a usar a imagem por trás do texto com camadas e opacidade para composição cinematográfica;
- Cards receberam primitives (card, card-media, card-body, card-title) para consistência;
- Contraste foi tratado com tokens semânticos (--color-surface-text etc.) para melhorar legibilidade em superfícies claras e escuras;
- BrandDetail explora carros relacionados filtrando car.brand === brand.name (sem inventar relações);
- Não foi criada relação fictícia Collection → Cars porque o mock não define essa associação explicitamente;
- A interface foi padronizada para PT-BR (exceto termos técnicos automotivos e nomes próprios).

### Resultado final

- A Home funciona como Product Landing Page com hero, benefícios, seção "Como funciona", prova visual do produto, prova social fictícia, oferta simulada e FAQ.
- O restante do site preserva a função de demonstração do produto (Cars, CarDetail, Stories, Brands, Collections, Discovery, Search, Garage).
- O projeto é 100% client-side; dados mockados (src/data/mock.ts) servem como fonte de verdade para a demo.
- CTAs no site são funcionais e apontam para rotas existentes (ex.: /discovery, /cars, /garage).
- Estado do projeto: POLISHED STATIC PRODUCT PROTOTYPE.

---

## Requisitos da Atividade 01 (Checklist)

- [x] Identidade visual
- [x] Nome e proposta
- [x] Hero
- [x] Benefícios e diferenciais
- [x] Imagens/representações
- [x] Como funciona
- [x] Prova social fictícia
- [x] Oferta/preço (simulado)
- [x] FAQ
- [x] CTA funcional
- [x] React
- [x] Client-side
- [x] Dados mockados

---

## Arquitetura

Estrutura principal do frontend (preservada):

- src/pages — páginas e rotas (Home, Cars, CarDetail, Stories, StoryDetail, Brands, BrandDetail, Collections, CollectionDetail, Discovery, Search, Garage)
- src/components — componentes reutilizáveis (Navigation, Footer, UI primitives e estados: Loading, ErrorState, EmptyState)
- src/sections — seções editoriais da Home e de páginas (Hero, FeaturedCar, FeaturedStory, Discovery, GarageInvite)
- src/data — modelos, mock.ts (fonte de dados mockados) e repo.ts (repositório local que retorna os mocks)
- src/styles — tokens.css e global.css (design tokens e regras globais)

Observação: A estrutura foi mantida sem alterações no código durante esta fase de documentação.

---

## Stack

As tecnologias utilizadas estão listadas abaixo (mantidas do README anterior):

| Tecnologia | Finalidade |
|:----------:|-----------|
| React | Construção da interface |
| TypeScript | Tipagem e segurança |
| Vite | Desenvolvimento e build |
| React Router | Navegação |
| Framer Motion | Animações |
| Lucide React / Inline SVG | Ícones |
| CSS (tokens) | Design system |
| localStorage | Persistência local (Garage) |

---

## Rotas

Rotas principais implementadas (preservadas):

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

---

## Como executar

Instalação e execução local (mantidas):

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Estado final

POLISHED STATIC PRODUCT PROTOTYPE

O produto é um protótipo navegável, sem backend, com dados mockados e foco na apresentação editorial.

---

## Limitações

- Não há backend;
- Não há banco de dados;
- Não há API externa;
- Não há autenticação;
- Persistência local limitada: somente Garage usa localStorage para salvar slugs;
- Todos os dados são mockados em src/data/mock.ts;
- Solução construída como protótipo acadêmico com objetivo de demonstrar UX, UI e navegação.

---

## Regra final

Somente o arquivo README.md foi atualizado conforme solicitado. Nenhum arquivo de código, mock, rota, CSS, componente ou lógica foi alterado para esta etapa.

---

### Entregáveis e confirmações

1. README.md atualizado.
2. Estrutura final descrita acima.
3. Confirmação: nenhum arquivo de código foi alterado nesta etapa (somente README.md).
4. Build não precisa ser executado porque apenas a documentação foi alterada.

STOP
