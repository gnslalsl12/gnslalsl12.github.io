import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  FileUp,
  KeyRound,
  Loader2,
  RotateCcw,
  Save,
  ShieldAlert,
} from "lucide-react";
import {
  CATEGORIES,
  docUrl,
  fetchDocs,
  getToken,
  setToken,
  verifyToken,
  isAllowedAuthor,
  updateDoc,
  slugify,
  htmlTitle,
  REPO_OWNER,
  REPO_NAME,
  type ArchiveDoc,
} from "../lib/archive";

type Account =
  | { state: "idle" }
  | { state: "checking" }
  | { state: "done"; login: string | null; allowed: boolean };

const TOKEN_URL =
  "https://github.com/settings/tokens/new?scopes=public_repo&description=archive-" + REPO_NAME;

export default function ArchiveEdit() {
  const navigate = useNavigate();
  const { category: routeCategory, slug: routeSlug } = useParams();

  const [token, setTokenState] = useState(getToken());
  const [showToken, setShowToken] = useState(false);
  const [account, setAccount] = useState<Account>({ state: "idle" });

  // The document being edited, resolved from the manifest by its path.
  const [original, setOriginal] = useState<ArchiveDoc | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [loadError, setLoadError] = useState("");

  const [html, setHtml] = useState("");
  const [fileReplaced, setFileReplaced] = useState(false);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Verify the token's account (debounced) — only the owner can save.
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

  // Resolve the target document from the manifest and pre-fill the form, then
  // fetch its current HTML so the preview works and the unchanged file can be
  // re-committed verbatim if the owner doesn't replace it.
  useEffect(() => {
    let alive = true;
    const targetPath = `docs/${routeCategory}/${routeSlug}.html`;
    setLoadState("loading");
    fetchDocs()
      .then(async (docs) => {
        if (!alive) return;
        const doc = docs.find((d) => d.path === targetPath);
        if (!doc) {
          setLoadError("해당 문서를 찾을 수 없습니다.");
          setLoadState("error");
          return;
        }
        setOriginal(doc);
        setTitle(doc.title);
        setCategory(doc.category);
        setSlug(doc.slug);
        setDescription(doc.description);
        try {
          const res = await fetch(docUrl(doc.path), { cache: "no-store" });
          const text = res.ok ? await res.text() : "";
          if (alive) setHtml(text);
        } catch {
          /* preview/keep-content is best-effort; saving without a replacement
             would otherwise wipe the file, so guard that in canSave below. */
        }
        if (alive) setLoadState("ready");
      })
      .catch((e: unknown) => {
        if (!alive) return;
        setLoadError(e instanceof Error ? e.message : String(e));
        setLoadState("error");
      });
    return () => {
      alive = false;
    };
  }, [routeCategory, routeSlug]);

  const isOwner = account.state === "done" && account.allowed;
  const effectiveSlug = slug.trim() || slugify(title || fileName);
  const canSave =
    isOwner && !!html.trim() && !!title.trim() && !!effectiveSlug && !saving && loadState === "ready";

  const saveToken = (value: string) => {
    setTokenState(value);
    setToken(value.trim());
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    setHtml(text);
    setFileName(file.name);
    setFileReplaced(true);
    const t = htmlTitle(text);
    if (t) setTitle(t);
  };

  const previewSrc = useMemo(() => html, [html]);

  const save = async () => {
    setError("");
    if (!original) return;
    if (!isOwner) return setError("사이트 소유자만 수정할 수 있습니다.");
    if (!html.trim()) return setError("문서 내용을 불러오지 못했습니다. 파일을 교체해 주세요.");
    if (!title.trim()) return setError("제목을 입력해 주세요.");

    setSaving(true);
    try {
      const doc = await updateDoc({
        original,
        slug: effectiveSlug,
        title,
        category,
        description,
        html,
      });
      navigate("/archive", { state: { updated: doc.path } });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  };

  const field =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text outline-none transition-colors focus:border-brand/60";

  return (
    <div className="container-x pb-20 pt-28">
      <Link
        to="/archive"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft size={16} />
        아카이브
      </Link>

      <header className="mt-6 max-w-2xl">
        <span className="eyebrow">Edit</span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">문서 수정</h1>
        <p className="mt-4 text-pretty text-sm text-muted">
          제목·카테고리·설명·파일명을 고치거나 HTML 파일을 교체할 수 있습니다. 파일을 교체하지
          않으면 기존 내용이 그대로 유지됩니다. 저장하면 저장소에 커밋되고 GitHub Actions가 자동
          배포해 1~2분 뒤 반영됩니다.
        </p>
      </header>

      {loadState === "loading" && (
        <div className="mt-16 flex items-center justify-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" />
          문서를 불러오는 중…
        </div>
      )}

      {loadState === "error" && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={28} className="text-red-400" />
          <p className="text-muted">{loadError}</p>
          <Link to="/archive" className="btn btn-ghost mt-2">
            아카이브로 돌아가기
          </Link>
        </div>
      )}

      {loadState === "ready" && (
        <>
          {/* token */}
          <details className="bento mt-8 p-5" open={!token}>
            <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
              <KeyRound size={16} className="text-brand" />
              GitHub 토큰 {token ? "· 저장됨" : "· 필요"}
            </summary>
            <div className="mt-4 space-y-3">
              <p className="text-xs leading-relaxed text-muted">
                정적 사이트라 수정하려면 본인 GitHub 토큰이 필요합니다. 토큰은 이 브라우저
                (localStorage)에만 저장되며, 저장 시 GitHub API 직접 호출에만 쓰입니다. 블로그
                글쓰기와 같은 토큰을 공유합니다. 공용 PC에서는 사용하지 마세요.
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
                대상: <code>{REPO_OWNER}/{REPO_NAME}</code> · 소유자(<code>@{REPO_OWNER}</code>)만 가능
              </p>
              {account.state === "checking" && (
                <p className="flex items-center gap-1.5 text-xs text-muted">
                  <Loader2 size={13} className="animate-spin" />
                  토큰 확인 중…
                </p>
              )}
              {account.state === "done" && account.allowed && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 size={13} />@{account.login} 으로 인증됨 · 수정 가능
                </p>
              )}
              {account.state === "done" && !account.allowed && (
                <p className="flex items-center gap-1.5 text-xs text-amber-400">
                  <ShieldAlert size={13} />
                  {account.login
                    ? `@${account.login} 계정은 수정 권한이 없습니다 (소유자 전용).`
                    : "토큰이 유효하지 않습니다."}
                </p>
              )}
            </div>
          </details>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* form */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">
                  HTML 파일 교체 (선택)
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-muted transition-colors hover:border-brand/50">
                  <FileUp size={18} className="text-brand" />
                  <span className="min-w-0 truncate">
                    {fileReplaced
                      ? fileName
                      : "여기를 눌러 새 .html 파일 선택 (선택 안 하면 기존 내용 유지)"}
                  </span>
                  <input
                    type="file"
                    accept=".html,text/html"
                    className="hidden"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                </label>
                {fileReplaced && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-400">
                    <RotateCcw size={12} />새 파일로 교체됩니다.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">제목</label>
                <input
                  className={field}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="문서 제목"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted">카테고리</label>
                  <select
                    className={field}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-surface">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-muted">
                    파일명 (slug)
                  </label>
                  <input
                    className={field}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder={slugify(title || fileName || "")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted">설명</label>
                <input
                  className={field}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="목록 카드에 보일 한 줄 설명"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={save}
                disabled={!canSave}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "저장 중…" : "저장하기"}
              </button>
              <p className="text-xs text-muted">
                저장 위치: <code>docs/{category}/{effectiveSlug || "..."}.html</code>
                {original && `docs/${category}/${effectiveSlug}.html` !== original.path && (
                  <>
                    {" "}
                    · 기존 <code>{original.path}</code> 에서 이동
                  </>
                )}
              </p>
            </div>

            {/* preview */}
            <div className="bento overflow-hidden p-0">
              <p className="border-b border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-muted">
                미리보기
              </p>
              {previewSrc ? (
                <iframe
                  title="문서 미리보기"
                  srcDoc={previewSrc}
                  sandbox="allow-scripts allow-popups"
                  className="h-[600px] w-full bg-white"
                />
              ) : (
                <p className="p-6 text-sm text-muted">
                  내용을 불러오지 못했습니다. 파일을 교체하면 여기에서 미리 볼 수 있습니다.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
