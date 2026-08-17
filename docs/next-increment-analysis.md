1) Estado atual do projeto
- App React com react-router; layout e navegação prontos (MainLayout, Navigation, Footer).
- Página Home implementada com carregamento inicial e mecanismo de Retry aprovado.
- Data layer simples: src/data/repo.ts expõe getCars/getStories/getCollections/getFeaturedCar/getFeaturedStory e todos retornam dados de src/data/mock.ts (mocks síncronos).
- Páginas além da Home são placeholders (src/pages/Placeholder.tsx) e rotas já declaradas em App.tsx para discovery, cars, stories, brands, collections, garage, etc.
- UI de seções principais da Home já implementada: Hero, FeaturedCar, Discovery, FeaturedStory, GarageInvite.
- Não existe estado global (Redux/Context) — todo estado é local aos componentes/páginas.
- Build de produção passa (npm run build concluído).

2) Funcionalidades já implementadas
- Home com carregamento das 5 chamadas (com Retry).
- Componentes visuais e interações básicas (navegação, animações, previews).
- Rotas para index e placeholders para páginas de dados (cars, stories, brands, collections, etc).
- Tipos/modelos em src/data/models.ts e dados mock em src/data/mock.ts.

3) Funcionalidades aparentemente planejadas mas ainda não implementadas
- Páginas concretas de listagem e detalhe (cars list, car detail, stories list, story detail, collections index/detail, brands).
- Persistência/integração com APIs reais (atualmente mocks).
- CRUD ou criação de coleções (rota collections/create aponta para placeholder).
- Funcionalidades de “garagem” do usuário (rota /garage está placeholder).
- Possíveis otimizações de data layer (retry por-endpoint, abort, partial loads) — essas foram deliberadamente postergadas.

4) Dependências entre funcionalidades
- Home usa getCars/getStories/getCollections/getFeaturedCar/getFeaturedStory do repo; portanto qualquer página que consuma repo depende do contrato atual do repo (mocks -> Promise<...>).
- FeaturedCar e FeaturedStory vinculam para rotas de detalhe (/cars/:slug e /stories/:slug) — implementar list/detail melhora navegação end-to-end.
- Navegação (Navigation) e MainLayout são dependências transversais; qualquer nova página deve usar Outlet/layout.
- Sem estado global, páginas independem pouco entre si; integração entre páginas passa por rotas e chamadas ao repo.

5) Próximo incremento recomendado
- Implementar a página de listagem de carros (/cars): uma página chamada src/pages/Cars.tsx que usa getCars() para renderizar uma lista simples de cards (imagem, brand, name, link para /cars/:slug).
- Racional: é o menor incremento com valor visível, usa funções de repo já existentes, desbloqueia navegação a partir do FeaturedCar, e não toca no mecanismo de Retry da Home.

6) Por que esse incremento deve vir agora
- Baixo risco: usa a API mock já existente; não exige mudanças na infra, roteamento ou no Retry aprovado.
- Alto valor UX: conecta o FeaturedCar à rota real; permite validar navegação e listagem com os dados atuais.
- Isolamento: pode ser implementado localmente numa nova página sem modificar código existente (apenas adicionar arquivos e atualizar rota se necessário — rota já existe em App.tsx para /cars).
- Facilita incrementos seguintes (detalhe de carro, filtros, integração real de backend) com dependência natural.

7) O menor escopo possível desse incremento
- Criar src/pages/Cars.tsx:
  - Importar React e getCars() do repo.
  - No mount, chamar getCars() (mesma abordagem async + mountedRef guard).
  - Exibir Loading enquanto carrega (reusar componente Loading).
  - Em sucesso: renderizar grid/lista com cards linkando para `/cars/${slug}`.
  - Em erro: renderizar ErrorState com onRetry que re-executa o load (padronizado).
- Não implementar a página de detalhe (mantenha /cars/:slug como placeholder).
- Não adicionar estado global, caching, aborts, debounce, backoff, retries automáticos ou refatorações.

8) Quais arquivos provavelmente serão afetados
- Adicionar: src/pages/Cars.tsx (novo arquivo).
- Possivelmente adicionar um pequeno componente interno (ex.: src/components/cards/CarCard.tsx) — opcional; pode ser implementado inline em src/pages/Cars.tsx para manter escopo pequeno.
- Nenhuma alteração necessária em App.tsx (rota /cars já definida).
- Nenhuma modificação em Home, repo, mocks, Retry ou layout.

9) O que explicitamente NÃO deve ser alterado nesse incremento
- Não tocar em src/pages/Home.tsx (mecanismo de Retry aprovado).
- Não alterar src/data/repo.ts nem src/data/mock.ts (contrato e mocks permanecem).
- Não alterar o roteamento existente ou MainLayout/Navigation/Footer.
- Não implementar: retry por-endpoint, AbortController, debounce, backoff, retry automático, tratamento parcial das cinco operações, alteração do Promise.all, ou refatorações amplas.
- Não alterar design/CSS existente.

10) Como validar o incremento depois da implementação
- Build: rodar `npm run build` e confirmar sucesso.
- Manual tests:
  1. Navegue para /cars (via URL ou pelo menu).
  2. Verifique que aparece Loading enquanto loadHomeData equivalente de Cars está rodando.
  3. Após carregamento, verifique que a lista de carros é exibida com imagem, brand e nome.
  4. Clique em um item para garantir que o link aponta para /cars/:slug (a rota de detalhe pode permanecer placeholder).
  5. Simule erro (se possível): forçar getCars() a rejeitar e confirmar que ErrorState aparece e botão "TENTAR NOVAMENTE" reexecuta a chamada e mostra Loading.
  6. Navegue entre Home e /cars para garantir que não há warnings de setState em componentes desmontados.
  7. Testar cliques rápidos no botão Retry (no ErrorState) e verificar que UI não trava (reexecuções concorrentes são aceitáveis nesta etapa, pois não vamos tratar esse comportamento agora).
- Smoke test: percorrer a Home e outras rotas placeholder para garantir que as alterações não introduziram regressões visuais ou de roteamento.

Observações finais / alternativas
- Alternativa mínima igualmente segura: implementar a página de Listagem de Stories (/stories) em lugar de Cars. Motivo de escolher Cars: FeaturedCar já existe e oferece fluxo de navegação natural; os mocks têm três carros com imagens, oferecendo melhor visual de validação.
- Depois dessa iteração pequena, próximos incrementos recomendados (futuro): implementar page de detalhe, adicionar cancelamento/abort, tornar repo uma camada assíncrona real (fetch), ou introduzir cache/estado global conforme necessidade.

Se concordar, providencio um plano de implementação passo-a-passo com as mudanças de arquivo exatas e testes manuais/automáticos que devem ser adicionados (sem aplicar código até sua autorização).
