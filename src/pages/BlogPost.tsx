import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CalendarDays, Clock, Tag } from "lucide-react";
import { getPost, readingMinutes } from "../lib/blog";

function formatDate(date: string) {
  if (!date) return "";
  const d = new Date(date);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-28 text-center">
        <h1 className="text-3xl font-bold">글을 찾을 수 없습니다</h1>
        <p className="mt-3 text-muted">주소가 바뀌었거나 삭제된 글일 수 있어요.</p>
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
    </article>
  );
}
