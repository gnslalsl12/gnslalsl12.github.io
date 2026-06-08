import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Check, Copy, FileDown } from "lucide-react";

const today = () => new Date().toISOString().slice(0, 10);

/** Build a URL/file-safe slug; falls back to a date-based name for non-ASCII titles. */
function slugify(title: string, date: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || `post-${date || today()}`;
}

export default function BlogWrite() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today());
  const [tags, setTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [filename, setFilename] = useState("");
  const [copied, setCopied] = useState<"md" | "name" | null>(null);

  const slug = filename.trim() || slugify(title, date);

  const tagList = useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags]
  );

  const markdown = useMemo(() => {
    const fm = [
      "---",
      `title: ${title || "제목 없음"}`,
      `date: ${date || today()}`,
      `tags: [${tagList.join(", ")}]`,
      `excerpt: ${excerpt}`,
      "---",
      "",
    ].join("\n");
    return fm + (body || "");
  }, [title, date, tagList, excerpt, body]);

  const copy = async (text: string, which: "md" | "name") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard may be blocked; user can still select manually */
    }
  };

  const download = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand/60";

  return (
    <div className="container-x pb-20 pt-28">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft size={16} />
        블로그
      </Link>

      <header className="mt-6 max-w-2xl">
        <span className="eyebrow">Write</span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">새 글 작성</h1>
        <p className="mt-4 text-pretty text-sm text-muted">
          이 사이트는 백엔드가 없는 정적 사이트라, 작성한 글은 마크다운 파일로 만들어
          저장소에 커밋하면 게시됩니다. 아래에서 작성하고 <code>.md</code> 파일을
          내려받거나 복사해 <code>src/content/blog/</code> 에 추가하세요.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* editor */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">제목</label>
            <input
              className={field}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">날짜</label>
              <input
                type="date"
                className={field}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted">
                파일명 (slug)
              </label>
              <input
                className={field}
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder={slugify(title, date)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">
              태그 (쉼표로 구분)
            </label>
            <input
              className={field}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, vite, 회고"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">요약</label>
            <input
              className={field}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="목록에 보일 한 줄 요약"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted">
              본문 (마크다운)
            </label>
            <textarea
              className={`${field} min-h-80 resize-y font-mono leading-relaxed`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"## 소제목\n\n내용을 작성하세요. **굵게**, `코드`, 목록, 표 모두 지원합니다."}
            />
          </div>
        </div>

        {/* preview */}
        <div className="space-y-4">
          <div className="bento p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              미리보기
            </p>
            {title || body ? (
              <article className="markdown">
                <h1>{title || "제목 없음"}</h1>
                {tagList.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {tagList.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
              </article>
            ) : (
              <p className="text-sm text-muted">제목과 본문을 입력하면 여기에 표시됩니다.</p>
            )}
          </div>

          <div className="bento p-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                생성된 파일
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copy(`${slug}.md`, "name")}
                  className="btn btn-ghost px-2.5 py-1.5 text-xs"
                >
                  {copied === "name" ? <Check size={13} /> : <Copy size={13} />}
                  {slug}.md
                </button>
                <button
                  onClick={() => copy(markdown, "md")}
                  className="btn btn-ghost px-2.5 py-1.5 text-xs"
                >
                  {copied === "md" ? <Check size={13} /> : <Copy size={13} />}
                  복사
                </button>
                <button onClick={download} className="btn btn-primary px-2.5 py-1.5 text-xs">
                  <FileDown size={13} />
                  내려받기
                </button>
              </div>
            </div>
            <pre className="max-h-72 overflow-auto rounded-xl bg-black/40 p-4 text-xs leading-relaxed text-muted">
              <code>{markdown}</code>
            </pre>
            <p className="mt-3 text-xs text-muted">
              <code className="text-text">src/content/blog/{slug}.md</code> 로 저장한 뒤
              커밋·푸시하면 게시됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
