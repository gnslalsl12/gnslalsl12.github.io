// Archive — a hub of standalone HTML documents (Claude-authored notes, guides,
// travel info, …). Each document is a real .html file served statically from
// `public/docs/<category>/<slug>.html`; a manifest at `public/docs/index.json`
// drives the hub listing.
//
// NOTE: the static files live under `docs/`, NOT `archive/`, on purpose. The
// SPA owns the client routes `/archive` and `/archive/upload`; if the static
// files shared that prefix, GitHub Pages would treat `/archive/` as a real
// directory and serve its contents (or 404 the directory) on a hard refresh
// instead of letting the SPA fallback handle the route. Keeping docs under a
// separate `docs/` namespace avoids that collision entirely.
//
// Reading is a plain fetch of the manifest (no auth). The owner publishes new
// documents in-browser: publishDoc() commits the HTML file + an updated
// manifest to `main` in a single commit via the GitHub Git Data API, and a
// GitHub Actions workflow rebuilds & deploys the site (live in ~1-2 min).

import { getToken, isAllowedAuthor, verifyToken, REPO_OWNER, REPO_NAME } from "./blog";

export { getToken, setToken, isAllowedAuthor, verifyToken, REPO_OWNER, REPO_NAME } from "./blog";

export type ArchiveDoc = {
  slug: string;
  title: string;
  category: string; // category id (see CATEGORIES)
  description: string;
  path: string; // e.g. "docs/dev/vue-project-guide.html"
  date: string; // YYYY-MM-DD
};

export type Category = { id: string; label: string };

// Known categories (order defines hub section order). Unknown ids still render,
// labeled by their id.
export const CATEGORIES: Category[] = [
  { id: "dev", label: "개발 지식" },
  { id: "travel", label: "여행 정보" },
  { id: "etc", label: "기타" },
];

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

const REPO = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const BASE = import.meta.env.BASE_URL; // "/" for this user page

/** Public URL of a document (real static file). */
export function docUrl(path: string): string {
  return `${BASE}${path}`;
}

/** Turn a title/filename into a URL-safe slug. */
export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/\.html?$/, "")
      .replace(/[^a-z0-9가-힣\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `doc-${Date.now()}`
  );
}

/** Pull a <title> out of an HTML document, if present. */
export function htmlTitle(html: string): string {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return m ? m[1].trim() : "";
}

/* ------------------------------ reading --------------------------------- */

export async function fetchDocs(): Promise<ArchiveDoc[]> {
  const res = await fetch(`${BASE}docs/index.json?t=${Date.now()}`, { cache: "no-store" });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`문서 목록을 불러오지 못했습니다 (${res.status})`);
  const data = (await res.json()) as { docs?: ArchiveDoc[] };
  return data.docs ?? [];
}

/* ------------------------------ publishing ------------------------------ */

// UTF-8 safe base64 for the GitHub API (btoa only handles Latin-1).
function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function gh<T = unknown>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${REPO}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let detail = "";
    try {
      const d = (await res.json()) as { message?: string };
      detail = d?.message ? ` — ${d.message}` : "";
    } catch {
      /* ignore */
    }
    if (res.status === 401) throw new Error("토큰이 유효하지 않습니다 (401).");
    if (res.status === 403) throw new Error(`권한이 없거나 요청 한도를 초과했습니다 (403).${detail}`);
    throw new Error(`GitHub 요청 실패 (${res.status})${detail}`);
  }
  return res.json() as Promise<T>;
}

// Read the source-of-truth manifest (latest commit, uncached) so concurrent
// edits append correctly even before a deploy completes.
async function readSourceDocs(token: string, branch: string): Promise<ArchiveDoc[]> {
  const res = await fetch(`${REPO}/contents/public/docs/index.json?ref=${branch}`, {
    headers: { Accept: "application/vnd.github.raw", Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`매니페스트를 읽지 못했습니다 (${res.status})`);
  try {
    const data = JSON.parse(await res.text()) as { docs?: ArchiveDoc[] };
    return data.docs ?? [];
  } catch {
    return [];
  }
}

// Commit several files in a single commit via the Git Data API. Handles files
// larger than the Contents API's ~1MB limit. A `content` of null deletes the
// file (the tree entry is sent with `sha: null`).
type CommitFile = { path: string; content: string | null };

async function commitFiles(
  token: string,
  files: CommitFile[],
  message: string,
  branch: string
): Promise<void> {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${branch}`);
  const baseSha = ref.object.sha;
  const baseCommit = await gh<{ tree: { sha: string } }>(token, `/git/commits/${baseSha}`);

  const tree: { path: string; mode: "100644"; type: "blob"; sha: string | null }[] = [];
  for (const f of files) {
    if (f.content === null) {
      // Delete: a null sha removes the path from the tree.
      tree.push({ path: f.path, mode: "100644", type: "blob", sha: null });
      continue;
    }
    const blob = await gh<{ sha: string }>(token, `/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: toBase64(f.content), encoding: "base64" }),
    });
    tree.push({ path: f.path, mode: "100644", type: "blob", sha: blob.sha });
  }

  const newTree = await gh<{ sha: string }>(token, `/git/trees`, {
    method: "POST",
    body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree }),
  });
  const commit = await gh<{ sha: string }>(token, `/git/commits`, {
    method: "POST",
    body: JSON.stringify({ message, tree: newTree.sha, parents: [baseSha] }),
  });
  await gh(token, `/git/refs/heads/${branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha }),
  });
}

export type PublishInput = {
  slug: string;
  title: string;
  category: string;
  description: string;
  html: string;
};

const DEPLOY_BRANCH = "main";

export async function publishDoc(input: PublishInput): Promise<ArchiveDoc> {
  const token = getToken();
  if (!token) throw new Error("업로드하려면 GitHub 토큰이 필요합니다.");

  const path = `docs/${input.category}/${input.slug}.html`;
  const entry: ArchiveDoc = {
    slug: input.slug,
    title: input.title.trim(),
    category: input.category,
    description: input.description.trim(),
    path,
    date: new Date().toISOString().slice(0, 10),
  };

  const existing = await readSourceDocs(token, DEPLOY_BRANCH);
  const next = [entry, ...existing.filter((d) => d.path !== path)];
  const manifest = JSON.stringify({ docs: next }, null, 2) + "\n";

  await commitFiles(
    token,
    [
      { path: `public/${path}`, content: input.html },
      { path: `public/docs/index.json`, content: manifest },
    ],
    `docs: add ${entry.title}`,
    DEPLOY_BRANCH
  );

  return entry;
}

/* ------------------------------ deleting -------------------------------- */

// Owner-only. Removes a document's HTML file and drops it from the manifest in
// a single commit; GitHub Actions then redeploys. The caller should verify the
// token belongs to the owner (the UI gates the control behind that check), and
// the GitHub API itself rejects writes from any non-collaborator token.
export async function deleteDoc(doc: ArchiveDoc): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("삭제하려면 GitHub 토큰이 필요합니다.");

  const existing = await readSourceDocs(token, DEPLOY_BRANCH);
  const next = existing.filter((d) => d.path !== doc.path);
  const manifest = JSON.stringify({ docs: next }, null, 2) + "\n";

  // Only delete the underlying file if no remaining entry still points at it.
  const stillReferenced = next.some((d) => d.path === doc.path);
  const files: CommitFile[] = [{ path: `public/docs/index.json`, content: manifest }];
  if (!stillReferenced) files.push({ path: `public/${doc.path}`, content: null });

  await commitFiles(token, files, `docs: remove ${doc.title}`, DEPLOY_BRANCH);
}
