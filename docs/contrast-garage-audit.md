# MOTION — Home Upgrade: Implementação do Landing Editorial

Resumo do incremento implementado (visual, sem alterar lógica):

1) Arquivos modificados
- src/pages/Home.tsx
- src/styles/global.css

2) Mudanças visuais realizadas (resumo)
- Home transformada em landing editorial:
  - Mantido o Hero existente (composição editorial já presente).
  - Seção Featured: utiliza o componente FeaturedCar quando existe um carro em destaque.
  - Seção "Explore" / Trending: apresenta 4–6 carros do mock com imagens maiores, marca, nome e descrição curta, usando `cards-grid` e `.card`/`.card-media`.
  - Seção Stories: layout editorial com FeaturedStory e stories secundárias em listagem editorial (imagem, categoria, título, excerpt).
  - Seção Brands: grid editorial de marcas/coleções (utiliza `cards-grid`), reforçando profundidade de conteúdo.
  - Seção Collections: curadorias editoriais apresentadas com `cards-grid-wide`.
  - Final CTA editorial: seção de encerramento com mensagem de impacto e CTA "ENTER MOTION →".
  - GarageInvite mantido ao final.

3) Lógica alterada?
- Nenhuma lógica alterada. Todas as chamadas a getCars(), getStories(), getCollections(), getFeaturedCar() e getFeaturedStory() permanecem inalteradas. Os estados e useEffect existentes foram mantidos. Não houve alteração em repository, mocks ou localStorage durante este incremento.

4) Mocks alterados?
- Nenhum arquivo em src/data/mock.ts foi modificado neste incremento. (Houve ampliações em passos anteriores; não alterei mocks agora.)

5) Observações de implementação
- Reaproveitei classes e tokens já existentes para garantir contraste e coerência visual (.card, .card-media, .card-body, .card-title, .card-meta, .card-description, --color-surface-text, --color-surface-text-muted).
- Utilize Framer Motion para reveals e transições discretas em seções (reveal, hover, pequenas animações de entrada).
- Mantive a responsividade via grids existentes; ajustes finos em mobile podem ser necessários após revisão visual.

6) Resultado do build
- Comando: `npm run build`
- Resultado: sucesso
  - vite v5.4.21
  - ✓ 1611 modules transformed.
  - ✓ built in 4.39s

7) Limitações / pontos a revisar visualmente
- Recomendo design QA em dispositivos mobile/tablet para ajustar espaçamentos finos do hero e imagens nas seções.
- A seção Brands atualmente usa textos; caso queira visualizar logos, os mocks podem ser ampliados com assets de logo.
- Algumas escolhas tipográficas foram mantidas inline por decisão editorial; uma unificação futura é opcional.

8) Próximo incremento seguro sugerido
- Realizar um design QA focado em mobile para ajustar espaçamentos e crops em Hero/Featured/Trending. Seguro e puramente visual.

Fim do relatório.
