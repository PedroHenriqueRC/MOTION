import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

const seq = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="hero-root" aria-label="Main feature">
      <div className="hero-index micro">01 / INÍCIO</div>

      <motion.div
        className="hero-inner container"
        initial={shouldReduce ? "visible" : "hidden"}
        animate="visible"
        variants={seq}
      >
        <motion.div className="hero-copy" variants={item}>
          <div className="meta hero-pre" style={{ color: "var(--color-text-primary)" }}>CULTURA AUTOMOTIVA / 2026</div>

          <div className="display-massive">MOTION</div>

          <h2 className="display hero-headline">
            CULTURA
            <br />
            AUTOMOTIVA
            <br />
            EM MOVIMENTO.
          </h2>

          <p className="body hero-description">
            Um espaço editorial curado que explora carros e cultura através do
            movimento cinematográfico e da tipografia precisa.
          </p>

          <div className="hero-cta-wrap">
            <MotionLink style={{ fontWeight: "700", fontSize: 14, color: "var( --color-shine)" }}
              to="/discovery"
              className="meta motion-link"
              variants={item}
              whileHover={shouldReduce ? {} : { x: 8 }}
              aria-label="Descobrir"
            >
              DESCOBRIR →
            </MotionLink>
          </div>
        </motion.div>

        <motion.div className="hero-media" variants={item}>
          <motion.img
            src="/public/images/assets/capaMOTION.jpg"
            alt="Fotografia editorial de automóvel"
            className="hero-image"
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={
              shouldReduce ? { duration: 0 } : { duration: 12, ease: "linear" }
            }
          />
        </motion.div>

        <div className="hero-vertical-meta micro">ROLE PARA EXPLORAR</div>
      </motion.div>
    </section>
  );
}
