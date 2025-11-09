"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroIntro() {
  const prefersReduced = useReducedMotion();
  return (
    <section
      className="relative min-h-[80svh] md:min-h-[90vh] flex items-start md:items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        aria-hidden
        style={{
          background:
            "radial-gradient(1100px 520px at 50% 60%, rgba(202,166,96,0.12), transparent 60%), radial-gradient(900px 500px at 60% 40%, rgba(184,115,51,0.08), transparent 60%)",
          mixBlendMode: "multiply",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, black 8%, black 92%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="relative z-10 text-center px-6 w-full pt-24 md:pt-0">
        <motion.p
          className="uppercase tracking-[0.3em] text-[11px] md:text-xs mb-5 md:mb-6 text-strong"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ textShadow: "0 1px 0 rgba(0,0,0,.04)" }}
        >
          Genève — Média gastronomique
        </motion.p>
        <motion.h1
          id="hero-title"
          className="type-display mx-auto leading-[1.05] max-w-4xl text-[clamp(2.25rem,6vw,4.75rem)] md:text-[clamp(3.25rem,5vw,6.25rem)] font-semibold text-strong"
          initial={{
            opacity: 0,
            y: 14,
            filter: prefersReduced ? "blur(0px)" : "blur(5px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          style={{ textShadow: "0 1px 0 rgba(0,0,0,.04)" }}
        >
          Le goût. L&apos;art. Le temps.
        </motion.h1>
        <motion.span
          className="type-display mx-auto leading-[1.05] max-w-3xl text-[clamp(1.25rem,4vw,2rem)] md:text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold text-strong block mt-2"
          initial={{
            opacity: 0,
            y: 10,
            filter: prefersReduced ? "blur(0px)" : "blur(4px)",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.35 }}
          style={{ textShadow: "0 1px 0 rgba(0,0,0,.04)" }}
        >
          Bienvenue à La Déguste.
        </motion.span>

        <motion.div
          className="mt-7 md:mt-9 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.45 }}
        >
          <a
            href="#cercle"
            className="glass soft-shadow rounded-full px-6 py-3 type-sans text-sm"
            aria-describedby="cta-desc"
          >
            Rejoindre la table
          </a>
        </motion.div>
        <p id="cta-desc" className="sr-only">
          Accéder au formulaire d’inscription à la newsletter.
        </p>
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest opacity-70 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          aria-hidden
        >
        </motion.div>
      </div>
    </section>
  );
}
