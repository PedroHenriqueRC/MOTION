# MOTION  

> **Automotive culture, curated in motion.**  
> Uma plataforma editorial automotiva premium com foco em descoberta, curadoria e experiência digital.

---

## Descrição do Projeto

**MOTION** é um protótipo web editorial desenvolvido como projeto acadêmico, dedicado ao universo automotivo. O projeto transcende o conceito tradicional de catálogo de carros, funcionando como uma sinergia entre:

- **Arquivo automotivo** — Base de dados curada de veículos
- **Revista digital** — Conteúdo editorial editorial automotivo
- **Catálogo** — Exploração detalhada de fabricantes e modelos
- **Curadoria** — Coleções temáticas e descoberta guiada
- **Garagem pessoal** — Espaço de salvamento e organização

A experiência visual segue a identidade **Black Editorial** — tipografia forte, imagens de grande presença, espaço negativo, composição cinematográfica e microinterações.

---

## Áreas e Funcionalidades

| Página | Descrição |
|--------|-----------|
| **Home** | Porta de entrada com apresentação visual do produto |
| **Cars** | Índice automotivo completo com descoberta de veículos |
| **Car Detail** | Página editorial com especificações técnicas e valor do veículo |
| **Brands** | Arquivo de fabricantes com histórias e modelos |
| **Brand Detail** | Detalhamento de marca e veículos associados |
| **Stories** | Conteúdo editorial sobre cultura automotiva |
| **Story Detail** | Leitura individual de artigos e histórias |
| **Collections** | Curadorias temáticas e seleções especiais |
| **Collection Detail** | Detalhamento de coleções e seus veículos |
| **Discovery** | Agregação inteligente de conteúdos |
| **Search** | Busca full-text em toda a plataforma |
| **Garage** | Garagem pessoal com salvamento local de itens |

---

## 2. Concepção e Alinhamento

### 2.1 Origem da ideia
A ideia do MOTION surgiu da combinação entre o interesse pelo universo automotivo e a necessidade de desenvolver um projeto acadêmico que permitisse explorar não apenas programação, mas também **produto digital, UX/UI, arquitetura frontend e design**.

O tema automotivo foi escolhido por possuir grande potencial visual e editorial, permitindo trabalhar com imagens, performance, engenharia, história, cultura e design.

### 2.2 Conceito do produto
A experiência do MOTION foi estruturada em quatro ações principais:
- **Discover** — descobrir carros e conteúdos;
- **Explore** — navegar entre fabricantes, histórias e coleções;
- **Learn** — conhecer detalhes técnicos e conteúdo automotivo;
- **Collect** — salvar carros e coleções em uma garagem pessoal.

---

## 3. Alinhamento Estratégico

O projeto foi orientado por três objetivos principais:
1. **Experiência:** Criar uma experiência diferente de um catálogo convencional.
2. **Apresentação:** Construir um protótipo visualmente forte e adequado para apresentação acadêmica.
3. **Evolução:** Estruturar o frontend de maneira que os dados mockados possam futuramente ser substituídos por uma API ou backend real.

---

## 4. Estudo de Viabilidade

### 4.1 Viabilidade Técnica
A solução foi considerada tecnicamente viável utilizando uma arquitetura frontend moderna baseada em: React, TypeScript, Vite, React Router, Framer Motion, Lucide React e repositório local com dados mockados.

### 4.2 Viabilidade Financeira
Adotou-se uma estratégia de baixo custo, sem necessidade de servidores backend, infraestrutura cloud ou APIs pagas, permitindo concentrar recursos em experiência e interface.

---

## 5. Termo de Abertura do Projeto
- **Nome:** MOTION — Automotive Editorial Platform
- **Objetivo:** Construir um protótipo web editorial automotivo.
- **Escopo:** Frontend, navegação, conteúdo mockado e experiência visual.
- **Restrições:** Projeto estático, foco acadêmico e recursos limitados.

---

## 6. Stakeholders
- **Desenvolvedor / Autor:** Responsável pela concepção, arquitetura e desenvolvimento.
- **Orientação acadêmica:** Avaliação de aderência e metodologia.
- **Usuário final hipotético:** Entusiastas automotivos e colecionistas.

---

## 7. Escopo e Requisitos

