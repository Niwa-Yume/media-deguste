"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SplitText({ text, as = "p", delay = 0, className = "" }: { text: string; as?: "p" | "h1" | "h2" | "h3" | "div" | "span"; delay?: number; className?: string; }) {
  const words = text.split(" ");
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const MotionMap = {
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    div: motion.div,
    span: motion.span,
  } as const;
  const Wrapper = MotionMap[as];

  return (
    <div ref={ref}>
      <Wrapper
        className={className}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
        }}
      >
        {words.map((w, i) => (
          <span key={i} className="reveal-word mr-1">
            <motion.span
              variants={{ hidden: { y: "100%", filter: "blur(6px)" }, show: { y: "0%", filter: "blur(0px)", transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } } }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </Wrapper>
    </div>
  );
}
