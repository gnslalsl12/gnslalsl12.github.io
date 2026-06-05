import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX, Repeat } from "lucide-react";
import { cn } from "../lib/cn";
import { alarm, beep, tick, vibrate } from "../lib/sound";

const TURN_PRESETS = [5, 10, 15, 30, 60];
const REST_PRESETS = [0, 3, 5, 10];

type Phase = "turn" | "rest";

function format(ms: number) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}`;
}

export default function BoardGameTimer() {
  const [turnSec, setTurnSec] = useState(10);
  const [restSec, setRestSec] = useState(0);
  const [autoLoop, setAutoLoop] = useState(true);
  const [muted, setMuted] = useState(false);

  const [phase, setPhase] = useState<Phase>("turn");
  const [remaining, setRemaining] = useState(turnSec * 1000);
  const [running, setRunning] = useState(false);
  const [turns, setTurns] = useState(0);

  const endRef = useRef(0);
  const lastTick = useRef(-1);
  // keep latest values for the interval callback
  const cfg = useRef({ turnSec, restSec, autoLoop, muted, phase });
  cfg.current = { turnSec, restSec, autoLoop, muted, phase };

  const totalForPhase = (phase === "turn" ? turnSec : restSec) * 1000;
  const progress = totalForPhase > 0 ? remaining / totalForPhase : 0;

  // sync remaining to a new duration while idle
  useEffect(() => {
    if (!running && phase === "turn") setRemaining(turnSec * 1000);
  }, [turnSec, running, phase]);

  const startPhase = (p: Phase, ms: number) => {
    setPhase(p);
    setRemaining(ms);
    endRef.current = Date.now() + ms;
    lastTick.current = -1;
    setRunning(true);
  };

  const handleEnd = () => {
    const c = cfg.current;
    if (!c.muted) {
      alarm();
      vibrate([120, 60, 120]);
    }
    if (c.phase === "turn") {
      setTurns((t) => t + 1);
      if (c.autoLoop && c.restSec > 0) {
        startPhase("rest", c.restSec * 1000);
        return;
      }
      if (c.autoLoop) {
        startPhase("turn", c.turnSec * 1000);
        return;
      }
      setRunning(false);
      setRemaining(0);
    } else {
      startPhase("turn", c.turnSec * 1000);
    }
  };

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const rem = Math.max(0, endRef.current - Date.now());
      setRemaining(rem);
      const sec = Math.ceil(rem / 1000);
      if (sec <= 3 && sec >= 1 && sec !== lastTick.current) {
        lastTick.current = sec;
        if (!cfg.current.muted) tick();
      }
      if (rem <= 0) {
        clearInterval(id);
        handleEnd();
      }
    }, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase]);

  const toggle = () => {
    if (running) {
      setRemaining(Math.max(0, endRef.current - Date.now()));
      setRunning(false);
    } else {
      const ms = remaining > 0 ? remaining : turnSec * 1000;
      endRef.current = Date.now() + ms;
      lastTick.current = -1;
      if (!muted) beep(660, 0.08);
      setRunning(true);
    }
  };

  const reset = () => {
    setRunning(false);
    setPhase("turn");
    setRemaining(turnSec * 1000);
    setTurns(0);
  };

  const isRest = phase === "rest";
  const warn = remaining <= 3000 && running && !isRest;
  const ringColor = isRest ? "#34d399" : warn ? "#f43f5e" : "#8b5cf6";
  const R = 120;
  const C = 2 * Math.PI * R;

  return (
    <div className="p-6 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        {/* Ring display */}
        <div className="mx-auto">
          <div className="relative grid place-items-center">
            <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90">
              <circle cx="140" cy="140" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
              <circle
                cx="140"
                cy="140"
                r={R}
                fill="none"
                stroke={ringColor}
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.1s linear, stroke 0.3s ease" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={cn("chip mb-2", isRest ? "text-emerald-300" : "text-brand")}>
                {isRest ? "휴식" : "턴 진행"}
              </span>
              <span
                className={cn(
                  "font-display font-bold tabular-nums transition-colors",
                  warn ? "text-rose-400" : "text-text",
                  remaining >= 60000 ? "text-6xl" : "text-7xl"
                )}
              >
                {format(remaining)}
              </span>
              <span className="mt-1 text-sm text-muted">{turns} 턴 완료</span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={toggle} className="btn btn-primary px-6">
              {running ? <Pause size={18} /> : <Play size={18} />}
              {running ? "일시정지" : "시작"}
            </button>
            <button onClick={reset} className="btn btn-ghost p-3" aria-label="리셋">
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setMuted((m) => !m)}
              className="btn btn-ghost p-3"
              aria-label={muted ? "소리 켜기" : "소리 끄기"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-semibold">턴 시간</p>
            <div className="flex flex-wrap gap-2">
              {TURN_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setTurnSec(p)}
                  className={cn("btn px-4 py-2", turnSec === p ? "btn-primary" : "btn-ghost")}
                >
                  {p}초
                </button>
              ))}
              <input
                type="number"
                min={1}
                value={turnSec}
                onChange={(e) => setTurnSec(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm outline-none focus:border-brand"
                aria-label="턴 시간(초) 직접 입력"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">휴식 텀 (턴 사이)</p>
            <div className="flex flex-wrap gap-2">
              {REST_PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setRestSec(p)}
                  className={cn("btn px-4 py-2", restSec === p ? "btn-primary" : "btn-ghost")}
                >
                  {p === 0 ? "없음" : `${p}초`}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setAutoLoop((v) => !v)}
            className={cn(
              "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors",
              autoLoop ? "border-brand/40 bg-brand/10" : "border-white/10 bg-white/5"
            )}
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Repeat size={16} className={autoLoop ? "text-brand" : "text-muted"} />
              자동 반복 (시간 종료 시 다음 턴 자동 시작)
            </span>
            <span
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                autoLoop ? "bg-brand" : "bg-white/15"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
                  autoLoop ? "left-[1.375rem]" : "left-0.5"
                )}
              />
            </span>
          </button>

          <p className="text-xs leading-relaxed text-muted">
            마지막 3초에는 신호음이 울립니다. 휴식 텀을 설정하면 턴이 끝난 뒤 자동으로 쉬는 시간이
            진행됩니다. 모바일에서는 진동도 함께 울려요.
          </p>
        </div>
      </div>
    </div>
  );
}
