import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, PenLine, Tag } from "lucide-react";
import { posts } from "../lib/blog";

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
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
        <Link to="/blog/write" className="btn btn-ghost">
          <PenLine size={16} />
          글 작성
        </Link>
      </header>

      {/* list */}
      {posts.length === 0 ? (
        <p className="mt-16 text-center text-muted">아직 작성된 글이 없습니다.</p>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="bento group flex h-full flex-col p-6"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <CalendarDays size={14} />
                  {formatDate(post.date)}
                </div>
                <h2 className="mt-3 text-xl font-bold transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
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
