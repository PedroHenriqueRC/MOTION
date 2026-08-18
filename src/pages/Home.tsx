import React from "react";
import Hero from "../sections/Hero";
import FeaturedCar from "../sections/FeaturedCar";
import Discovery from "../sections/Discovery";
import FeaturedStory from "../sections/FeaturedStory";
import GarageInvite from "../sections/GarageInvite";
import {
  getCars,
  getStories,
  getCollections,
  getFeaturedCar,
  getFeaturedStory,
  getBrands,
} from "../data/repo";
import { DiscoverItem } from "../types";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";
import type { Car, Story, Collection } from "../data/models";

export default function Home() {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [stories, setStories] = React.useState<Story[]>([]);
  const [brands, setBrands] = React.useState<string[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [featured, setFeatured] = React.useState<Car | undefined>(undefined);
  const [featuredStory, setFeaturedStory] = React.useState<Story | undefined>(
    undefined,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const mountedRef = React.useRef(true);

  async function loadHomeData() {
    if (!mountedRef.current) return;
    setLoading(true);
    setError(false);
    try {
      const [
        carsRes,
        storiesRes,
        collectionsRes,
        featuredRes,
        featuredStoryRes,
        brandsRes,
      ] = await Promise.all([
        getCars(),
        getStories(),
        getCollections(),
        getFeaturedCar(),
        getFeaturedStory(),
        getBrands(),
      ]);
      if (!mountedRef.current) return;
      setCars(carsRes);
      setStories(storiesRes);
      setCollections(collectionsRes);
      setFeatured(featuredRes);
      setFeaturedStory(featuredStoryRes);
      setBrands(brandsRes.map((b) => b.name));
    } catch (err) {
      if (!mountedRef.current) return;
      setError(true);
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  }

  React.useEffect(() => {
    mountedRef.current = true;
    loadHomeData();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // restore: simplified home layout similar to prior design, keeping improved hero composition
  const discoveryItems: DiscoverItem[] = [
    { to: "/cars", label: "CARROS", image: cars[0]?.image },
    { to: "/stories", label: "HISTÓRIAS", image: stories[0]?.image },
    { to: "/brands", label: "MARCAS", image: cars[1]?.image },
    {
      to: "/collections",
      label: "COLEÇÕES",
      image: collections[0] ? cars[2]?.image : undefined,
    },
  ];

  // editorial derivations (deterministic)
  const editorPicks = React.useMemo(() => {
    // pick top valued cars as editorial picks (deterministic, data-driven)
    return [...cars]
      .filter((c) => typeof c.valueUsd === "number")
      .sort((a, b) => b.valueUsd! - a.valueUsd!)
      .slice(0, 3);
  }, [cars]);

  const brandCounts = React.useMemo(() => {
    const m: Record<string, number> = {};
    cars.forEach((c) => {
      m[c.brand] = (m[c.brand] || 0) + 1;
    });
    return m;
  }, [cars]);

  const brandInFocus = React.useMemo(() => {
    const entries = Object.entries(brandCounts);
    if (entries.length === 0) return undefined;
    entries.sort((a, b) => b[1] - a[1]);
    const name = entries[0][0];
    // try to find brand slug via collections or brands list using repo brands loaded in state
    return { name, count: entries[0][1] };
  }, [brandCounts]);

  const archiveSummary = {
    totalCars: cars.length,
    totalBrands: Object.keys(brandCounts).length,
    totalStories: stories.length,
    totalCollections: collections.length,
  };

  const nextDiscovery = React.useMemo(() => {
    // deterministic trio: featured or first available items
    return {
      car: featured ?? cars[0],
      story: featuredStory ?? stories[0],
      brand: featured ? featured.brand : cars[0]?.brand,
    };
  }, [featured, featuredStory, cars, stories]);

  const eras = React.useMemo(() => {
    const m: Record<string, number> = {};
    cars.forEach((c) => {
      if (!c.year) return;
      const d = Math.floor(Number(c.year) / 10) * 10;
      const label = `${d}s`;
      m[label] = (m[label] || 0) + 1;
    });
    return Object.entries(m).sort(
      (a, b) => Number(a[0].slice(0, 4)) - Number(b[0].slice(0, 4)),
    );
  }, [cars]);

  const topBrands = React.useMemo(() => {
    return Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [brandCounts]);

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorState
        onRetry={() => {
          loadHomeData();
        }}
      />
    );

  return (
    <div>
      <Hero />

      {/* Landing: introduction + editorial proof */}
      <section className="container section-space-large">
        {/* Short product intro editorial */}
        <header style={{ marginBottom: 18 }}>
          <div className="micro muted">APRESENTANDO</div>
          <h2 className="display">O UNIVERSO AUTOMOTIVO EM MOVIMENTO.</h2>
          <p className="muted hero-description" style={{ marginTop: 8 }}>
            Explore carros, histórias, marcas e coleções em uma experiência
            editorial criada para quem vive o universo automotivo.
          </p>
          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <a
              href="/discovery"
              className="garage-cta"
              style={{ color: "black" }}
              aria-label="Explorar MOTION"
            >
              EXPLORAR MOTION →
            </a>
            <a
              href="/cars"
              className="ui-retry-btn"
              style={{ borderColor: "var(--color-border-light)" }}
              aria-label="Explorar carros"
            >
              EXPLORAR CARROS →
            </a>
          </div>
        </header>

        {/* Benefits */}
        <section style={{ marginTop: 28 }} aria-label="Por que o MOTION">
          <h3 className="display">POR QUE MOTION?</h3>
          <div style={{ marginTop: 12 }} className="home-benefits">
            <div className="home-benefit-item">
              <div className="number">01</div>
              <div className="title">DESCUBRA</div>
              <div className="muted" style={{ marginTop: 8 }}>
                Encontre carros, marcas, histórias e coleções com curadoria
                editorial.
              </div>
            </div>
            <div className="home-benefit-item">
              <div className="number">02</div>
              <div className="title">EXPLORE</div>
              <div className="muted" style={{ marginTop: 8 }}>
                Aprofunde-se em cada máquina além da ficha técnica, com textos e
                imagens cinematográficas.
              </div>
            </div>
            <div className="home-benefit-item">
              <div className="number">03</div>
              <div className="title">COLECIONE</div>
              <div className="muted" style={{ marginTop: 8 }}>
                Salve carros e coleções na sua garagem pessoal para recuperar
                seu arquivo privado.
              </div>
            </div>
          </div>
        </section>

        {/* Featured car preserved as product proof */}
        <div style={{ marginTop: 50 }} className="home-featured">
          {featured ? <FeaturedCar car={featured} /> : null}
        </div>

        {/* Editor's Picks: editorial selection of high-value machines */}
        {editorPicks && editorPicks.length > 0 && (
          <section style={{ marginTop: 28 }} aria-label="Escolha do editor">
            <h3 className="display">ESCOLHA DO EDITOR</h3>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "1fr 320px",
                gap: 18,
                alignItems: "start",
              }}
            >
              <div>
                <article
                  className="card card-body--lg editorial-pick"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    padding: "14px",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="carde"
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                      DESTAQUE
                    </div>
                    <div
                      style={{ marginTop: 8, color: "var(--color-bg-primary)" }}
                      className="card-title"
                    >
                      {editorPicks[0].brand} — {editorPicks[0].name}
                    </div>
                    <div className="muted" style={{ marginTop: 6 }}>
                      {editorPicks[0].year}
                    </div>
                    {editorPicks[0].valueUsd ? (
                      <div className="muted" style={{ marginTop: 8 }}>
                        US$ {editorPicks[0].valueUsd.toLocaleString("en-US")}
                      </div>
                    ) : null}
                    <div style={{ marginTop: 12 }}>
                      <a
                        href={`/cars/${editorPicks[0].slug}`}
                        className="meta motion-link"
                        style={{
                          color: "var(--color-bg-primary)",
                          fontWeight: "700",
                        }}
                      >
                        VER CARRO →
                      </a>
                    </div>
                  </div>
                  <div
                    style={{ marginTop: 12, width: "50%", height: 200 }}
                    className="card-media"
                  >
                    <img
                      src={editorPicks[0].image}
                      alt={`${editorPicks[0].brand} ${editorPicks[0].name}`}
                    />
                  </div>
                </article>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {editorPicks.slice(1).map((p) => (
                  <article
                    key={p.id}
                    className="card"
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      padding: 12,
                    }}
                  >
                    <div
                      style={{ width: 120, height: 80, overflow: "hidden" }}
                      className="card-media"
                    >
                      <img src={p.image} alt={`${p.brand} ${p.name}`} />
                    </div>
                    <div>
                      <div className="card-title" style={{ color: "black" }}>
                        {p.name}
                      </div>
                      <div className="muted" style={{ marginTop: 6 }}>
                        {p.brand} — {p.year}
                      </div>
                      {p.valueUsd ? (
                        <div className="muted" style={{ marginTop: 6 }}>
                          US$ {p.valueUsd.toLocaleString("en-US")}
                        </div>
                      ) : null}
                      <div style={{ marginTop: 8 }}>
                        <a
                          href={`/cars/${p.slug}`}
                          className="meta motion-link"
                          style={{
                            color: "var(--color-bg-primary)",
                            fontWeight: "700",
                          }}
                        >
                          VER →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Brand In Focus */}
        {brandInFocus && (
          <section style={{ marginTop: 28 }} aria-label="Marca em foco">
            <h3 className="display">EM ALTA</h3>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="meta">MARCA</div>
                <div
                  className="card-title"
                  style={{ color: "var(--color-shine)", marginTop: 6 }}
                >
                  {brandInFocus.name}
                </div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {brandInFocus.count} CARROS NO ARQUIVO
                </div>
              </div>
              <div>
                {/* try to find brand slug from brands state (loaded earlier) */}
                <a
                  href="/brands"
                  className="garage-cta"
                  style={{ color: "black" }}
                >
                  EXPLORAR MARCA →
                </a>
              </div>
            </div>
          </section>
        )}

        {/* From the Archive summary */}
        <section style={{ marginTop: 28 }} aria-label="From the archive">
          <div className="micro muted">DO ARQUIVO</div>
          <h3 className="display">RESUMO DO ARQUIVO</h3>
          <div style={{ marginTop: 8 }} className="archive-summary">
            <div className="muted">
              {archiveSummary.totalCars} CARROS / {archiveSummary.totalBrands}{" "}
              MARCAS / {archiveSummary.totalStories} HISTÓRIAS /{" "}
              {archiveSummary.totalCollections} COLEÇÕES
            </div>
          </div>
        </section>

        {/* Your Next Discovery */}
        {nextDiscovery && (
          <section style={{ marginTop: 28 }} aria-label="Your next discovery">
            <h3 className="display">SUA PRÓXIMA DESCOBERTA</h3>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              <div className="card card-body">
                <div className="meta">CARRO</div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>
                  {nextDiscovery.car?.brand} — {nextDiscovery.car?.name}
                </div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {nextDiscovery.car?.year}
                </div>
              </div>
              <div className="card card-body">
                <div className="meta">HISTÓRIA</div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>
                  {nextDiscovery.story?.title}
                </div>
                <div className="muted" style={{ marginTop: 6 }}>
                  {nextDiscovery.story?.category}
                </div>
              </div>
              <div className="card card-body">
                <div className="meta">MARCA</div>
                <div style={{ marginTop: 6, fontWeight: 700 }}>
                  {nextDiscovery.brand}
                </div>
                <div style={{ marginTop: 8 }}>
                  <a
                    href="/discovery"
                    className="meta motion-link"
                    style={{ color: "var(--color-shine" }}
                  >
                    EXPLORAR →
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Explore by Era / Explore by Brand small blocks */}
        <section
          style={{
            marginTop: 28,
            display: "flex",
            gap: 18,
            alignItems: "flex-start",
          }}
          aria-label="Explore by era and brand"
        >
          <div style={{ flex: 1 }}>
            <h4 className="display">EXPLORE POR DÉCADA</h4>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {eras.map(([era, count]) => (
                <div
                  key={era}
                  className="card card-body"
                  style={{ padding: 10 }}
                >
                  <div style={{ fontWeight: 800 }}>{era}</div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    {count} MACHINES
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 320 }}>
            <h4 className="display">EXPLORE POR MARCA</h4>
            <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
              {topBrands.slice(0, 6).map(([name, cnt]) => (
                <a
                  key={name}
                  href="/brands"
                  className="card card-body"
                  style={{
                    padding: 10,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: "var(--color-bg-primary)",
                    }}
                  >
                    {name}
                  </div>
                  <div className="muted" style={{ marginTop: 6 }}>
                    {cnt} CARROS
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="section-space section-discovery">
        <div className="container">
          <Discovery items={discoveryItems} />
        </div>
      </section>

      <section className="container section-space-large">
        {featuredStory ? <FeaturedStory story={featuredStory} /> : null}
      </section>

      {/* Testimonials, Offer, FAQ, Garage invite */}
      <section className="container section-space">
        <div style={{ marginTop: 8 }}>
          <h3 className="display">O QUE A COMUNIDADE DIZ</h3>
          <div style={{ marginTop: 12 }} className="home-testimonials">
            {/* Fictional prototype testimonials (clearly demonstrative) */}
            <div className="home-testimonial">
              <div className="muted">
                “Mais do que um catálogo, o MOTION parece uma revista digital
                feita para quem realmente gosta de carros.”
              </div>
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                — Rafael, São Paulo
              </div>
            </div>
            <div className="home-testimonial">
              <div className="muted">
                “Finalmente encontrei uma forma visualmente interessante de
                organizar os carros que admiro.”
              </div>
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                — Lucas, Curitiba
              </div>
            </div>
            <div className="home-testimonial">
              <div className="muted">
                “A experiência transforma uma simples pesquisa por carros em
                descoberta.”
              </div>
              <div style={{ marginTop: 10, fontWeight: 700 }}>
                — Gabriel, Belo Horizonte
              </div>
            </div>
          </div>
        </div>

        {/* Offer / Pricing */}
        <div style={{ marginTop: 28 }} className="home-offer">
          <div>
            <div className="micro muted">ENTRE NO MOTION</div>
            <div style={{ marginTop: 6, fontWeight: 800, fontSize: "1.1rem" }}>
              MOTION — Acesso ao universo automotivo
            </div>
            <div className="muted" style={{ marginTop: 6 }}>
              GRATUITO — Explore o arquivo, descubra carros e construa sua
              garagem.
            </div>
          </div>
          <div>
            <a
              href="/discovery"
              className="garage-cta"
              style={{ color: "black" }}
            >
              COMEÇAR AGORA →
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 28 }} className="home-faq">
          <h3 className="display">PERGUNTAS FREQUENTES</h3>
          <div style={{ marginTop: 12 }}>
            <details>
              <summary>O que é o MOTION?</summary>
              <div className="muted" style={{ marginTop: 8 }}>
                Uma plataforma digital moderna dedicada à descoberta, estética e
                cultura automotiva, apresentada como protótipo editorial.
              </div>
            </details>
            <details>
              <summary>O MOTION é gratuito?</summary>
              <div className="muted" style={{ marginTop: 8 }}>
                Sim. Como um protótipo conceitual, toda a experiência de
                navegação e uso das ferramentas é totalmente gratuita, sem
                cobranças ou transações reais.
              </div>
            </details>
            <details>
              <summary>Posso salvar carros?</summary>
              <div className="muted" style={{ marginTop: 8 }}>
                Sim. O recurso de Garagem permite salvar e gerenciar seus
                veículos favoritos localmente no navegador (utilizando o
                armazenamento local).
              </div>
            </details>
            <details>
              <summary>Os dados são reais?</summary>
              <div className="muted" style={{ marginTop: 8 }}>
                Nesta fase de protótipo, o sistema utiliza dados estruturados
                simulados (src/data/mock.ts) para representar o conteúdo
                editorial e as fichas técnicas.
              </div>
            </details>
            <details>
              <summary>O MOTION funciona em celular?</summary>
              <div className="muted" style={{ marginTop: 8 }}>
                Sim. A interface foi desenvolvida com design totalmente
                responsivo, garantindo uma experiência fluida em computadores,
                tablets e dispositivos móveis.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="section-space section-garage">
        <div className="container">
          <GarageInvite />
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="container section-space-large"
        style={{ textAlign: "center" }}
      >
        <h2 className="display">SEU PRÓXIMO CARRO COMEÇA AQUI.</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          Explore o arquivo editorial do MOTION e encontre o carro que fala com
          você.
        </p>
        <div style={{ marginTop: 18 }}>
          <a
            href="/discovery"
            className="garage-cta"
            style={{ color: "black" }}
          >
            EXPLORAR MOTION →
          </a>
        </div>
      </section>
    </div>
  );
}
