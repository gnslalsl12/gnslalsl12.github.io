import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the very top of the viewport that fills as the
 * page scrolls. Driven by Framer's `useScroll` (scrollYProgress 0→1).
 *
 * Note: `useSpring` is a JS motion value, so `MotionConfig reducedMotion` and
 * the CSS reduced-motion rules don't touch it — we explicitly bind the raw
 * (instant) progress when the user prefers reduced motion. Purely decorative,
 * so it stays out of the tab order.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-3 to-accent"
    />
  );
}
