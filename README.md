# MOTION

## Integrantes

- Projeto desenvolvido como atividade acadêmica (Equipe / Autor: conforme repositório).

## Sobre o produto

MOTION é um protótipo editorial automotivo desenvolvido em React + TypeScript. O projeto simula uma revista digital com curadoria editorial, foco em imagens cinematográficas, textos aprofundados e uma experiência pensada para entusiastas de automóveis.

O produto explora a oportunidade de transformar catálogos técnicos em narrativas — apresentando veículos, histórias, marcas e coleções com contexto e estética editorial.

Público-alvo: entusiastas automotivos interessados em conteúdo editorial — desde curiosos até leitores que buscam análises técnicas e históricas.

Proposta de valor: uma experiência editorial premium que organiza conteúdo automotivo (fichas técnicas, histórias, coleções) e oferece uma camada hipotética de assinatura chamada MOTION+ com conteúdo e recursos exclusivos.

Diferenciais
- Linguagem editorial visual (Black Editorial): imagens grandes, tipografia de destaque, espaçamento generoso.
- Curadoria editorial: histórias, deep dives e seleções por coleções.
- Modelo de assinatura simulado (MOTION+): planos mock que liberam conteúdo premium.

Como o conteúdo é apresentado
- Home/Landing com destaques e curadorias.
- Páginas de Stories e StoryDetail com imagens, categorias e textos.
- Stories podem ser marcadas como premium (isPremium) e bloqueadas por um paywall client-side quando necessário.

Conceito MOTION+
- Assinatura fictícia que oferta conteúdo editorial exclusivo, Collections exclusivas, Garage ilimitada e experiência sem publicidade.
- Totalmente prototipada no cliente — sem backend, pagamentos ou cobrança real.

Como funciona a assinatura simulada
- Dados dos planos e do produto são mockados em `src/data/mock.ts` (subscriptionPlans).
- Usuários podem escolher um plano durante o cadastro via query param (`/register?plan=monthly|annual|free`).
- Sessão simulada e persistida em localStorage. A autorização para conteúdo premium é decidida client-side pela função `hasPremiumAccess()`.

## Jornada de construção

Esta seção documenta a evolução do projeto de forma cronológica e reflexiva — não é apenas um changelog técnico, mas um registro das decisões e do raciocínio por trás das mudanças.

### Ideia inicial

O MOTION nasceu como um catálogo de veículos com informações técnicas. Rapidamente surgiram duas percepções:

- havia oportunidade de dar contexto às fichas técnicas (história, design, cultura);
- o layout editorial e imagens poderiam transformar a experiência em algo mais aspiracional.

Assim, o projeto evoluiu do conceito "catálogo automotivo" para "experiência editorial" com curadoria e narrativas. A partir daí nasceu a ideia de oferecer uma camada adicional de produto (MOTION+) para simular um modelo de negócio editorial baseado em assinatura.

Motivos da escolha do tema automotivo
- Interesse por narrativa técnica e cultural que os automóveis carregam;
- disponibilidade de conteúdo fictício (mocks) suficiente para montar uma revista demonstrativa;
- possibilidade de aplicar uma estética editorial visualmente rica.

Como o conceito evoluiu
- Catálogo automotivo → experiência editorial (conteúdo, imagens, curadoria) → plataforma de descoberta (Discovery) → produto com conteúdo premium (MOTION+) → assinatura simulada client-side.

### Pesquisa e referências

As decisões visuais e de UX foram inspiradas por práticas observadas em publicações digitais editoriais de alta qualidade: uso de grandes imagens, tipografia potente, composições cinematográficas e hierarquia editorial marcada. Essas referências guiaram escolhas de layout, tamanhos de título, cartas editoriais e o tratamento visual do paywall.

