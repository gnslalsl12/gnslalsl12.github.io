// Blog content layer — backed by GitHub Issues.
//
// This is a backend-less static site, so posts live as GitHub Issues labeled
// `blog` in this repo. The site reads them at runtime via the public GitHub
// REST API (no auth needed to read a public repo), and the /blog/write page
// publishes a new post by creating an issue with a personal access token.
// New posts appear instantly — no rebuild/redeploy required.

export const REPO_OWNER = "gnslalsl12";
export const REPO_NAME = "gnslalsl12.github.io";
export const BLOG_LABEL = "blog";

// Only posts authored by these GitHub accounts are ever rendered. This is a
// defense-in-depth guard on top of GitHub's own rule that only users with push
// access can apply the `blog` label to an issue.
export const ALLOWED_AUTHORS = [REPO_OWNER.toLowerCase()];

const API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const TOKEN_KEY = "blog:gh-token";

export function isAllowedAuthor(login: string): boolean {
  return ALLOWED_AUTHORS.includes((login || "").toLowerCase());
}

export type BlogPost = {
  number: number; // issue number, used as the /blog/:number slug
  title: string;
  date: string; // ISO created_at
  updated: string; // ISO updated_at
  tags: string[];
  excerpt: string;
  body: string; // markdown (metadata comment stripped)
  url: string; // html_url of the backing issue
  author: string;
  authorAvatar: string;
};

/* ----------------------------- token storage ---------------------------- */

export function getToken(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setToken(token: string): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function headers(token = getToken()): HeadersInit {
  const h: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/* ------------------------------- parsing -------------------------------- */

// Tags are stored in a leading HTML comment so they don't render in the body:
//   <!-- tags: react, vite -->
const TAGS_RE = /^\s*<!--\s*tags:\s*(.*?)\s*-->\s*/i;

function parseBody(raw: string): { tags: string[]; body: string } {
  const m = TAGS_RE.exec(raw || "");
  if (!m) return { tags: [], body: (raw || "").trim() };
  const tags = m[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return { tags, body: raw.slice(m[0].length).trim() };
}

export function buildIssueBody(tags: string[], body: string): string {
  const clean = tags.map((t) => t.trim()).filter(Boolean);
  const prefix = clean.length ? `<!-- tags: ${clean.join(", ")} -->\n\n` : "";
  return prefix + body.trim() + "\n";
}

function excerptOf(markdown: string, max = 140): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max).trim()}…` : plain;
}

// GitHub /issues also returns pull requests; they carry a `pull_request` field.
type RawIssue = {
  number: number;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
  html_url: string;
  user?: { login?: string; avatar_url?: string };
  pull_request?: unknown;
};

function toPost(issue: RawIssue): BlogPost {
  const { tags, body } = parseBody(issue.body || "");
  return {
    number: issue.number,
    title: issue.title,
    date: issue.created_at,
    updated: issue.updated_at,
    tags,
    excerpt: excerptOf(body),
    body,
    url: issue.html_url,
    author: issue.user?.login ?? "",
    authorAvatar: issue.user?.avatar_url ?? "",
  };
}

/* ------------------------------ fetching -------------------------------- */

let listCache: { at: number; posts: BlogPost[] } | null = null;
const CACHE_MS = 60_000;

export function invalidateCache(): void {
  listCache = null;
}

export async function fetchPosts(force = false): Promise<BlogPost[]> {
  if (!force && listCache && Date.now() - listCache.at < CACHE_MS) {
    return listCache.posts;
  }
  const res = await fetch(
    `${API}/issues?labels=${BLOG_LABEL}&state=open&sort=created&direction=desc&per_page=100`,
    { headers: headers() }
  );
  if (!res.ok) throw new Error(await errorMessage(res, "글 목록을 불러오지 못했습니다"));
  const data = (await res.json()) as RawIssue[];
  const posts = data
    .filter((i) => !i.pull_request)
    .map(toPost)
    .filter((p) => isAllowedAuthor(p.author));
  listCache = { at: Date.now(), posts };
  return posts;
}

export async function fetchPost(number: number): Promise<BlogPost> {
  const res = await fetch(`${API}/issues/${number}`, { headers: headers() });
  if (res.status === 404) throw new Error("글을 찾을 수 없습니다.");
  if (!res.ok) throw new Error(await errorMessage(res, "글을 불러오지 못했습니다"));
  const issue = (await res.json()) as RawIssue;
  if (issue.pull_request) throw new Error("글을 찾을 수 없습니다.");
  const post = toPost(issue);
  if (!isAllowedAuthor(post.author)) throw new Error("글을 찾을 수 없습니다.");
  return post;
}

/**
 * Resolve the GitHub account a token belongs to. Used to gate the write UI so
 * only the site owner can publish. Returns the login, or null if the token is
 * missing/invalid. Authenticated, so it doesn't consume the anon rate limit.
 */
export async function verifyToken(token = getToken()): Promise<string | null> {
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/user", { headers: headers(token) });
    if (!res.ok) return null;
    const data = (await res.json()) as { login?: string };
    return data.login ?? null;
  } catch {
    return null;
  }
}

export async function createPost(input: {
  title: string;
  tags: string[];
  body: string;
}): Promise<BlogPost> {
  const token = getToken();
  if (!token) throw new Error("게시하려면 GitHub 토큰이 필요합니다.");

  const res = await fetch(`${API}/issues`, {
    method: "POST",
    headers: { ...headers(token), "Content-Type": "application/json" },
    body: JSON.stringify({
      title: input.title.trim(),
      body: buildIssueBody(input.tags, input.body),
      labels: [BLOG_LABEL],
    }),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "게시에 실패했습니다"));
  invalidateCache();
  return toPost((await res.json()) as RawIssue);
}

async function errorMessage(res: Response, fallback: string): Promise<string> {
  let detail = "";
  try {
    const data = await res.json();
    detail = data?.message ? ` — ${data.message}` : "";
  } catch {
    /* ignore */
  }
  if (res.status === 401) return `${fallback}: 토큰이 유효하지 않습니다 (401).`;
  if (res.status === 403) return `${fallback}: 권한이 없거나 요청 한도를 초과했습니다 (403).${detail}`;
  return `${fallback} (${res.status})${detail}`;
}

export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
