import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";
import { cn } from "../lib/cn";
import { alarm } from "../lib/sound";

type Phase = "work" | "short" | "long";

const LABEL: Record<Phase, string> = { work: "집중", short: "짧은 휴식", long: "긴 휴식" };

function fmt(ms: number) {
  const t = Math.ceil(ms / 1000);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
}

export default function Pomodoro() {
  const [workMin, setWorkMin] = useState(25);
  const [shortMin, setShortMin] = useState(5);
  const [longMin, setLongMin] = useState(15);
  const cyclesBeforeLong = 4;

  const [phase, setPhase] = useState<Phase>("work");
  const [completed, setCompleted] = useState(0);
  const [remaining, setRemaining] = useState(workMin * 60000);
  const [running, setRunning] = useState(false);

  const endRef = useRef(0);
  const cfg = useRef({ workMin, shortMin, longMin, phase, completed });
  cfg.current = { workMin, shortMin, longMin, phase, completed };

  const durFor = (p: Phase) =>
    (p === "work" ? workMin : p === "short" ? shortMin : longMin) * 60000;
  const total = durFor(phase);
  const progress = total > 0 ? 1 - remaining / total : 0;

  useEffect(() => {
    if (!running) setRemaining(durFor(phase));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workMin, shortMin, longMin]);

  const startPhase = (p: Phase) => {
    const ms = (p === "work" ? cfg.current.workMin : p === "short" ? cfg.current.shortMin : cfg.current.longMin) * 60000;
    setPhase(p);
    setRemaining(ms);
    endRef.current = Date.now() + ms;
    setRunning(true);
  };

  const advance = (chime: boolean) => {
    if (chime) alarm();
    const c = cfg.current;
    if (c.phase === "work") {
      const done = c.completed + 1;
      setCompleted(done);
      startPhase(done % cyclesBeforeLong === 0 ? "long" : "short");
    } else {
      startPhase("work");
    }
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const rem = Math.max(0, endRef.current - Date.now());
      setRemaining(rem);
      if (rem <= 0) {
        clearInterval(id);
        advance(true);
      }
    }, 100);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase]);

  const toggle = () => {
    if (running) {
      setRemaining(Math.max(0, endRef.current - Date.now()));
      setRunning(false);
    } else {
      endRef.current = Date.now() + remaining;
      setRunning(true);
    }
  };
  const reset = () => {
    setRunning(false);
    setPhase("work");
    setCompleted(0);
    setRemaining(workMin * 60000);
  };

  const accent = phase === "work" ? "#8b5cf6" : "#34d399";

  return (
    <div className="p-6 text-center sm:p-8">
      <span
        className="chip"
        style={{ color: accent, borderColor: `${accent}55` }}
      >
        {LABEL[phase]} · {completed} 세션 완료
      </span>

      <div className="mt-5 font-display text-7xl font-bold tabular-nums">{fmt(remaining)}</div>

      <div className="mx-auto mt-5 h-2 w-full max-w-sm overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{ width: `${progress * 100}%`, background: accent }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={toggle} className="btn btn-primary px-6">
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? "일시정지" : "시작"}
        </button>
        <button onClick={() => advance(false)} className="btn btn-ghost p-3" aria-label="다음 단계">
          <SkipForward size={18} />
        </button>
        <button onClick={reset} className="btn btn-ghost p-3" aria-label="리셋">
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="mx-auto mt-8 grid max-w-sm grid-cols-3 gap-3">
        {([
          ["집중", workMin, setWorkMin],
          ["짧은휴식", shortMin, setShortMin],
          ["긴휴식", longMin, setLongMin],
        ] as const).map(([label, val, set]) => (
          <label key={label} className="text-xs text-muted">
            {label}(분)
            <input
              type="number"
              min={1}
              value={val}
              onChange={(e) => set(Math.max(1, Number(e.target.value) || 1))}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center text-sm text-text outline-none focus:border-brand"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
