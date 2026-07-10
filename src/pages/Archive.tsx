import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Code2,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  Pencil,
  Plane,
  Trash2,
  Upload,
} from "lucide-react";
import {
  CATEGORIES,
  categoryLabel,
  deleteDoc,
  docUrl,
  fetchDocs,
  fetchDocsAsOwner,
  getToken,
  isAllowedAuthor,
  isPrivateDoc,
  setDocVisibility,
  verifyToken,
  type ArchiveDoc,
} from "../lib/archive";

const CATEGORY_ICON: Record<string, typeof FileText> = {
  dev: Code2,
  travel: Plane,
};

// Tapping the page title this many times in quick succession reveals the
// upload entry (kept hidden from the main UI). Publishing still requires the
// owner's GitHub token.
const SECRET_TAPS = 5;
const TAP_RESET_MS = 1200;

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
}

export default function Archive() {
  const [docs, setDocs] = useState<ArchiveDoc[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");
  const [canUpload, setCanUpload] = useState(false);
  const [secretOpen, setSecretOpen] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [togglingPath, setTogglingPath] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const tapsRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const ownerDocsLoadedRef = useRef(false);

  const handleTitleTap = () => {
    if (secretOpen) return;
    tapsRef.current += 1;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (tapsRef.current >= SECRET_TAPS) {
      tapsRef.current = 0;
      setSecretOpen(true);
      return;
    }
    timerRef.current = setTimeout(() => {
      tapsRef.current = 0;
    }, TAP_RESET_MS);
  };

  useEffect(() => {
    let alive = true;
    ownerDocsLoadedRef.current = false;

    // Public path: the deployed manifest never contains private docs (stripped
    // at build time — see the strip-private-docs Vite plugin), so this is safe
    // and fast for every visitor, owner included. Guarded against the owner
    // path below resolving first: whichever order the two settle in, the
    // owner's fuller list (once verified) always wins.
    setStatus("loading");
    fetchDocs()
      .then((d) => {
        if (!alive || ownerDocsLoadedRef.current) return;
        setDocs(d);
        setStatus("ready");
      })
      .catch((e: unknown) => {
        if (!alive || ownerDocsLoadedRef.current) return;
        setError(e instanceof Error ? e.message : String(e));
        setStatus("error");
      });

    // Owner path: once the token verifies, re-fetch the source-of-truth
    // manifest straight from git so private docs show up for management too.
    if (getToken()) {
      verifyToken().then(async (login) => {
        const owner = !!login && isAllowedAuthor(login);
        if (!alive) return;
        setCanUpload(owner);
        if (!owner) return;
        try {
          const full = await fetchDocsAsOwner();
          if (alive) {
            ownerDocsLoadedRef.current = true;
            setDocs(full);
            setStatus("ready");
          }
        } catch {
          /* the public list above already loaded; owner-only extras are best-effort */
        }
      });
    }

    return () => {
      alive = false;
    };
  }, []);

  // Group docs by category, ordered by CATEGORIES then any extras. Private
  // docs are only shown to the verified owner — everyone else never sees them
  // listed (the toggle lives in `setDocVisibility`, gated the same way).
  const groups = useMemo(() => {
    const visible = canUpload ? docs : docs.filter((d) => !isPrivateDoc(d));
    const byCat = new Map<string, ArchiveDoc[]>();
    for (const d of visible) {
      const list = byCat.get(d.category) ?? [];
      list.push(d);
      byCat.set(d.category, list);
    }
    const known = CATEGORIES.map((c) => c.id).filter((id) => byCat.has(id));
    const extras = [...byCat.keys()].filter((id) => !CATEGORIES.some((c) => c.id === id));
    return [...known, ...extras].map((id) => ({ id, docs: byCat.get(id)! }));
  }, [docs, canUpload]);

  // Owner-only public/private toggle. Commits the manifest change, then
  // optimistically updates the card's visibility in place.
  const handleToggleVisibility = async (doc: ArchiveDoc) => {
    if (togglingPath) return;
    const nextVisibility = isPrivateDoc(doc) ? "public" : "private";
    setTogglingPath(doc.path);
    try {
      const updated = await setDocVisibility(doc, nextVisibility);
      setDocs((prev) => prev.map((d) => (d.path === doc.path ? updated : d)));
    } catch (e: unknown) {
      window.alert(e instanceof Error ? e.message : String(e));
    } finally {
      setTogglingPath(null);
    }
  };

  // Owner-only delete. Commits to `main` (file + manifest), then optimistically
  // drops the card; the live deploy catches up in 1~2 minutes.
  const handleDelete = async (doc: ArchiveDoc) => {
    if (deletingPath) return;
    if (!window.confirm(`'${doc.title}' 문서를 삭제할까요? 되돌릴 수 없습니다.`)) return;
    setDeletingPath(doc.path);
    try {
      await deleteDoc(doc);
      setDocs((prev) => prev.filter((d) => d.path !== doc.path));
    } catch (e: unknown) {
      window.alert(e instanceof Error ? e.message : String(e));
    } finally {
      setDeletingPath(null);
    }
  };

  return (
    <div className="container-x pb-20 pt-28">
      <header className="max-w-2xl">
        <span className="eyebrow">Archive</span>
        <h1
          onClick={handleTitleTap}
          className="mt-3 cursor-pointer select-none text-4xl font-bold sm:text-5xl"
        >
          문서 <span className="text-gradient">아카이브</span>
        </h1>
        <p className="mt-4 text-pretty text-muted">
          개발 지식부터 여행 정보까지, 정리해 둔 문서들을 종류별로 모아두는 공간입니다.
        </p>

        {/* Upload entry — visible to the verified owner, or revealed by tapping
            the title 5 times. Publishing itself still requires the owner token. */}
        <AnimatePresence initial={false}>
          {(canUpload || secretOpen) && (
            <motion.div
              key="upload-entry"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <Link to="/archive/upload" className="btn btn-primary mt-5">
                <Upload size={16} />
                문서 올리기
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {status === "loading" && (
        <div className="mt-20 flex items-center justify-center gap-2 text-muted">
          <Loader2 size={18} className="animate-spin" />
          문서를 불러오는 중…
        </div>
      )}

      {status === "error" && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <AlertCircle size={28} className="text-red-400" />
          <p className="text-muted">{error}</p>
        </div>
      )}

      {status === "ready" && docs.length === 0 && (
        <p className="mt-16 text-center text-muted">아직 등록된 문서가 없습니다.</p>
      )}

      {status === "ready" && groups.length > 0 && (
        <div className="mt-12 space-y-12">
          {groups.map((group) => {
            const Icon = CATEGORY_ICON[group.id] ?? FileText;
            return (
              <section key={group.id}>
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                  <Icon size={18} className="text-brand" />
                  {categoryLabel(group.id)}
                  <span className="text-sm font-normal text-muted">{group.docs.length}</span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.docs.map((doc, i) => (
                    <motion.div
                      key={doc.path}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.03 * i }}
                      className="group relative"
                    >
                      <a
                        href={docUrl(doc.path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento flex h-full flex-col p-5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="flex items-center gap-1.5 font-semibold leading-snug transition-colors group-hover:text-brand">
                            {isPrivateDoc(doc) && (
                              <Lock
                                size={13}
                                className="shrink-0 text-amber-400"
                                aria-label="비공개 (목록에서만 숨김, 직접 URL로는 접근 가능)"
                              />
                            )}
                            {doc.title}
                          </h3>
                          <ArrowUpRight
                            size={16}
                            className="mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                          />
                        </div>
                        {doc.description && (
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                            {doc.description}
                          </p>
                        )}
                        <span className="mt-4 text-xs text-muted">{formatDate(doc.date)}</span>
                      </a>

                      {canUpload && (
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleVisibility(doc)}
                            disabled={togglingPath === doc.path || deletingPath === doc.path}
                            aria-label={
                              isPrivateDoc(doc)
                                ? "비공개 문서 · 클릭하면 공개로 전환"
                                : "공개 문서 · 클릭하면 비공개로 전환 (목록에서만 숨겨짐, 직접 URL로는 접근 가능)"
                            }
                            title={
                              isPrivateDoc(doc)
                                ? "비공개 문서 · 클릭하면 공개로 전환"
                                : "공개 문서 · 클릭하면 비공개로 전환 (목록에서만 숨겨짐, 직접 URL로는 접근 가능)"
                            }
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300 disabled:opacity-100"
                          >
                            {togglingPath === doc.path ? (
                              <Loader2 size={15} className="animate-spin" />
                            ) : isPrivateDoc(doc) ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                          <Link
                            to={`/archive/edit/${doc.category}/${doc.slug}`}
                            aria-label="문서 수정"
                            title="문서 수정"
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition-all hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
                          >
                            <Pencil size={15} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(doc)}
                            disabled={deletingPath === doc.path || togglingPath === doc.path}
                            aria-label="문서 삭제"
                            title="문서 삭제"
                            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 disabled:opacity-100"
                          >
                            {deletingPath === doc.path ? (
                              <Loader2 size={15} className="animate-spin" />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
