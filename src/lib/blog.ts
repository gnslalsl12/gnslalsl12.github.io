// Blog content layer.
//
// Posts are plain Markdown files in `src/content/blog/*.md`, each starting with
// a small YAML-ish frontmatter block. They're bundled at build time via Vite's
// `import.meta.glob` (no backend needed). A new post goes live by committing a
// new `.md` file — the `/blog/write` page helps generate one.

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  excerpt: string;
  body: string; // Markdown body (frontmatter stripped)
};

// Eagerly load every post as a raw string.
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

type Frontmatter = { data: Record<string, string | string[]>; body: string };

/** Minimal, dependency-free frontmatter parser (browser-safe, no Buffer). */
export function parseFrontmatter(raw: string): Frontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw.trim() };

  const [, fm, body] = match;
  const data: Record<string, string | string[]> = {};

  for (const line of fm.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const rawValue = line.slice(idx + 1).trim();
    if (!key) continue;

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }

  return { data, body: body.trim() };
}

function toPost(path: string, raw: string): BlogPost {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);
  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string" && data.tags
      ? [data.tags]
      : [];
  return {
    slug,
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    tags,
    excerpt: (data.excerpt as string) || "",
    body,
  };
}

/** All posts, newest first. */
export const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Rough reading time in minutes from a Markdown body. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