Referências (disciplinares e conceituais)
- Sites e revistas digitais editoriais (concepto visual, tipografia e uso de imagens grandes) — influência sobre layout e identidade visual;
- Produtos digitais de mídia que usam paywall (inspiração no fluxo, não na implementação técnica) — ajudaram a definir mensagens e CTAs do paywall;
- Práticas de UX para assinaturas e onboarding — ajudaram a estruturar os fluxos de registro e planos.

Observação: as referências foram usadas como inspiração de design e experiência; não houve cópia de conteúdo ou layouts específicos.

### Ferramentas utilizadas

#### Desenvolvimento
- React
- TypeScript
- Vite
- React Router

#### Interface
- CSS (projeto contém tokens e estilos globais)
- Framer Motion (animações leves)

#### Desenvolvimento assistido
- OpenCode (agente/assistente AI) — assistente de desenvolvimento baseado em um modelo (gpt-5-mini) auxiliou na escrita de código, patches e no planejamento dos incrementos.

#### Versionamento
- Git (repositório local / remoto conforme infra do curso)

### Uso de IA

O desenvolvimento contou com a assistência de um agente de IA (OpenCode / gpt-5-mini) integrado ao fluxo de trabalho. A IA foi usada como ferramenta de produtividade para acelerar a implementação e gerar propostas de código, com revisão humana em todas as etapas.

Como a IA participou (processo)
- Tarefas realizadas com auxílio de IA: criação de tipos TypeScript, geração e modificação de arquivos, propostas de componentes React, correção de erros de build, implementação dos fluxos de autenticação simulada e do paywall, estruturação da página comercial e da central do assinante.
- Estrutura dos prompts: instruções claras por incremento (objetivo, restrições, arquivos a modificar), promoção de auditoria prévia do código e pedidos para mudanças incrementais e não intrusivas.
- Avaliação e revisão: todo código sugerido pela IA foi revisado manualmente, integrado utilizando operações git e testado com `npm run build`. Alterações sensíveis foram ajustadas por desenvolvedor humano para seguir a arquitetura e padrões do projeto.

Decisões sobre sugestões da IA
- Mantiveram-se as sugestões que respeitaram a arquitetura e padrões do projeto (por exemplo: criação de AuthProvider, paywall, tipos e páginas).
- Foram rejeitadas ou ajustadas sugestões que propunham mudanças globais, dependências novas ou refatorações desnecessárias.

### Evolução da solução (incrementos)

Esta seção enumera os incrementos realizados durante a disciplina.

#### Incremento 01 — Fundação do MOTION+
Objetivo: Modelar o produto MOTION+ e os dados necessários.
Principais decisões:
- Adicionar tipos (SubscriptionPlan, SubscriptionStatus), estender User com planId e subscriptionStatus.
- Marcar Stories com isPremium.
- Centralizar dados dos planos em `src/data/mock.ts`.
Resultado:
- Base de dados mock pronta para suportar planos Free, Mensal e Anual; build válido.

#### Incremento 02 — Página comercial MOTION+
Objetivo: Criar uma página de aquisição /plans que apresente MOTION+, proposta de valor e planos.
Principais decisões:
- Reutilizar dados de `subscriptionPlans` para popular a página;
- Manter identidade editorial (fundo escuro, tipografia grande, imagens);
- CTAs apontam para âncoras ou para /register?plan=...
Resultado:
- Página /plans totalmente funcional e integrada à navegação.

#### Incremento 03 — Cadastro, Login e Sessão
Objetivo: Implementar autenticação simulada (registro, login, sessão persistida).
Principais decisões:
- Usar AuthContext (AuthProvider + useAuth) com persistência em localStorage (`motion_user`) e armazenamento local de contas (`motion_users`) apenas para protótipo;
- Adicionar páginas /register e /login; criar conta demo (demo@motion.local / motion123) para demonstração;
- Não armazenar senhas em produção — apenas simulação com aviso no código.
Resultado:
- Fluxo de cadastro/login simulado funcionando e persistente entre recargas.

