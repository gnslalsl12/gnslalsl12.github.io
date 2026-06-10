import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar pinned to the very top of the viewport that fills as the
 * page scrolls. Driven by Framer's `useScroll` (scrollYProgress 0→1) and
 * smoothed with a spring. Purely decorative, so it stays out of the tab order.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-brand-3 to-accent"
    />
  );
}
