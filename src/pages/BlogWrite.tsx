import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Send,
  ShieldAlert,
} from "lucide-react";
import {
  createPost,
  getToken,
  setToken,
  verifyToken,
  isAllowedAuthor,
  REPO_OWNER,
  REPO_NAME,
} from "../lib/blog";

// Result of checking which GitHub account the saved token belongs to.
type Account =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "done"; login: string | null; allowed: boolean };

const TOKEN_URL =
  "https://github.com/settings/tokens/new?scopes=public_repo&description=blog-" + REPO_NAME;

export default function BlogWrite() {
  const navigate = useNavigate();

  const [token, setTokenState] = useState(getToken());
  const [showToken, setShowToken] = useState(false);
  const [account, setAccount] = useState<Account>({ state: "idle" });

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");

  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  // Verify which account the token belongs to (debounced) so only the site
  // owner can publish.
  useEffect(() => {
    const t = token.trim();
    if (!t) {
      setAccount({ state: "idle" });
      return;
    }
    setAccount({ state: "checking" });
    const handle = setTimeout(async () => {
      const login = await verifyToken(t);
      setAccount({ state: "done", login, allowed: !!login && isAllowedAuthor(login) });
    }, 600);
    return () => clearTimeout(handle);
  }, [token]);

  const isOwner = account.state === "done" && account.allowed;

  const tagList = useMemo(
    () =>
      tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tags]
  );

  const canPublish = isOwner && title.trim() && body.trim() && !publishing;

  const saveToken = (value: string) => {
    setTokenState(value);
    setToken(value.trim());
  };

  const publish = async () => {
    setError("");
    if (!isOwner) return setError("사이트 소유자만 게시할 수 있습니다.");
    if (!title.trim()) return setError("제목을 입력해 주세요.");
    if (!body.trim()) return setError("본문을 입력해 주세요.");

    setPublishing(true);
    try {
      const post = await createPost({ title, tags: tagList, body });
      navigate(`/blog/${post.number}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setPublishing(false);
    }
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
          글은 GitHub 이슈로 게시됩니다. 게시하는 즉시 블로그에 반영되며, 재빌드는 필요 없습니다.
        </p>
      </header>

      {/* token */}
      <details className="bento mt-8 p-5" open={!token}>
        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
          <KeyRound size={16} className="text-brand" />
          GitHub 토큰 {token ? "· 저장됨" : "· 필요"}
        </summary>
        <div className="mt-4 space-y-3">
          <p className="text-xs leading-relaxed text-muted">
            정적 사이트라 게시하려면 본인 GitHub 토큰이 필요합니다. 토큰은 이 브라우저
            (localStorage)에만 저장되며 어디에도 전송되지 않습니다(게시 시 GitHub API 직접
            호출에만 사용). 공용 PC에서는 사용하지 마세요.
          </p>
          <a
            href={TOKEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand hover:text-accent"
          >
            <ExternalLink size={13} />
            토큰 발급 (classic · <code className="mx-1">public_repo</code> 권한)
          </a>
          <div className="flex items-center gap-2">
            <input
              type={showToken ? "text" : "password"}
              className={field}
              value={token}
              onChange={(e) => saveToken(e.target.value)}
              placeholder="ghp_..."
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShowToken((v) => !v)}
              className="btn btn-ghost p-2.5"
              aria-label={showToken ? "토큰 숨기기" : "토큰 표시"}
            >
              {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-muted">
            게시 대상: <code>{REPO_OWNER}/{REPO_NAME}</code> · 소유자(<code>@{REPO_OWNER}</code>)만 게시 가능
          </p>

          {account.state === "checking" && (
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <Loader2 size={13} className="animate-spin" />
              토큰 확인 중…
            </p>
          )}
          {account.state === "done" && account.allowed && (
            <p className="flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 size={13} />@{account.login} 으로 인증됨 · 게시 가능
            </p>
          )}
          {account.state === "done" && !account.allowed && (
            <p className="flex items-center gap-1.5 text-xs text-amber-400">
              <ShieldAlert size={13} />
              {account.login
                ? `@${account.login} 계정은 게시 권한이 없습니다 (소유자 전용).`
                : "토큰이 유효하지 않습니다."}
            </p>
          )}
        </div>
      </details>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
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
            <label className="mb-1.5 block text-xs font-semibold text-muted">
              본문 (마크다운)
            </label>
            <textarea
              className={`${field} min-h-96 resize-y font-mono leading-relaxed`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={"## 소제목\n\n내용을 작성하세요. **굵게**, `코드`, 목록, 표 모두 지원합니다."}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button onClick={publish} disabled={!canPublish} className="btn btn-primary w-full disabled:opacity-50">
            {publishing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {publishing ? "게시 중…" : "게시하기"}
          </button>
        </div>

        {/* preview */}
        <div className="bento p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">미리보기</p>
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
      </div>
    </div>
  );
}
