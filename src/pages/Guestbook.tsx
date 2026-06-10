import { useEffect, useRef } from "react";
import { ExternalLink, MessageSquareHeart } from "lucide-react";
import { REPO_OWNER, REPO_NAME } from "../lib/blog";

// giscus configuration. Fill these in after enabling GitHub Discussions on the
// repo and installing the giscus app — grab the four values from giscus.app.
// While `repoId`/`categoryId` are placeholders, the page shows setup steps
// instead of the (broken) widget, so the build is always safe to ship.
const GISCUS = {
  repo: `${REPO_OWNER}/${REPO_NAME}` as `${string}/${string}`,
  repoId: "REPLACE_WITH_REPO_ID",
  category: "Guestbook",
  categoryId: "REPLACE_WITH_CATEGORY_ID",
};

const CONFIGURED =
  !GISCUS.repoId.startsWith("REPLACE") && !GISCUS.categoryId.startsWith("REPLACE");

function GiscusWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attrs: Record<string, string> = {
      "data-repo": GISCUS.repo,
      "data-repo-id": GISCUS.repoId,
      "data-category": GISCUS.category,
      "data-category-id": GISCUS.categoryId,
      "data-mapping": "specific",
      "data-term": "방명록",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "noborder_dark",
      "data-lang": "ko",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);
    el.appendChild(script);
  }, []);

  return <div ref={ref} className="giscus min-h-[200px]" />;
}

function SetupNotice() {
  const steps = [
    "저장소 Settings → General → Features 에서 Discussions 체크 활성화",
    "Discussions 에 'Guestbook' 카테고리 생성 (형식: Announcement 권장)",
    "github.com/apps/giscus 에서 giscus 앱을 이 저장소에 설치",
    "giscus.app 에 저장소를 입력해 나오는 repo-id 와 category-id 를 복사",
    "src/pages/Guestbook.tsx 의 GISCUS.repoId / categoryId 에 붙여넣기",
  ];
  return (
    <div className="bento mt-8 p-6">
      <p className="text-sm font-semibold">방명록을 켜려면 한 번만 설정이 필요해요</p>
      <p className="mt-1 text-xs text-muted">
        정적 사이트라 방문자가 자기 GitHub로 직접 글을 남기도록 giscus(=GitHub Discussions)를 씁니다.
      </p>
      <ol className="mt-4 space-y-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
              {i + 1}
            </span>
            <span className="leading-relaxed text-muted">{s}</span>
          </li>
        ))}
      </ol>
      <a
        href="https://giscus.app"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost mt-5 text-sm"
      >
        <ExternalLink size={15} />
        giscus.app 열기
      </a>
    </div>
  );
}

export default function Guestbook() {
  return (
    <div className="container-x pb-20 pt-28">
      <header className="max-w-2xl">
        <span className="eyebrow">Guestbook</span>
        <h1 className="mt-3 flex items-center gap-3 text-4xl font-bold sm:text-5xl">
          <MessageSquareHeart className="text-brand" size={36} />
          방명록
        </h1>
        <p className="mt-4 text-pretty text-muted">
          다녀가신 흔적을 남겨주세요. GitHub 계정으로 로그인하면 바로 글과 이모지를 남길 수 있어요.
        </p>
      </header>

      {CONFIGURED ? (
        <div className="mt-10">
          <GiscusWidget />
        </div>
      ) : (
        <SetupNotice />
      )}
    </div>
  );
}
