import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  Code2,
  FileText,
  Loader2,
  Plane,
  Upload,
} from "lucide-react";
import {
  CATEGORIES,
  categoryLabel,
  docUrl,
  fetchDocs,
  getToken,
  isAllowedAuthor,
  verifyToken,
  type ArchiveDoc,
} from "../lib/archive";

const CATEGORY_ICON: Record<string, typeof FileText> = {
  dev: Code2,
  travel: Plane,
};

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

  useEffect(() => {
    let alive = true;
    if (getToken()) {
      verifyToken().then((login) => {
        if (alive) setCanUpload(!!login && isAllowedAuthor(login));
      });
    }
    setStatus("loading");
    fetchDocs()
      .then((d) => {
        if (!alive) return;
        setDocs(d);
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

  // Group docs by category, ordered by CATEGORIES then any extras.
  const groups = useMemo(() => {
    const byCat = new Map<string, ArchiveDoc[]>();
    for (const d of docs) {
      const list = byCat.get(d.category) ?? [];
      list.push(d);
      byCat.set(d.category, list);
    }
    const known = CATEGORIES.map((c) => c.id).filter((id) => byCat.has(id));
    const extras = [...byCat.keys()].filter((id) => !CATEGORIES.some((c) => c.id === id));
    return [...known, ...extras].map((id) => ({ id, docs: byCat.get(id)! }));
  }, [docs]);

  return (
    <div className="container-x pb-20 pt-28">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="eyebrow">Archive</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
            문서 <span className="text-gradient">아카이브</span>
          </h1>
          <p className="mt-4 text-pretty text-muted">
            개발 지식부터 여행 정보까지, 정리해 둔 문서들을 종류별로 모아두는 공간입니다.
          </p>
        </div>
        {canUpload && (
          <Link to="/archive/upload" className="btn btn-primary">
            <Upload size={16} />
            문서 올리기
          </Link>
        )}
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
                    <motion.a
                      key={doc.path}
                      href={docUrl(doc.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.03 * i }}
                      className="bento group flex flex-col p-5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold leading-snug transition-colors group-hover:text-brand">
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
                    </motion.a>
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
