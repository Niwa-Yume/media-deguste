"use client";
import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";

type LenisLike = {
  raf: (t: number) => void;
  destroy: () => void;
};

export default function LenisProvider({ children }: PropsWithChildren) {
  const rafRef = useRef<number | null>(null);
  const lenisRef = useRef<LenisLike | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // Respecte l’accessibilité

    let mounted = true;

    (async () => {
      try {
        const mod: unknown = await import("lenis");
        const LenisCtor = (mod as { default?: new (o?: unknown) => LenisLike } & (new (o?: unknown) => LenisLike)).default || (mod as new (o?: unknown) => LenisLike);
        const lenis = new LenisCtor({ duration: 1.2, smoothWheel: true, smoothTouch: false });
        if (!mounted) return;
        lenisRef.current = lenis;

        const raf = (time: number) => {
          lenis.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        };
        rafRef.current = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis indisponible", e);
      }
    })();

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (lenisRef.current) {
        try { lenisRef.current.destroy(); } catch {}
        lenisRef.current = null;
      }
    };
  }, []);

  return <>{children}</>;
}
