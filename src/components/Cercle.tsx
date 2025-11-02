"use client";
import { motion } from "framer-motion";
import CTAEmail from "./CTAEmail";

export default function Cercle() {
  return (
    <section id="cercle" className="relative py-24 md:py-40 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="type-display text-3xl md:text-5xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Le Cercle de La Déguste
        </motion.h2>
        <motion.p
          className="type-sans text-lg md:text-xl mb-10 opacity-80"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Recevez chaque mois nos trouvailles, nos tables, nos artisans. Genève n’a jamais eu meilleur goût.
        </motion.p>
        <CTAEmail />
      </div>
    </section>
  );
}

