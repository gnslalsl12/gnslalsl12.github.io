import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, LayoutGrid, Sparkles } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const STATS = ["3 Team Projects", "SSAFY 8기", "Frontend Leader"];
const MARQUEE = [
  "React", "TypeScript", "Three.js", "React Native", "Tailwind",
  "Framer Motion", "Recoil", "Redux", "Vite", "Node",
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* ambient orbs */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand/25 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-brand-3/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />

      <div className="container-x relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={item}>
            <span className="chip">
              <Sparkles size={14} className="text-brand" />
              SW Developer · Frontend
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-balance text-5xl font-bold leading-[1.05] sm:text-7xl md:text-[5.5rem]"
          >
            Hi, I&apos;m <span className="text-gradient">Jeong Hoon</span>
            <br />
            <span className="text-text/90">interactive web,</span>{" "}
            <span className="text-muted">made human.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-pretty text-base text-muted sm:text-lg"
          >
            사용자 중심의 직관적인 UI/UX와 동적인 인터랙션으로
            <br className="hidden sm:block" /> 생동감 있는 웹 경험을 만드는 프론트엔드 개발자입니다.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => scrollToId("projects")} className="btn btn-primary">
              프로젝트 보기
              <ArrowDown size={16} />
            </button>
            <Link to="/tools" className="btn btn-ghost">
              <LayoutGrid size={16} />
              Toolbox 열기
            </Link>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {STATS.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* skill marquee */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/5 py-4">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="text-sm font-medium uppercase tracking-widest text-muted/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
