import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { cn } from "../lib/cn";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "flex w-full max-w-[1180px] items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent"
        )}
      >
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-[var(--font-display)] text-lg font-bold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-sm font-extrabold text-white">
            JH
          </span>
          <span className="hidden sm:inline">Jeong Hoon</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text"
            >
              {s.label}
            </button>
          ))}
          <Link
            to="/blog"
            className={cn(
              "btn ml-2 px-3.5 py-2 text-sm",
              location.pathname.startsWith("/blog") ? "btn-primary" : "btn-ghost"
            )}
          >
            <BookOpen size={16} />
            Blog
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="btn btn-ghost p-2 md:hidden"
          aria-label="메뉴 열기"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="glass absolute top-[4.5rem] left-4 right-4 z-50 rounded-2xl p-2 md:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="block w-full rounded-lg px-4 py-3 text-left text-sm text-muted hover:bg-white/5 hover:text-text"
            >
              {s.label}
            </button>
          ))}
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-1 w-full"
          >
            <BookOpen size={16} />
            Blog
          </Link>
        </div>
      )}
    </header>
  );
}
