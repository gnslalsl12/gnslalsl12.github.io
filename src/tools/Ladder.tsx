import { useMemo, useState } from "react";
import { Minus, Plus, Shuffle } from "lucide-react";

const ROWS = 12;
const COL_GAP = 64;
const PAD_X = 28;
const Y0 = 10;
const Y1 = 270;

function generate(n: number): boolean[][] {
  return Array.from({ length: ROWS }, () => {
    const row = Array(Math.max(0, n - 1)).fill(false);
    for (let g = 0; g < n - 1; g++) {
      if (g > 0 && row[g - 1]) continue;
      row[g] = Math.random() < 0.4;
    }
    return row;
  });
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function Ladder() {
  const [names, setNames] = useState(["A", "B", "C", "D"]);
  const [results, setResults] = useState(["꽝", "당첨", "꽝", "꽝"]);
  const [rungs, setRungs] = useState<boolean[][]>(() => generate(4));
  const [active, setActive] = useState<number | null>(null);
  const [drawId, setDrawId] = useState(0);

  const n = names.length;
  const colX = (i: number) => PAD_X + i * COL_GAP;
  const rungY = (r: number) => Y0 + ((r + 1) * (Y1 - Y0)) / (ROWS + 1);
  const width = PAD_X * 2 + (n - 1) * COL_GAP;

  const reshuffle = () => {
    setRungs(generate(n));
    setActive(null);
  };

  const setCount = (next: number) => {
    if (next < 2 || next > 6) return;
    setNames((prev) =>
      next > prev.length ? [...prev, LETTERS[prev.length]] : prev.slice(0, next)
    );
    setResults((prev) => (next > prev.length ? [...prev, "꽝"] : prev.slice(0, next)));
    setRungs(generate(next));
    setActive(null);
  };

  const { path, endCol } = useMemo(() => {
    if (active === null) return { path: "", endCol: -1 };
    let col = active;
    let d = `M ${colX(col)} ${Y0}`;
    for (let r = 0; r < ROWS; r++) {
      const yr = rungY(r);
      d += ` L ${colX(col)} ${yr}`;
      let next = col;
      if (col > 0 && rungs[r][col - 1]) next = col - 1;
      else if (col < n - 1 && rungs[r][col]) next = col + 1;
      if (next !== col) {
        d += ` L ${colX(next)} ${yr}`;
        col = next;
      }
    }
    d += ` L ${colX(col)} ${Y1}`;
    return { path: d, endCol: col };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, rungs, n]);

  const run = (i: number) => {
    setActive(i);
    setDrawId((d) => d + 1);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">인원</span>
          <button onClick={() => setCount(n - 1)} className="btn btn-ghost p-2" aria-label="줄이기">
            <Minus size={16} />
          </button>
          <span className="w-6 text-center font-semibold">{n}</span>
          <button onClick={() => setCount(n + 1)} className="btn btn-ghost p-2" aria-label="늘리기">
            <Plus size={16} />
          </button>
        </div>
        <button onClick={reshuffle} className="btn btn-ghost">
          <Shuffle size={16} />
          사다리 섞기
        </button>
      </div>

      {/* top labels */}
      <div className="mt-5 flex justify-center gap-0 overflow-x-auto">
        <div style={{ width }} className="relative shrink-0">
          <div className="flex" style={{ paddingLeft: PAD_X - COL_GAP / 2, paddingRight: PAD_X - COL_GAP / 2 }}>
            {names.map((name, i) => (
              <input
                key={i}
                value={name}
                onChange={(e) =>
                  setNames((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                }
                onClick={() => run(i)}
                style={{ width: COL_GAP }}
                className="cursor-pointer bg-transparent text-center text-sm font-semibold outline-none"
                aria-label={`참가자 ${i + 1}`}
              />
            ))}
          </div>

          <svg width={width} height={Y1 + Y0} className="block">
            {/* vertical lines */}
            {names.map((_, i) => (
              <line
                key={i}
                x1={colX(i)}
                y1={Y0}
                x2={colX(i)}
                y2={Y1}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
              />
            ))}
            {/* rungs */}
            {rungs.map((row, r) =>
              row.map((on, g) =>
                on ? (
                  <line
                    key={`${r}-${g}`}
                    x1={colX(g)}
                    y1={rungY(r)}
                    x2={colX(g + 1)}
                    y2={rungY(r)}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="2"
                  />
                ) : null
              )
            )}
            {/* active path */}
            {path && (
              <path
                key={drawId}
                d={path}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                className="ladder-path"
              />
            )}
          </svg>

          {/* bottom result labels */}
          <div className="flex" style={{ paddingLeft: PAD_X - COL_GAP / 2, paddingRight: PAD_X - COL_GAP / 2 }}>
            {results.map((res, i) => (
              <input
                key={i}
                value={res}
                onChange={(e) =>
                  setResults((prev) => prev.map((v, j) => (j === i ? e.target.value : v)))
                }
                style={{ width: COL_GAP }}
                className={`bg-transparent text-center text-sm outline-none ${
                  endCol === i ? "font-bold text-brand" : "text-muted"
                }`}
                aria-label={`결과 ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {active !== null && endCol >= 0 && (
        <p className="mt-4 text-center text-sm">
          <span className="font-semibold">{names[active]}</span> →{" "}
          <span className="font-bold text-gradient">{results[endCol]}</span>
        </p>
      )}
    </div>
  );
}
