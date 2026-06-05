import { useEffect, useRef, useState } from "react";
import { Flag, Pause, Play, RotateCcw } from "lucide-react";

function fmt(ms: number) {
  const cs = Math.floor((ms % 1000) / 10);
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return { main: `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`, cs: String(cs).padStart(2, "0") };
}

export default function Stopwatch() {
  const [base, setBase] = useState(0);
  const [running, setRunning] = useState(false);
  const [, force] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startAt = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => force((x) => x + 1), 31);
    return () => clearInterval(id);
  }, [running]);

  const elapsed = base + (running ? Date.now() - startAt.current : 0);

  const toggle = () => {
    if (running) {
      setBase(elapsed);
      setRunning(false);
    } else {
      startAt.current = Date.now();
      setRunning(true);
    }
  };
  const reset = () => {
    setRunning(false);
    setBase(0);
    setLaps([]);
  };
  const lap = () => setLaps((l) => [elapsed, ...l]);

  const t = fmt(elapsed);

  return (
    <div className="p-6 text-center sm:p-8">
      <div className="font-display text-7xl font-bold tabular-nums">
        {t.main}
        <span className="text-3xl text-muted">.{t.cs}</span>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button onClick={toggle} className="btn btn-primary px-6">
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? "정지" : "시작"}
        </button>
        <button onClick={lap} disabled={!running} className="btn btn-ghost p-3" aria-label="랩">
          <Flag size={18} />
        </button>
        <button onClick={reset} className="btn btn-ghost p-3" aria-label="리셋">
          <RotateCcw size={18} />
        </button>
      </div>

      {laps.length > 0 && (
        <ul className="mx-auto mt-6 max-w-sm divide-y divide-white/5 text-sm">
          {laps.map((l, i) => {
            const lt = fmt(l);
            return (
              <li key={i} className="flex justify-between py-2">
                <span className="text-muted">LAP {laps.length - i}</span>
                <span className="tabular-nums">
                  {lt.main}.{lt.cs}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
