"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CTAEmail() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (status === "ok" || status === "error") {
      const t = setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!email || !isValid) {
      setMessage("Entrez un email valide.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur inconnue");
      setStatus("ok");
      setMessage("Bienvenue au Cercle.");
      setEmail("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Impossible d’inscrire";
      // Messages courts pour éviter de casser la mise en page
      const short = /invalide/i.test(msg) ? "Email invalide." : "Réessayez dans un instant.";
      setStatus("error");
      setMessage(short);
    }
  }

  const msgId = "cta-email-message";
  const ringClass = status === "error" ? "ring-2 ring-red-500/70" : status === "ok" ? "ring-2 ring-emerald-500/70" : "";
  const btnClass = status === "ok" ? "bg-emerald-600 text-white" : status === "error" ? "bg-red-600 text-white" : "bg-[var(--copper)] text-[var(--on-accent)]";
  const btnLabel = status === "loading" ? "Inscription…" : status === "ok" ? "Inscrit(e) !" : status === "error" ? "Réessayer" : "Rejoindre le Cercle";

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.form
        onSubmit={onSubmit}
        className={`glass soft-shadow rounded-full h-12 md:h-14 px-2 pl-4 pr-2 flex items-center gap-2 ${ringClass}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        aria-label="Formulaire d’inscription au Cercle"
      >
        <label htmlFor="email" className="sr-only">Adresse email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 h-full bg-transparent outline-none placeholder:opacity-60 text-base md:text-[1.02rem] leading-none text-strong"
          placeholder="Votre email — une lettre par mois"
          aria-invalid={status === "error"}
          aria-describedby={message ? msgId : undefined}
        />
        <motion.button
          type="submit"
          className={`type-sans text-sm md:text-base rounded-full px-4 md:px-5 h-9 md:h-10 disabled:opacity-60 ${btnClass}`}
          disabled={status === "loading"}
          whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
          whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
        >
          <span className="inline-flex items-center gap-2">
            {status === "loading" && (
              <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/60 border-t-transparent animate-spin" aria-hidden />
            )}
            {btnLabel}
          </span>
        </motion.button>
      </motion.form>
      {/* Zone de message sous le champ (hauteur réservée pour éviter les sauts) */}
      <div className="min-h-5 md:min-h-6 px-3 pt-1" aria-live="polite" role="status">
        <motion.span
          id={msgId}
          className={`${status === "error" ? "text-red-600" : status === "ok" ? "text-emerald-700" : "text-foreground"} text-xs md:text-sm block truncate`}
          initial={{ opacity: 0 }}
          animate={{ opacity: message ? 1 : 0 }}
        >
          {message}
        </motion.span>
      </div>
    </div>
  );
}
