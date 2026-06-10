import { useEffect, useState } from "react";

type Section = { id: string; label: string };

// Order matches the portfolio sections (Hero has id="hero").
const SECTIONS: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/**
 * Fixed vertical dot navigation down the right edge (desktop only). Tracks the
 * section currently in view with an IntersectionObserver and lets the user jump
 * between sections. Hidden on small screens where it would crowd the content.
 */
export default function SectionDots() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="섹션 이동"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative grid place-items-center"
          >
            <span
              className={
                "block rounded-full transition-all duration-300 " +
                (isActive
                  ? "h-2.5 w-2.5 bg-brand shadow-[0_0_10px_2px_var(--glow-brand)]"
                  : "h-2 w-2 bg-white/25 group-hover:bg-white/60")
              }
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-surface/90 px-2 py-1 text-xs text-muted opacity-0 ring-1 ring-white/10 transition-opacity duration-200 group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
