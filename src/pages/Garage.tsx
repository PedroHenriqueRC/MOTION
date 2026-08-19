import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getCars, getCollections } from "../data/repo";
import type { Car, Collection } from "../data/models";
import Loading from "../components/ui/Loading";
import ErrorState from "../components/ui/ErrorState";

const KEY_CARS = "motion:garage:cars";
const KEY_COLLECTIONS = "motion:garage:collections";

function safeReadKey(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean).map(String) : [];
  } catch (err) {
    return [];
  }
}

function safeWriteKey(key: string, values: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch (err) {
    // ignore storage errors
  }
}

export default function Garage() {
  // hooks at top
  const reduce = useReducedMotion();
  const [cars, setCars] = React.useState<Car[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const [savedCarSlugs, setSavedCarSlugs] = React.useState<string[]>(() =>
    safeReadKey(KEY_CARS),
  );
  const [savedCollectionSlugs, setSavedCollectionSlugs] = React.useState<
    string[]
  >(() => safeReadKey(KEY_COLLECTIONS));

  const mountedRef = React.useRef(true);

  // load datasets in parallel
  async function loadAll() {
    if (!mountedRef.current) return;
    setLoading(true);
    setError(false);
    try {
      const [carsRes, collectionsRes] = await Promise.all([
        getCars(),
        getCollections(),
      ]);
      if (!mountedRef.current) return;
      setCars(carsRes);
      setCollections(collectionsRes);
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
    loadAll();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // localStorage helpers that also update state
  function addSlug(
    key: string,
    slug: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    try {
      const current = safeReadKey(key);
      if (current.includes(slug)) return;
      const next = [...current, slug];
      safeWriteKey(key, next);
      setter(next);
    } catch (err) {
      // ignore
    }
  }

  function removeSlug(
    key: string,
    slug: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) {
    try {
      const current = safeReadKey(key);
      const next = current.filter((s) => s !== slug);
      safeWriteKey(key, next);
      setter(next);
    } catch (err) {
      // ignore
    }
  }

  // derived lists
  const savedCars = React.useMemo(
    () => cars.filter((c) => savedCarSlugs.includes(c.slug)),
    [cars, savedCarSlugs],
  );
  const availableCars = React.useMemo(
    () => cars.filter((c) => !savedCarSlugs.includes(c.slug)),
    [cars, savedCarSlugs],
  );

  const savedCollections = React.useMemo(
    () => collections.filter((c) => savedCollectionSlugs.includes(c.slug)),
    [collections, savedCollectionSlugs],
  );
  const availableCollections = React.useMemo(
    () => collections.filter((c) => !savedCollectionSlugs.includes(c.slug)),
    [collections, savedCollectionSlugs],
  );

  // editorial metrics derived safely
  const brandsRepresented = React.useMemo(() => {
    const s = new Set(savedCars.map((c) => c.brand));
    return s.size;
  }, [savedCars]);

  const savedCarsCount = savedCars.length;
  const savedCollectionsCount = savedCollections.length;

  const estimatedValue = React.useMemo(() => {
    const vals = savedCars.map((c) => c.valueUsd || 0).filter((v) => v > 0);
    if (vals.length === 0) return 0;
    const sum = vals.reduce((a, b) => a + b, 0);
    return sum;
  }, [savedCars]);

  const averageValue = React.useMemo(() => {
    const vals = savedCars.map((c) => c.valueUsd || 0).filter((v) => v > 0);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [savedCars]);

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorState
        onRetry={() => {
          loadAll();
        }}
      />
    );

  return (
    <main className="container section-space-large" aria-label="Garagem">
      <header className="garage-hero">
        <div className="garage-eyebrow">GARAGEM PESSOAL</div>
        <h1 className="display-xl">GARAGEM</h1>
        <p className="muted garage-hero-description">
          Sua coleção de carros, salva para depois.
        </p>
        <div className="garage-stats">
          <div className="badge">{savedCarsCount} CARROS</div>
          <div className="badge">{savedCollectionsCount} COLEÇÕES</div>
        </div>
      </header>

      {/* My Machines */}
      <section
        className="garage-section"
        style={{ marginTop: 28 }}
        aria-label="My machines"
      >
        <div className="garage-section-header">
          <div>
            <h2 className="display">MEUS CARROS</h2>
            <div className="garage-section-description muted">
              Os carros que você salvou na sua garagem pessoal.
            </div>
          </div>
          <div>
            <Link
              to="/cars"
              className="meta motion-link"
              style={{ color: "var(--color-shine)" }}
            >
              EXPLORAR CARROS →
            </Link>
          </div>
        </div>

        {savedCarsCount === 0 ? (
          <div className="garage-empty" style={{ marginTop: 20 }}>
            <h3 className="display-massive">SUA GARAGEM ESTÁ PRONTA.</h3>
            <p className="muted" style={{ marginTop: 12 }}>
              Seu próximo carro pertence aqui.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link to="/cars" className="garage-cta">
                EXPLORAR CARROS →
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 16, display: "grid", gap: 20 }}>
            {/* featured car */}
            {savedCars[0] && (
              <div className="garage-machine-feature card">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 420px",
                    gap: 20,
                  }}
                >
                  <div className="card-body--lg">
                    <div className="card-meta">DESTAQUE</div>
                    <h3
                      className="card-title"
                      style={{ fontSize: "2rem", color: "black" }}
                    >
                      {savedCars[0].brand} — {savedCars[0].name}
                    </h3>
                    <div className="muted" style={{ marginTop: 8 }}>
                      {savedCars[0].year}
                    </div>
                    {savedCars[0].description ? (
                      <div
                        className="card-description muted"
                        style={{ marginTop: 12 }}
                      >
                        {savedCars[0].description}
                      </div>
                    ) : null}
                    <div style={{ marginTop: 14, display: "flex", gap: 12 }}>
                      <button
                        className="ui-retry-btn"
                        onClick={() =>
                          removeSlug(
                            KEY_CARS,
                            savedCars[0].slug,
                            setSavedCarSlugs,
                          )
                        }
                        style={{ color: "black" }}
                      >
                        REMOVER
                      </button>
                      <Link
                        to={`/cars/${savedCars[0].slug}`}
                        className="garage-cta"
                        style={{ color: "var(--color-shine)" }}
                      >
                        VER CARRO →
                      </Link>
                    </div>
                  </div>
                  <div className="card-media" style={{ height: 320 }}>
                    {savedCars[0].image ? (
                      <img src={savedCars[0].image} alt={savedCars[0].name} />
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {/* remaining machines grid */}
            {savedCars.length > 1 && (
              <div
                className="garage-machines"
                style={{
                  color: "white",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 20,
                }}
              >
                {savedCars.slice(1).map((c) => (
                  <motion.article
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.28 }}
                  >
                    <div className="card">
                      <div className="card-media" style={{ height: 160 }}>
                        {c.image ? <img src={c.image} alt={c.name} /> : null}
                      </div>
                      <div className="card-body--lg">
                        <div className="muted card-meta">{c.brand}</div>
                        <div className="card-title">{c.name}</div>
                        <div className="muted" style={{ marginTop: 8 }}>
                          {c.year}
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <button
                            className="ui-retry-btn"
                            onClick={() =>
                              removeSlug(KEY_CARS, c.slug, setSavedCarSlugs)
                            }
                          >
                            REMOVER
                          </button>
                          <Link
                            to={`/cars/${c.slug}`}
                            className="meta motion-link"
                            style={{ color: "var(--color-shine)" }}
                          >
                            VER →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Add machine panel */}
      <section style={{ marginTop: 32 }} aria-label="Add machine">
        <div className="garage-section-header">
          <div>
            <h3 className="meta" style={{color: 'white'}}>ADD MACHINE</h3>
            <div className="garage-section-description muted">
              Find machines available to add to your garage.
            </div>
          </div>
        </div>
        {availableCars.length === 0 ? (
          <div style={{ marginTop: 12 }} className="muted">
            No machines available to add.
          </div>
        ) : (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {availableCars.map((c) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
              >
                <div className="card card-body" >
                  <div className="card-media" style={{ height: 140 }}>
                    {c.image ? <img src={c.image} alt={c.name} /> : null}
                  </div>
                  <div className="card-body--lg">
                    <div className="muted card-meta">{c.brand}</div>
                    <div style={{ color: "black" }} className="card-title">
                      {c.name}
                    </div>
                    <div style={{ marginTop: 8, alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                      <button
                        className="ui-retry-btn"
                        onClick={() =>
                          addSlug(KEY_CARS, c.slug, setSavedCarSlugs)
                        }
                        style={{color:'black', padding: '6px 8px',fontSize: 11, borderRadius: '4px', border: '1px solid black'}}
                      >
                        ADICIONAR À GARAGEM
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Curated Collections */}
      <section style={{ marginTop: 40 }} aria-label="Curated collections">
        <div className="garage-section-header">
          <div>
            <h2 className="display">COLEÇÕES CURADAS</h2>
            <div className="garage-section-description muted">
              Coleções que você salvou para referência rápida.
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            <Link
              to="/collections"
              className="meta motion-link"
              style={{ color: "var(--color-shine)" }}
            >
              EXPLORAR COLEÇÕES →
            </Link>
          </div>
        </div>

        {savedCollections.length === 0 ? (
          <div className="garage-empty" style={{ marginTop: 16 }}>
            <h3 className="display">CONSTRUA SEU ARQUIVO.</h3>
            <p className="muted" style={{ marginTop: 8 }}>
              Comece a colecionar as histórias, carros e nomes que definem o
              MOTION.
            </p>
            <div style={{ marginTop: 12 }}>
              <Link to="/collections" className="garage-cta">
                EXPLORAR COLEÇÕES →
              </Link>
            </div>
          </div>
        ) : (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {savedCollections.map((c) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
              >
                <div className="card card-body">
                  <Link
                    to={`/collections/${c.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ color: "black" }} className="card-title">
                      {c.title}
                    </div>
                    {c.description ? (
                      <div className="muted" style={{ marginTop: 6 }}>
                        {c.description}
                      </div>
                    ) : null}
                  </Link>
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      gap: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="ui-retry-btn"
                      onClick={() =>
                        removeSlug(
                          KEY_COLLECTIONS,
                          c.slug,
                          setSavedCollectionSlugs,
                        )
                      }
                      style={{ color: "black" }}
                    >
                      REMOVER
                    </button>
                    <Link
                      to={`/collections/${c.slug}`}
                      className="meta motion-link"
                      style={{ color: "black" }}
                    >
                      VER COLEÇÃO
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Garage Insight */}
      <section style={{ marginTop: 28 }} aria-label="Garage insight">
        <div
          className="garage-insight"
          style={{ display: "flex", gap: 18, marginTop: 12, flexWrap: "wrap" }}
        >
          <div className="garage-insight-item card card-body">
            <div className="meta">CARROS SALVOS</div>
            <div className="display-massive" style={{ color: "#ffffff5e" }}>
              {savedCarsCount}
            </div>
          </div>
          <div className="garage-insight-item card card-body">
            <div className="meta">MARCAS REPRESENTADAS</div>
            <div className="display-massive" style={{ color: "#ffffff5e" }}>
              {brandsRepresented}
            </div>
          </div>
          <div className="garage-insight-item card card-body">
            <div className="meta">COLEÇÕES</div>
            <div className="display-massive" style={{ color: "#ffffff5e" }}>
              {savedCollectionsCount}
            </div>
          </div>
          {estimatedValue > 0 && (
            <div className="garage-insight-item card card-body">
              <div className="meta">ESTIMATED VALUE</div>
              <div className="display-massive" style={{ color: "#ffffff5e" }}>
                US$ {estimatedValue.toLocaleString("en-US")}
              </div>
              {averageValue > 0 && (
                <div className="muted" style={{ marginTop: 6 }}>
                  MÉDIA: US$ {averageValue.toLocaleString("en-US")}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Editorial break */}
      <section
        style={{ marginTop: 28, textAlign: "center" }}
        className="garage-editorial-break"
      >
        <h3 className="display">
          OS CARROS QUE VOCÊ SALVA DIZEM ALGO SOBRE VOCÊ.
        </h3>
      </section>

      {/* Final CTA */}
      <section style={{ marginTop: 20, textAlign: "center", marginBottom: 80 }}>
        <h3 className="display">CONTINUE EXPLORANDO</h3>
        <p className="muted" style={{ marginTop: 8 }}>
          O arquivo é maior do que a sua garagem.
        </p>
        <div style={{ marginTop: 12 }}>
          <Link to="/cars" className="garage-cta">
            EXPLORAR CARROS →
          </Link>
        </div>
      </section>

      {/* Add collection */}
      <section
        style={{ marginTop: 32, marginBottom: 48 }}
        aria-label="Add collection"
      >
        <h3 className="meta">ADICIONAR COLEÇÃO</h3>
        {availableCollections.length === 0 ? (
          <div style={{ marginTop: 12 }} className="muted">
            Nenhuma coleção disponível para adicionar.
          </div>
        ) : (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {availableCollections.map((c) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.28 }}
              >
                <div className="card card-body">
                  <div className="card-title">{c.title}</div>
                  {c.description ? (
                    <div className="muted" style={{ marginTop: 6 }}>
                      {c.description}
                    </div>
                  ) : null}
                  <div style={{ marginTop: 8 }}>
                    <button
                      className="garage-cta"
                      onClick={() =>
                        addSlug(
                          KEY_COLLECTIONS,
                          c.slug,
                          setSavedCollectionSlugs,
                        )
                      }
                    >
                      ADICIONAR À GARAGEM
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
