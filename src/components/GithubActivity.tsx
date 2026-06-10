import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { REPO_OWNER } from "../lib/blog";

// Public, tokenless contribution data. Returns the last year of daily counts
// with a precomputed intensity level (0–4) we map straight onto color steps.
// NOTE: this is an unofficial community proxy (no SLA) — if it goes down or
// changes shape, the component falls back to a quiet error message. The
// `ApiResponse` type is a trust assertion, not a validated schema.
const API = `https://github-contributions-api.jogruber.de/v4/${REPO_OWNER}?y=last`;

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type MaybeDay = Day | null; // null = padding cell to align the first week
type ApiResponse = { total: Record<string, number>; contributions: Day[] };

// Brand-tinted intensity ramp (level 0 = empty cell). Derived from the
// --color-brand token via color-mix so it tracks the design system.
const LEVEL_BG = [
  "rgba(255,255,255,0.05)",
  "color-mix(in srgb, var(--color-brand) 28%, transparent)",
  "color-mix(in srgb, var(--color-brand) 48%, transparent)",
  "color-mix(in srgb, var(--color-brand) 72%, transparent)",
  "var(--color-brand)",
];

/** Split a flat day list into week columns (each column = 7 days, Sun→Sat). */
function toWeeks(days: Day[]): MaybeDay[][] {
  const weeks: MaybeDay[][] = [];
  // Pad the first week so the grid aligns to the weekday of the first entry.
  const firstWeekday = days.length ? new Date(days[0].date).getDay() : 0;
  let current: MaybeDay[] = new Array<MaybeDay>(firstWeekday).fill(null);
  for (const d of days) {
    current.push(d);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }
  return weeks;
}

export default function GithubActivity() {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [weeks, setWeeks] = useState<MaybeDay[][]>([]);
  const [total, setTotal] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When the heatmap overflows on narrow screens, start scrolled to the right
  // so the most recent weeks are visible first (oldest is off to the left).
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  useEffect(() => {
    let alive = true;
    fetch(API)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        if (!alive) return;
        const days = data.contributions ?? [];
        setWeeks(toWeeks(days));
        setTotal(days.reduce((sum, d) => sum + (d?.count ?? 0), 0));
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <a
      href={`https://github.com/${REPO_OWNER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bento group block min-w-0 p-6"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Github size={20} className="text-brand" />
          </span>
          <div>
            <p className="text-xs text-muted">GitHub 활동</p>
            <p className="font-semibold transition-colors group-hover:text-brand">
              지난 1년 잔디
            </p>
          </div>
        </div>
        {status === "ready" && (
          <span className="text-sm text-muted">
            <strong className="text-text">{total.toLocaleString()}</strong> contributions
          </span>
        )}
      </div>

      <div className="mt-5">
        {status === "loading" && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" />
            불러오는 중…
          </div>
        )}
        {status === "error" && (
          <p className="text-sm text-muted">잔디를 불러오지 못했어요. GitHub에서 직접 확인해 주세요.</p>
        )}
        {status === "ready" && (
          <div
            ref={scrollRef}
            role="img"
            aria-label={`지난 1년 GitHub 기여 히트맵 · 총 ${total.toLocaleString()} contributions`}
            className="overflow-x-auto pb-1"
          >
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <span
                      key={di}
                      title={day ? `${day.date} · ${day.count}` : undefined}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ background: day ? LEVEL_BG[day.level] : "transparent" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
