import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Scroll-into-view fade/slide wrapper used across the portfolio.
 *
 * Uses an explicit `useInView` + `animate` (instead of `whileInView`) so the
 * hidden `initial` state is applied deterministically on the very first render.
 * `whileInView` could otherwise let the element paint at its natural/visible
 * state for one frame before snapping to hidden, producing a one-time "blink"
 * across the home page on load.
 */
export default function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
