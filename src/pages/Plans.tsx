import React from "react";
import { subscriptionPlans, getPlanByKey } from "../data/mock";

export default function Plans() {
  const plans = subscriptionPlans;

  const freePlan = plans.find((p) => p.key === "free");
  const monthly = plans.find((p) => p.key === "monthly");
  const annual = plans.find((p) => p.key === "annual");

  return (
    <div>
      {/* HERO */}
      <section
        className="container section-space-large"
        style={{ paddingTop: 28 }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          <header>
            <div className="micro muted">MOTION+</div>
            <h1 className="display">MOTION+</h1>
            <h2
              className="display"
              style={{ fontSize: "1.6rem", marginTop: 6 }}
            >
              O universo automotivo além do óbvio.
            </h2>
            <p className="muted" style={{ marginTop: 12, maxWidth: 820 }}>
              Uma experiência editorial premium para quem quer ir além das
              manchetes, descobrir histórias profundas e explorar o universo
              automotivo com mais contexto.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#plans-list"
                className="garage-cta"
                aria-label="Assinar MOTION+"
              >
                ASSINAR MOTION+
              </a>
              <a
                href="/"
                className="ui-retry-btn"
                style={{ borderColor: "var(--color-border-light)" }}
                aria-label="Explorar o MOTION"
              >
                EXPLORAR O MOTION
              </a>
            </div>
          </header>

          {/* Benefits compact */}
          <section aria-label="Benefícios MOTION+" style={{ marginTop: 18 }}>
            <h3 className="display">O que o MOTION+ oferece</h3>
            <div
              style={{
                marginTop: 12,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {[
                [
                  "Conteúdo exclusivo",
                  "Histórias e análises disponíveis para assinantes.",
                ],
                ["Arquivo completo", "Acesso ao acervo editorial do MOTION."],
                [
                  "Deep Dives",
                  "Conteúdos aprofundados sobre carros, design, engenharia e cultura automotiva.",
                ],
                [
                  "Garage ilimitada",
                  "Salve seus carros e coleções favoritas sem limitação.",
                ],
                [
                  "Conteúdo antecipado",
                  "Acesso a novas histórias antes da publicação aberta.",
                ],
                [
                  "Experiência sem publicidade",
                  "Uma leitura mais limpa e focada.",
                ],
              ].map(([title, desc]) => (
                <article
                  key={String(title)}
                  className="card"
                  style={{ padding: 14 }}
                >
                  <div style={{ fontWeight: 800 }}>{title}</div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    {desc}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* How it works */}
      <section className="container section-space" aria-label="Como funciona">
        <h3 className="display">Como funciona</h3>
        <div
          style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          {[
            [
              "01",
              "ESCOLHA SEU PLANO",
              "Escolha entre acesso gratuito ou MOTION+.",
            ],
            [
              "02",
              "CRIE SUA CONTA",
              "Cadastre-se para personalizar sua experiência.",
            ],
            [
              "03",
              "EXPLORE SEM LIMITES",
              "Acesse conteúdos e experiências exclusivas.",
            ],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              className="card"
              style={{ flex: "1 1 220px", padding: 16 }}
            >
              <div
                style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 20,
                    color: "var(--color-shine)",
                  }}
                >
                  {num}
                </div>
                <div>
                  <div style={{ fontWeight: 800 }}>{title}</div>
                  <div className="muted" style={{ marginTop: 8 }}>
                    {desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section
        id="plans-list"
        className="container section-space-large"
        aria-label="Planos"
      >
        <h3 className="display">Planos</h3>
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {plans.map((p) => (
            <article
              key={p.id}
              className={`card ${p.isPopular ? "card-highlight" : ""}`}
              style={{
                padding: 25,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
              aria-labelledby={`plan-${p.id}`}
            >
              {p.isPopular ? (
                <div
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 12,
                    background: "var(--color-shine)",
                    color: "white",
                    padding: "6px 8px",
                    fontWeight: 600,
                    borderRadius: 6,
                  }}
                >
                  MAIS POPULAR
                </div>
              ) : null}
              <div
                id={`plan-${p.id}`}
                style={{ fontWeight: 900, fontSize: 18 }}
              >
                {p.title}
              </div>
              <div style={{ marginTop: 8, fontWeight: 800, fontSize: 20 }}>
                {p.price}
              </div>
              {p.meta?.equivalentMonthly ? (
                <div className="muted" style={{ marginTop: 6 }}>
                  {p.meta.equivalentMonthly}
                </div>
              ) : null}
              <ul style={{ marginTop: 12, paddingLeft: 18 }}>
                {p.benefits.map((b) => (
                  <li key={b} className="muted" style={{ marginTop: 8 }}>
                    {b}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 14 }}>
                {p.key === "free" ? (
                  <a
                    href="/register?plan=free"
                    style={{ color: "var(--color-bg-primary)" }}
                    className="ui-retry-btn"
                    aria-label={`Explorar ${p.title}`}
                  >
                    EXPLORAR GRATUITAMENTE
                  </a>
                ) : p.key === "monthly" ? (
                  <a
                    href="/register?plan=monthly"
                    style={{ color: "var(--color-bg-primary)" }}
                    className="ui-retry-btn"
                    aria-label={`Assinar ${p.title}`}
                  >
                    ASSINAR MOTION+
                  </a>
                ) : (
                  <a
                    href="/register?plan=annual"
                    style={{ color: "var(--color-bg-primary)" }}
                    className="ui-retry-btn"
                    aria-label={`Assinar ${p.title}`}
                  >
                    ASSINAR ANUAL
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="container section-space" aria-label="Comparação">
        <h3 className="display">Comparação</h3>
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gap: 12,
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 800 }}>FREE</div>
            <div className="muted" style={{ marginTop: 8 }}>
              Acesso básico e conteúdo aberto.
            </div>
            <ul style={{ marginTop: 12, listStyle: "none", paddingLeft: 0 }}>
{/* remova a bolinha padrão da tag <li> */}
              <li>✓ Conteúdo aberto</li>
              <li>x Conteúdo exclusivo</li>
              <li>x Collections exclusivas</li>
              <li>x Garage ilimitada</li>
              <li>x Conteúdo antecipado</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 800 }}>MOTION+</div>
            <div className="muted" style={{ marginTop: 8 }}>
              Conteúdo premium e experiências exclusivas.
            </div>
            <ul style={{ marginTop: 12, listStyle: "none", paddingLeft: 0  }}>
              <li>✓ Conteúdo exclusivo</li>
              <li>✓ Arquivo completo</li>
              <li>✓ Deep Dives</li>
              <li>✓ Garage ilimitada</li>
              <li>✓ Experiência sem publicidade</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Proof of value */}
      <section className="container section-space" aria-label="Prova de valor">
        <h3 className="display">Por que o MOTION+ existe</h3>
        <p className="muted" style={{ marginTop: 12, maxWidth: 820 }}>
          O MOTION não quer apenas mostrar carros. Quer contar as histórias por
          trás deles. O MOTION+ transforma essa curadoria em uma experiência
          mais profunda para quem realmente quer explorar o universo automotivo.
        </p>
      </section>

      {/* FAQ */}
      <section className="container section-space" aria-label="FAQ">
        <h3 className="display">Perguntas Frequentes</h3>
        <div style={{ marginTop: 12 }}>
          <details>
            <summary>O que é o MOTION+?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              MOTION+ é a assinatura premium que oferece conteúdo editorial
              exclusivo, collections e uma experiência sem publicidade. É uma
              modelagem de produto dentro deste protótipo client-side.
            </div>
          </details>
          <details>
            <summary>O MOTION possui conteúdo gratuito?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              Sim. O plano FREE mantém acesso aberto a uma parte do conteúdo e
              Discovery.
            </div>
          </details>
          <details>
            <summary>Qual a diferença entre Free e MOTION+?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              Free oferece acesso básico; MOTION+ adiciona conteúdo premium,
              collections exclusivas, garage ilimitada e leitura antecipada.
            </div>
          </details>
          <details>
            <summary>O que está incluído na assinatura?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              Conteúdo exclusivo, arquivo completo, deep dives, collections
              exclusivas, garage ilimitada e uma experiência sem publicidade.
            </div>
          </details>
          <details>
            <summary>Posso cancelar minha assinatura?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              Em um produto real, sim. Neste protótipo, não há integração de
              pagamento — a gestão de assinaturas será modelada em incrementos
              futuros.
            </div>
          </details>
          <details>
            <summary>Existe cobrança real?</summary>
            <div className="muted" style={{ marginTop: 8 }}>
              <strong>
                O MOTION+ é uma assinatura simulada para fins de protótipo.
                Nenhuma cobrança real é realizada.
              </strong>
            </div>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="container section-space-large"
        style={{ textAlign: "center" }}
      >
        <h2 className="display">PRONTO PARA IR ALÉM?</h2>
        <p className="muted" style={{ marginTop: 8 }}>
          Descubra histórias, máquinas e ideias que vão além do óbvio.
        </p>
        <div style={{ marginTop: 18 }}>
          <a
            href="#plans-list"
            className="garage-cta"
            aria-label="Entrar para o MOTION+"
          >
            ENTRAR PARA O MOTION+
          </a>
        </div>
      </section>
    </div>
  );
}