### 7.1 Requisitos de Negócio
Permitir a descoberta de carros, exploração de fabricantes/histórias, pesquisa de conteúdo e organização de uma garagem pessoal.

### 7.2 Requisitos Funcionais
O projeto contempla as páginas e funcionalidades: Home, Cars, Car Detail, Stories, Brands, Collections, Discovery, Search e Garage (salvar/remover itens, métricas).

---

## 8. Requisitos Não Funcionais
- **Responsividade:** Desktop, tablet e mobile.
- **Acessibilidade:** ARIA labels, estados de foco e contraste.
- **Performance:** Vite, lazy loading e animações controladas.
- **Manutenibilidade:** Design tokens e componentes reutilizáveis.

---

## 9. Estrutura Analítica do Projeto (EAP)

MOTION
│
├── 1. Concepção (Ideia, Objetivos, Stakeholders, Viabilidade)
├── 2. Planejamento (Escopo, Requisitos, Arquitetura, Stack)
├── 3. Fundação Técnica (Vite, React, TypeScript, Router, Tokens)
├── 4. Modelagem de Conteúdo (Cars, Brands, Stories, Collections)
├── 5. Desenvolvimento (Home, Pages, Discovery, Search, Garage)
├── 6. Design (Black Editorial, Cards, Grids, Typography)
├── 7. Qualidade (Contraste, Acessibilidade, Build)
└── 8. Finalização (QA, Polimento)

## 10. Arquitetura da Solução
A aplicação foi estruturada como um frontend React componentizado:

pages/ → páginas e rotas;

components/ → elementos reutilizáveis;

sections/ → blocos editoriais;

layouts/ → estrutura de layout;

data/ → models, mock e repository;

styles/ → tokens, tema e regras globais.

## 11. Stack Tecnológica

| Tecnologia | Finalidade |
|:-----------:|-----------|
| **React** | Construção da interface |
| **TypeScript** | Tipagem e segurança |
| **Vite** | Desenvolvimento e build |
| **React Router** | Navegação |
| **Framer Motion** | Animações |
| **Lucide React** | Ícones |
| **CSS** | Design system e layout |
| **localStorage** | Persistência local da Garage |

## 12. Desenvolvimento Assistido por IA
O desenvolvimento utilizou a metodologia de Vibe Coding orientada por prompts via OpenCode, atuando como acelerador para implementação, refatoração e auditoria, mantendo o controle total das decisões de produto.

## 13. Consumo de IA e Custos
Consumo estimado: ~1.000.000 de tokens.

Custo aproximado: ~**US$ 3,21** (~**R\$ 16,78** após a conversão).

## 14. Design e Identidade Visual: Black Editorial
Características: fundo escuro, tipografia forte, imagens grandes, espaço negativo, composição assimétrica, estética automotiva premium e microinterações.

## 15. Contraste e Acessibilidade
Identificação e correção de problemas de legibilidade em superfícies claras via tokens contextuais e auditoria de estados de contraste, botões e campos de input.

## 16. Evolução das Funcionalidades
**Home**: Refinada para um layout cinematográfico.

**Cars**: Evoluiu de listagem simples para um "Automotive Index" com 57 veículos.

**Garage**: Evoluiu de uma lista simples para uma garagem pessoal completa com persistência local.

**Search**: Busca em memória agrupada por tipo de conteúdo.

## 17. Status do Projeto
[x] Home, Cars, Detail Pages, Stories, Brands, Collections, Discovery, Search, Garage

[x] Design System, Responsividade, Contraste

[x] Persistência Local (Garage)

[x] Conteúdo Mockado Expandido

[ ] Backend, API, Autenticação (Fora do escopo)

## 18. Como Executar
npm install (Instalar dependências)

npm run dev (Ambiente de desenvolvimento)

npm run build (Build de produção)

## 19. Resumo Executivo

|  Indicador     |  Resultado                          |
|:--------------:|:------------------------------------|
|    Projeto     |  MOTION                             |
|     Tipo       |  Protótipo Web Editorial Automotivo |
|    Estado      |  Polished Static Prototype          |
|    Framework   |  React + TypeScript                 |
|     Build      |  Vite                               |
|  Persistência  |  localStorage                       |
|     Foco       |  Design + UX + Conteúdo + Frontend  |
