import { Link } from "react-router-dom";
import { Github, Mail, BookOpen } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} Jeong Hoon. Built with React · Vite · Tailwind.
        </p>
        <div className="flex items-center gap-4 text-muted">
          <a
            href="https://github.com/gnslalsl12"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://hoonyblog.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text"
            aria-label="Blog"
          >
            <BookOpen size={18} />
          </a>
          <a
            href="mailto:wjdgnsxhsl@naver.com"
            className="transition-colors hover:text-text"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <Link to="/tools" className="transition-colors hover:text-text">
            Toolbox
          </Link>
        </div>
      </div>
    </footer>
  );
}
