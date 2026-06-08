import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CalendarDays, Clock, Github, Loader2, Tag } from "lucide-react";
import { fetchPost, readingMinutes, type BlogPost } from "../lib/blog";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { number } = useParams<{ number: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const id = Number(number);
    if (!Number.isInteger(id) || id <= 0) {
      setError("글을 찾을 수 없습니다.");
      setStatus("error");
      return;
    }
    let alive = true;
    setStatus("loading");
    fetchPost(id)
      .then((p) => {
        if (!alive) return;
        setPost(p);
        setStatus("ready");
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setError(e instanceof Error ? e.message : String(e));
        setStatus("error");
      });
    return () => {
      alive = false;
    };
  }, [number]);

  if (status === "loading") {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center gap-2 pt-28 text-muted">
        <Loader2 size={18} className="animate-spin" />
        불러오는 중…
      </div>
    );
  }

  if (status === "error" || !post) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="text-3xl font-bold">{error || "글을 찾을 수 없습니다"}</h1>
        <Link to="/blog" className="btn btn-primary mt-6">
          <ArrowLeft size={16} />
          블로그로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <article className="container-x max-w-3xl pb-20 pt-28">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft size={16} />
        블로그
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="chip">
            <CalendarDays size={14} />
            {formatDate(post.date)}
          </span>
          <span className="chip">
            <Clock size={14} />약 {readingMinutes(post.body)}분
          </span>
          {post.tags.map((t) => (
            <span key={t} className="chip">
              <Tag size={12} />
              {t}
            </span>
          ))}
        </div>
      </header>

      <hr className="my-8 border-white/10" />

      <div className="markdown">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>

      <footer className="mt-12 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-muted">
        {post.author && (
          <span className="flex items-center gap-2">
            {post.authorAvatar && (
              <img src={post.authorAvatar} alt={post.author} className="h-6 w-6 rounded-full" />
            )}
            @{post.author}
          </span>
        )}
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-text"
        >
          <Github size={15} />
          GitHub에서 보기 · 댓글
        </a>
      </footer>
    </article>
  );
}
