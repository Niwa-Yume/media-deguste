"use client";
import { motion } from "framer-motion";

export default function Signature() {
  return (
    <footer className="relative py-24 px-6 bg-[var(--bg-cave)] text-[var(--ivory-aged)]">
      <div className="max-w-5xl mx-auto">
        <motion.blockquote
          className="type-display text-2xl md:text-4xl text-strong"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          « Une création genevoise. Un art de vivre. »
        </motion.blockquote>
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm opacity-75">
          <span className="text-strong">© {new Date().getFullYear()} La Déguste</span>
          <nav className="flex flex-wrap gap-4">
            <a href="#" className="hover:opacity-100 opacity-80 text-strong">Instagram</a>
            <a href="#" className="hover:opacity-100 opacity-80 text-strong">Newsletter</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
