import React from "react";
import { useParams, Link } from "react-router-dom";
import { getBrandBySlug, getCars } from "../data/repo";
import type { Brand, Car } from "../data/models";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";
import { motion, useReducedMotion } from "framer-motion";

export default function BrandDetail() {
  const { slug } = useParams();
  const [brand, setBrand] = React.useState<Brand | undefined>(undefined);
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const mountedRef = React.useRef(true);
  const reduce = useReducedMotion();

  // derive cars for this brand using the explicit relation car.brand === brand.name
  // guard against brand being undefined during initial render to avoid runtime errors
  const brandCars = React.useMemo(() => {
    if (!brand) return [];
    return cars.filter((c) => c.brand === brand.name);
  }, [cars, brand]);

  // featured and archiveRange must be computed before any early returns so hooks order remains stable
  const featured = brandCars[0];

  const archiveRange = React.useMemo(() => {
    if (!brandCars || brandCars.length === 0) return undefined;
    const years = brandCars
      .map((c) => c.year)
      .filter(Boolean)
      .sort((a, b) => Number(a) - Number(b));
    return { min: years[0], max: years[years.length - 1] };
  }, [brandCars]);

  async function load() {
    if (!mountedRef.current) return;
    setLoading(true);
    setError(false);
    try {
      // load brand and cars in parallel
      if (!slug) {
        if (!mountedRef.current) return;
        setBrand(undefined);
        setCars([]);
      } else {
        const [bRes, carsRes] = await Promise.all([
          getBrandBySlug(slug),
          getCars(),
        ]);
        if (!mountedRef.current) return;
        setBrand(bRes);
        setCars(carsRes);
      }
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
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [slug]);

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorState
        onRetry={() => {
          load();
        }}
      />
    );
  if (!brand) return <EmptyState message="Marca não encontrada." />;

  return (
    <main className="container section-space-large" aria-label={brand.name}>
      <div className="brand-back">
        <Link to="/brands" className="meta motion-link">
          ← VOLTAR PARA MARCAS
        </Link>
      </div>

      {/* Hero / Brand identity */}
      <header className="brand-detail-hero">
        <div className="micro muted">ARQUIVO AUTOMOTIVO</div>
        <h1 className="display-xl">{brand.name}</h1>
        {brand.description ? (
          <p className="muted" style={{ marginTop: 8 }}>
            {brand.description}
          </p>
        ) : null}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div className="meta">{brandCars.length} CARROS</div>
        </div>
        {brandCars.length > 0 && (
          <div
            style={{ marginTop: 18 }}
            className="brand-hero-media card card-media"
          >
            {/* show image of first car as cinematic crop */}
            {brandCars[0].image ? (
              <img src={brandCars[0].image} alt={`${brand.name} hero`} />
            ) : null}
          </div>
        )}
      </header>

      {/* Brand overview */}
      <section className="brand-detail-overview" style={{ marginTop: 28 }}>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="micro muted">O ARQUIVO</div>
            <h3 className="display">VISÃO GERAL DA MARCA</h3>
          </div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div className="meta">MACHINES</div>
              <div
                className="card-title"
                style={{ fontSize: "2rem", color: "black" }}
              >
                {brandCars.length}
              </div>
            </div>
          </div>
        </div>
        {archiveRange && (
          <div style={{ marginTop: 12 }} className="muted">
            ARCHIVE RANGE — {archiveRange.min} — {archiveRange.max}
          </div>
        )}
      </section>

      {/* Featured machine */}
      {featured && (
        <section
          className="brand-detail-feature"
          style={{ marginTop: 28 }}
          aria-label="Featured machine"
        >
          <div className="card">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 420px",
                gap: 20,
              }}
            >
              <div className="card-body--lg">
                <div className="card-meta">CARRO EM DESTAQUE</div>
                <h2 style={{ color: "black" }} className="card-title">
                  {featured.name}
                </h2>
                <div className="muted" style={{ marginTop: 6 }}>
                  {featured.brand} — {featured.year}
                </div>
                {featured.description ? (
                  <div
                    className="muted card-description"
                    style={{ marginTop: 12 }}
                  >
                    {featured.description}
                  </div>
                ) : null}
                <div style={{ marginTop: 14 }}>
                  <Link
                    to={`/cars/${featured.slug}`}
                    className="garage-cta motion-link "
                    style={{ color: "black" }}
                  >
                    VER CARRO →
                  </Link>
                </div>
              </div>
              <div className="card-media" style={{ height: 320 }}>
                {featured.image ? (
                  <img src={featured.image} alt={featured.name} />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Machines from the archive */}
      <section
        className="brand-machines"
        style={{ marginTop: 32 }}
        aria-label="Machines from the archive"
      >
        <h3 className="display">CARROS DO ARQUIVO</h3>
        {brandCars.length === 0 ? (
          <div style={{ marginTop: 12 }} className="muted">
            NÃO HÁ CARROS NO ARQUIVO ATUAL.
          </div>
        ) : (
          <div style={{ marginTop: 18 }}>
            <div className="cards-grid">
              {brandCars.map((car) => (
                <Link
                  key={car.id}
                  to={`/cars/${car.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    className="card"
                    aria-label={`${car.brand} ${car.name}`}
                  >
                    <div className="card-media">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.name}`}
                        loading="lazy"
                      />
                    </div>
                    <div className="card-body">
                      <div className="muted card-meta">{car.brand}</div>
                      <div style={{ color: "black" }} className="card-title">
                        {car.name}
                      </div>
                      {car.description ? (
                        <div className="muted card-description">
                          {car.description}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Brand index - typographic list */}
      {brandCars.length > 1 && (
        <section style={{ marginTop: 28 }} aria-label="Brand index">
          <h3 className="display">ÍNDICE DO ARQUIVO</h3>
          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            {brandCars.map((c, i) => (
              <Link
                key={`idx-${c.id}`}
                to={`/cars/${c.slug}`}
                className="motion-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="brand-machine-index"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")} — {c.name}
                  </div>
                  <div className="muted">{c.year}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Editorial break */}
      <section
        style={{ marginTop: 32, textAlign: "center" }}
        className="brand-editorial-break"
      >
        <h3 className="display">OS CARROS POR TRÁS DO NOME.</h3>
      </section>

      {/* Related navigation */}
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <Link to="/cars" className="garage-cta"> EXPLORAR TODOS OS CARROS → </Link>
        <div style={{ marginTop: 10 }}>
        <Link to="/brands" className="meta motion-link" style={{ color: "var(--color-shine)" }}> EXPLORAR TODAS AS MARCAS → </Link>
        </div>
      </section>
    </main>
  );
}
