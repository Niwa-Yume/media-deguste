"use client";
import SplitText from "./SplitText";
import { motion } from "framer-motion";

export default function Manifeste() {
  return (
    <section className="relative py-24 md:py-40 px-6">
      {/* Texture sensorielle subtile inspirée du vin/jambon */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            "radial-gradient(1000px 500px at 30% 40%, rgba(138,30,30,0.08), transparent 60%), radial-gradient(900px 600px at 70% 65%, rgba(202,166,96,0.08), transparent 60%)",
          mixBlendMode: "multiply",
          maskImage: "linear-gradient(180deg, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      />
      <div className="relative max-w-4xl mx-auto">
        <motion.h2
          className="type-display text-3xl md:text-5xl mb-8 text-strong"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Manifeste
        </motion.h2>
        <SplitText
          as="p"
          className="type-sans text-xl md:text-2xl leading-relaxed text-strong"
          text={"Nous croyons que le goût est une mémoire."}
          delay={0.1}
        />
        <SplitText
          as="p"
          className="type-sans text-xl md:text-2xl leading-relaxed mt-2 text-strong"
          text={"Et qu’à Genève, il y a des artisans qui sculptent le temps."}
          delay={0.25}
        />
        {/* Bloc média: image de charcuterie artisanale */}
        <motion.div
          className="mt-10 rounded-2xl overflow-hidden soft-shadow"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative aspect-video">
            <img
              src="/chactuterie de luxe.webp"
              alt="Charcuterie artisanale – La Déguste"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dégradé de bas très léger pour renforcer le contraste du texte si on en ajoute plus tard */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
