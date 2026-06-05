import { Crown, Minus, Plus, RotateCcw, Trash2, UserPlus } from "lucide-react";
import { useLocalStorage } from "../lib/useLocalStorage";
import { cn } from "../lib/cn";

type Player = { id: number; name: string; score: number };

const COLORS = ["#8b5cf6", "#3b82f6", "#34d399", "#f59e0b", "#ec4899", "#06b6d4", "#f43f5e", "#a3e635"];
const STEPS = [1, 5, 10];

export default function ScoreCounter() {
  const [players, setPlayers] = useLocalStorage<Player[]>("tool.scores", [
    { id: 1, name: "Player 1", score: 0 },
    { id: 2, name: "Player 2", score: 0 },
  ]);
  const [step, setStep] = useLocalStorage<number>("tool.scores.step", 1);

  const max = players.length ? Math.max(...players.map((p) => p.score)) : 0;

  const update = (id: number, patch: Partial<Player>) =>
    setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const add = (id: number, delta: number) =>
    setPlayers((ps) => ps.map((p) => (p.id === id ? { ...p, score: p.score + delta } : p)));

  const addPlayer = () =>
    setPlayers((ps) => [
      ...ps,
      { id: Date.now(), name: `Player ${ps.length + 1}`, score: 0 },
    ]);
  const remove = (id: number) => setPlayers((ps) => ps.filter((p) => p.id !== id));
  const resetScores = () => setPlayers((ps) => ps.map((p) => ({ ...p, score: 0 })));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
          {STEPS.map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
                step === s ? "bg-brand text-white" : "text-muted hover:text-text"
              )}
            >
              ±{s}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={resetScores} className="btn btn-ghost">
            <RotateCcw size={16} />
            점수 초기화
          </button>
          <button onClick={addPlayer} className="btn btn-primary">
            <UserPlus size={16} />
            추가
          </button>
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {players.map((p, i) => {
          const isLeader = p.score === max && max !== 0;
          return (
            <li
              key={p.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border bg-white/5 p-3 transition-colors sm:gap-4 sm:p-4",
                isLeader ? "border-amber-400/40" : "border-white/10"
              )}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  value={p.name}
                  onChange={(e) => update(p.id, { name: e.target.value })}
                  className="w-full min-w-0 bg-transparent text-sm font-medium outline-none sm:text-base"
                  aria-label="플레이어 이름"
                />
                {isLeader && <Crown size={16} className="shrink-0 text-amber-400" />}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => add(p.id, -step)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  aria-label="감소"
                >
                  <Minus size={16} />
                </button>
                <span className="w-14 text-center font-display text-2xl font-bold tabular-nums">
                  {p.score}
                </span>
                <button
                  onClick={() => add(p.id, step)}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-brand/20 text-brand ring-1 ring-brand/30 transition-colors hover:bg-brand/30"
                  aria-label="증가"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:text-rose-400"
                  aria-label="삭제"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {players.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted">플레이어를 추가해 주세요.</p>
      )}
    </div>
  );
}
