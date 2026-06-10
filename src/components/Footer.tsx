import { Link } from "react-router-dom";
import { Github, Mail, MessageSquareHeart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-muted">
            © {year} Jeong Hoon. Built with React · Vite · Tailwind.
          </p>
          <p className="mt-1 text-xs text-muted/70">마지막 업데이트 · {__BUILD_DATE__}</p>
        </div>
        <div className="flex items-center gap-4 text-muted">
          <Link
            to="/guestbook"
            className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-text"
          >
            <MessageSquareHeart size={16} />
            방명록
          </Link>
          <span className="h-3 w-px bg-white/10" aria-hidden="true" />
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
            href="mailto:wjdgnsxhsl@naver.com"
            className="transition-colors hover:text-text"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
