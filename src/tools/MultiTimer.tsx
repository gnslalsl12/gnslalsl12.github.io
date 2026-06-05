import { useEffect, useRef, useState } from "react";
import { Pause, Play, Plus, RotateCcw, Timer, Trash2 } from "lucide-react";
import { alarm } from "../lib/sound";

type T = { id: number; label: string; total: number; remaining: number; running: boolean; endAt: number };

const QUICK = [1, 3, 5, 10];

function fmt(ms: number) {
  const t = Math.ceil(ms / 1000);
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MultiTimer() {
  const [timers, setTimers] = useState<T[]>([
    { id: 1, label: "계란 삶기", total: 600000, remaining: 600000, running: false, endAt: 0 },
  ]);
  const [now, setNow] = useState(Date.now());
  const [label, setLabel] = useState("");
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, []);

  const live = (t: T) => (t.running ? Math.max(0, t.endAt - now) : t.remaining);

  useEffect(() => {
    timers.forEach((t) => {
      if (t.running && t.endAt - now <= 0 && !fired.current.has(t.id)) {
        fired.current.add(t.id);
        alarm();
        setTimers((ts) => ts.map((x) => (x.id === t.id ? { ...x, running: false, remaining: 0 } : x)));
      }
    });
  }, [now, timers]);

  const add = () => {
    const ms = (min * 60 + sec) * 1000;
    if (ms <= 0) return;
    setTimers((ts) => [
      ...ts,
      { id: Date.now(), label: label.trim() || "타이머", total: ms, remaining: ms, running: false, endAt: 0 },
    ]);
    setLabel("");
  };

  const start = (id: number) =>
    setTimers((ts) =>
      ts.map((t) => {
        if (t.id !== id) return t;
        fired.current.delete(id);
        const rem = t.remaining > 0 ? t.remaining : t.total;
        return { ...t, running: true, remaining: rem, endAt: Date.now() + rem };
      })
    );
  const pause = (id: number) =>
    setTimers((ts) =>
      ts.map((t) => (t.id === id ? { ...t, running: false, remaining: Math.max(0, t.endAt - Date.now()) } : t))
    );
  const reset = (id: number) => {
    fired.current.delete(id);
    setTimers((ts) => ts.map((t) => (t.id === id ? { ...t, running: false, remaining: t.total } : t)));
  };
  const remove = (id: number) => setTimers((ts) => ts.filter((t) => t.id !== id));

  return (
    <div className="p-6 sm:p-8">
      {/* add form */}
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <label className="flex-1 text-xs text-muted">
          이름
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="타이머 이름"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none focus:border-brand"
          />
        </label>
        <label className="text-xs text-muted">
          분
          <input
            type="number"
            min={0}
            value={min}
            onChange={(e) => setMin(Math.max(0, Number(e.target.value) || 0))}
            className="mt-1 w-16 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center text-sm text-text outline-none focus:border-brand"
          />
        </label>
        <label className="text-xs text-muted">
          초
          <input
            type="number"
            min={0}
            max={59}
            value={sec}
            onChange={(e) => setSec(Math.min(59, Math.max(0, Number(e.target.value) || 0)))}
            className="mt-1 w-16 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center text-sm text-text outline-none focus:border-brand"
          />
        </label>
        <button onClick={add} className="btn btn-primary">
          <Plus size={16} />
          추가
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK.map((m) => (
          <button
            key={m}
            onClick={() => {
              setMin(m);
              setSec(0);
            }}
            className="chip hover:text-text"
          >
            {m}분
          </button>
        ))}
      </div>

      {/* timers */}
      <ul className="mt-5 space-y-3">
        {timers.map((t) => {
          const rem = live(t);
          const done = rem <= 0 && !t.running;
          return (
            <li
              key={t.id}
              className={`flex items-center gap-3 rounded-2xl border p-4 ${
                done ? "border-rose-400/40 bg-rose-400/10" : "border-white/10 bg-white/5"
              }`}
            >
              <Timer size={18} className="shrink-0 text-muted" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.label}</p>
                <p className="font-display text-2xl font-bold tabular-nums">{fmt(rem)}</p>
              </div>
              {t.running ? (
                <button onClick={() => pause(t.id)} className="btn btn-ghost p-2.5" aria-label="일시정지">
                  <Pause size={16} />
                </button>
              ) : (
                <button onClick={() => start(t.id)} className="btn btn-primary p-2.5" aria-label="시작">
                  <Play size={16} />
                </button>
              )}
              <button onClick={() => reset(t.id)} className="btn btn-ghost p-2.5" aria-label="리셋">
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => remove(t.id)}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:text-rose-400"
                aria-label="삭제"
              >
                <Trash2 size={16} />
              </button>
            </li>
          );
        })}
        {timers.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">타이머를 추가해 보세요.</p>
        )}
      </ul>
    </div>
  );
}