#### Incremento 04 — Paywall
Objetivo: Controlar acesso a Stories marcados como isPremium.
Principais decisões:
- Implementar função central `hasPremiumAccess(user)` (checa planId e subscriptionStatus);
- Substituir corpo de StoryDetail por Paywall quando necessário;
- Manter exposição de título, imagem e resumo para quem não tem acesso;
- Indicar visually os Stories premium na listagem.
Resultado:
- Paywall client-side coerente com identidade editorial; acesso controlado pela regra centralizada.

#### Incremento 05 — Central do Assinante
Objetivo: Transformar /account em Central do Usuário (MOTION+ Hub).
Principais decisões:
- Reutilizar mocks (subscriptionPlans, stories);
- Exibir plano atual, benefícios, vitrine de conteúdo premium e ações de conta;
- Implementar área de gerenciamento simulada sem alterações de dados reais.
Resultado:
- /account converteu-se em uma central editorial e de assinatura, integrando todos os sistemas existentes.

#### Incremento 06 — Auditoria e Refinamento Final
Objetivo: Consolidar documentação, ajustes finais e garantir build estável.
Principais decisões:
- Documentação (README) compilando toda a jornada;
- Ajustes menores de UI e build.
Resultado:
- Projeto entregue com build estável e documentação.

### Decisões e mudanças relevantes

- A escolha por autenticação simulada (localStorage) foi motivada pela natureza acadêmica do exercício e pela necessidade de avançar funcionalidades dependentes (paywall, account) sem infraestrutura de backend.
- Dados foram mantidos mockados e centralizados em `src/data/mock.ts` para evitar inconsistências.
- A lógica de autorização foi centralizada em `src/utils/subscription.ts` (hasPremiumAccess) para evitar dispersão e garantir consistência.
- A identidade editorial guiou todas as decisões de layout e copy (evitar estética genérica de SaaS).

### Resultado final

O protótipo MOTION oferece:
- Navegação editorial com Home, Stories, Cars, Brands, Collections, Discovery e Garage;
- Página comercial /plans com oferta fictícia MOTION+;
- Fluxo simulado de cadastro/login com sessão persistida;
- Paywall client-side controlando acesso a conteúdo premium;
- Central do Assinante com resumo de plano, benefícios e vitrine de conteúdo premium.

Pontos fortes
- Coerência editorial e identidade visual;
- Fluxos de produto bem delineados e integrados;
- Código organizado em camadas (data, pages, contexts, utils).

Pontos a melhorar / próximos passos
- Implementar backend real para autenticação e validação de acesso;
- Implementar fluxo de pagamentos e gerenciamento real de assinaturas;
- Melhorar o conteúdo editorial com textos completos em StoryDetail;
- Adicionar testes automáticos e cobertura.

## Requisitos da Atividade 01

| Requisito | Status | Onde está implementado |
|---|---:|---|
| Identidade visual (Black Editorial) | ✅ | estilos globais, componentes e páginas (src/styles, src/sections, src/pages) |
| Nome e proposta | ✅ | README + /plans (src/pages/Plans.tsx) |
| Hero | ✅ | /plans (Hero), Home (src/sections/Hero.tsx) |
| Benefícios e diferenciais | ✅ | /plans e /account (src/pages/Plans.tsx, src/pages/Account.tsx) |
| Imagens/representações | ✅ | src/images + uso em cards e Hero (src/pages, src/sections) |
| Como funciona | ✅ | /plans seção 'Como funciona' (src/pages/Plans.tsx) |
| Prova social fictícia | ✅ | Home (seção testimonials) (src/pages/Home.tsx) |
| Oferta/preço | ✅ | subscriptionPlans em src/data/mock.ts; exibido em /plans e /account |
| FAQ | ✅ | /plans FAQ (src/pages/Plans.tsx) |
| CTA funcional/simulado | ✅ | CTAs apontam para /register?plan=... e /login (src/pages/Plans.tsx) |
| React | ✅ | Código base (React + TS) |
| Client-side | ✅ | Toda a lógica é client-side (no repositório) |
| Dados mockados | ✅ | src/data/mock.ts |

