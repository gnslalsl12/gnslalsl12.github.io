import { useRef, useState } from "react";
import { Dice5, Hash, ListChecks, Shuffle } from "lucide-react";
import { cn } from "../lib/cn";
import { beep } from "../lib/sound";

type Tab = "dice" | "pick" | "number";

const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function Die({ value }: { value: number }) {
  const pips = PIPS[value] ?? [];
  return (
    <div className="grid h-16 w-16 grid-cols-3 grid-rows-3 gap-1 rounded-2xl bg-white p-2.5 shadow-lg">
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const on = pips.some(([r, c]) => r === row && c === col);
        return <span key={i} className={cn("rounded-full", on ? "bg-bg" : "bg-transparent")} />;
      })}
    </div>
  );
}

function Tabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; label: string; icon: typeof Dice5 }[] = [
    { id: "dice", label: "주사위", icon: Dice5 },
    { id: "pick", label: "뽑기", icon: ListChecks },
    { id: "number", label: "숫자", icon: Hash },
  ];
  return (
    <div className="flex gap-1 rounded-xl bg-white/5 p-1">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => setTab(it.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            tab === it.id ? "bg-brand text-white" : "text-muted hover:text-text"
          )}
        >
          <it.icon size={15} />
          {it.label}
        </button>
      ))}
    </div>
  );
}

export default function RandomTool() {
  const [tab, setTab] = useState<Tab>("dice");

  // dice
  const [count, setCount] = useState(2);
  const [dice, setDice] = useState<number[]>([1, 1]);
  const [rolling, setRolling] = useState(false);
  const rollRef = useRef<ReturnType<typeof setInterval>>();

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    let ticks = 0;
    rollRef.current = setInterval(() => {
      setDice(Array.from({ length: count }, () => 1 + Math.floor(Math.random() * 6)));
      ticks++;
      if (ticks > 9) {
        clearInterval(rollRef.current);
        setRolling(false);
        beep(520, 0.1);
      }
    }, 55);
  };

  // pick
  const [items, setItems] = useState("철수\n영희\n민수\n지영");
  const [picked, setPicked] = useState<string | null>(null);
  const pick = () => {
    const list = items.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!list.length) return;
    setPicked(list[Math.floor(Math.random() * list.length)]);
    beep(700, 0.1);
  };

  // number
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [num, setNum] = useState<number | null>(null);
  const genNumber = () => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    setNum(lo + Math.floor(Math.random() * (hi - lo + 1)));
    beep(640, 0.1);
  };

  const sum = dice.reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 sm:p-8">
      <Tabs tab={tab} setTab={setTab} />

      {tab === "dice" && (
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted">개수</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => {
                  setCount(n);
                  setDice(Array.from({ length: n }, () => 1));
                }}
                className={cn("btn px-3 py-1.5", count === n ? "btn-primary" : "btn-ghost")}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-7 flex min-h-[4rem] flex-wrap items-center justify-center gap-3">
            {dice.map((d, i) => (
              <Die key={i} value={d} />
            ))}
          </div>
          <p className="mt-5 font-display text-2xl font-bold">
            합계 <span className="text-gradient">{sum}</span>
          </p>
          <button onClick={roll} disabled={rolling} className="btn btn-primary mt-5">
            <Dice5 size={18} />
            {rolling ? "굴리는 중..." : "주사위 굴리기"}
          </button>
        </div>
      )}

      {tab === "pick" && (
        <div className="mt-6">
          <p className="mb-2 text-sm text-muted">항목을 한 줄에 하나씩 입력하세요.</p>
          <textarea
            value={items}
            onChange={(e) => setItems(e.target.value)}
            rows={5}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none focus:border-brand"
          />
          {picked && (
            <div className="mt-5 rounded-2xl border border-brand/30 bg-brand/10 p-6 text-center">
              <p className="text-xs text-muted">당첨</p>
              <p className="mt-1 font-display text-4xl font-bold text-gradient">{picked}</p>
            </div>
          )}
          <button onClick={pick} className="btn btn-primary mt-5 w-full">
            <Shuffle size={18} />
            랜덤 뽑기
          </button>
        </div>
      )}

      {tab === "number" && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-3">
            <label className="text-sm text-muted">
              최소
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value) || 0)}
                className="ml-2 w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm outline-none focus:border-brand"
              />
            </label>
            <span className="text-muted">~</span>
            <label className="text-sm text-muted">
              최대
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(Number(e.target.value) || 0)}
                className="ml-2 w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm outline-none focus:border-brand"
              />
            </label>
          </div>
          <div className="mt-6 grid place-items-center rounded-2xl border border-white/10 bg-white/5 py-10">
            <span className="font-display text-6xl font-bold tabular-nums">
              {num === null ? "—" : <span className="text-gradient">{num}</span>}
            </span>
          </div>
          <button onClick={genNumber} className="btn btn-primary mt-5 w-full">
            <Hash size={18} />
            숫자 뽑기
          </button>
        </div>
      )}
    </div>
  );
}
