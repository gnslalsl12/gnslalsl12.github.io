import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CalendarDays, Loader2, PenLine, Tag } from "lucide-react";
import { fetchPosts, getToken, isAllowedAuthor, verifyToken, type BlogPost } from "../lib/blog";

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [canWrite, setCanWrite] = useState(false);

  // The write entry only appears for the verified site owner.
  useEffect(() => {
    let alive = true;
    if (!getToken()) return;
    verifyToken().then((login) => {
      if (alive) setCanWrite(!!login && isAllowedAuthor(login));
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    fetchPosts()
      .then((p) => {
        if (!alive) return;
        setPosts(p);
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
  }, []);

  return (
    <div className="container-x pb-20 pt-28">
      {/* header */}
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">Blog</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            기록과 <span className="text-gradient">생각</span>
          </h1>
          <p className="mt-4 text-pretty text-muted">
            개발하며 배운 것, 프로젝트 회고, 자잘한 트러블슈팅을 남깁니다.
          </p>
        </div>
        {canWrite && (
          <Link to="/blog/write" className="btn btn-primary">
            <PenLine size={16} />
            글 작성
          </Link>
        )}
      </header>

      {/* states */}
      {status === "loading" && (
        <div className="mt-20 flex items-center justify-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" />
          글을 불러오는 중…
        </div>
      )}

      {status === "error" && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={28} className="text-red-400" />
          <p className="text-muted">{error}</p>
        </div>
      )}

      {status === "ready" && posts.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">아직 작성된 글이 없습니다.</p>
          {canWrite && (
            <Link to="/blog/write" className="btn btn-ghost">
              <PenLine size={16} />첫 글 작성하기
            </Link>
          )}
        </div>
      )}

      {status === "ready" && posts.length > 0 && (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
            >
              <Link to={`/blog/${post.number}`} className="bento group flex h-full flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CalendarDays size={14} />
                  {formatDate(post.date)}
                </div>
                <h2 className="mt-3 text-xl font-bold transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="chip">
                        <Tag size={12} />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