## Arquitetura

Organização principal do código:

- src/pages — páginas de rota (Home, Stories, StoryDetail, Plans, Register, Login, Account, etc.)
- src/components — componentes reutilizáveis (navegação, UI, paywall)
- src/sections — seções compostas usadas em Home e Landing
- src/data — dados mock (mock.ts), modelos (models.ts) e repo para acessos
- src/contexts — AuthContext (sessão simulada)
- src/utils — utilitários como subscription rule
- src/styles — tokens e estilos globais

Cada camada tem responsabilidade clara: pages orquestram, components representam, sections compõem, data fornece conteúdo mock, contexts gerenciam estado cross-cutting.

## Stack

| Tecnologia | Finalidade |
|---|---|
| React | Biblioteca UI |
| TypeScript | Tipagem estática |
| Vite | Build / dev server |
| React Router | Navegação |
| Framer Motion | Animações leves |
| CSS (tokens) | Estilos e identidade visual |
| localStorage | Persistência de sessão simulada |

## Rotas

Rotas principais implementadas:
- / — Home
- /plans — Página comercial MOTION+
- /stories — Lista de histórias
- /stories/:slug — Detalhe da história (aplica Paywall quando necessário)
- /cars — Lista de carros
- /cars/:slug — Detalhe do carro
- /brands — Lista de marcas
- /collections — Coleções
- /collections/:slug — Detalhe da coleção
- /garage — Garagem
- /discovery — Discovery
- /search — Pesquisa
- /register — Cadastro (aceita ?plan=free|monthly|annual)
- /login — Login
- /account — Central do Usuário / MOTION+

As rotas estão declaradas em `src/App.tsx` utilizando `react-router` e são montadas dentro de `MainLayout`.

## Como executar

1. Instalar dependências:

```
npm install
```

2. Rodar em desenvolvimento:

```
npm run dev
```

3. Build de produção:

```
npm run build
```

4. Visualizar build:

```
npm run preview
```

## Estado final

Protótipo funcional com:
- Experiência editorial (Home, Stories, Carros, Brands, Collections)
- Produto de assinatura simulado (MOTION+) com planos mock (FREE, Mensal, Anual)
- Registro e login simulados com persistência via localStorage
- Paywall client-side que controla acesso a Stories premium
- Central do Assinante com visão do plano, benefícios, vitrine de conteúdo premium

## Limitações

- Sem backend ou API: toda a lógica é client-side e baseada em mocks.
- Autenticação simulada: as credenciais são armazenadas localmente para permitir login durante o protótipo.
- Pagamentos e checkout: não implementados; ações de gerenciamento são simuladas.
- Segurança: paywall e autenticação são apenas demonstrações e não oferecem proteção real.
- Escopo reduzido: funcionalidades como comentários, notificações, analytics e gerenciamento real de assinaturas não existem.

## Requisitos da Atividade 01

Conforme tabela acima (ver seção "Requisitos da Atividade 01"), os requisitos solicitados pelo enunciado foram atendidos com implementações localizadas nos arquivos mencionados.

## Auditoria da documentação

Este README foi redigido após inspeção do código fonte e dos arquivos do projeto. Todas as afirmações foram verificadas contra o código:

- Estruturas de dados: `src/data/models.ts` e `src/data/mock.ts`;
- Rotas: `src/App.tsx`;
- Autenticação e sessão: `src/contexts/AuthContext.tsx`;
- Lógica de paywall: `src/utils/subscription.ts` e `src/pages/StoryDetail.tsx`;
- Central do Assinante: `src/pages/Account.tsx`;
- Página comercial: `src/pages/Plans.tsx`.

Se algo no código for alterado após esta documentação, recomenda-se atualizar o README para manter a rastreabilidade da jornada.

---

Se precisarem, posso gerar um changelog com os commits correspondentes ou uma versão reduzida do README para apresentação.  
