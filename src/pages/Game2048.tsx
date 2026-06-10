import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { useLocalStorage } from "../lib/useLocalStorage";

// ── 2048 ────────────────────────────────────────────────────────────────
// A hidden easter-egg game. Classic rules: slide tiles, equal ones merge,
// reach 2048. Works with arrow keys / WASD on desktop and swipes on touch.

type Board = number[][]; // 4×4, 0 = empty
const SIZE = 4;

const empty = (): Board =>
  Array.from({ length: SIZE }, () => Array<number>(SIZE).fill(0));

function clone(b: Board): Board {
  return b.map((row) => [...row]);
}

function emptyCells(b: Board): [number, number][] {
  const cells: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (b[r][c] === 0) cells.push([r, c]);
  return cells;
}

function spawn(b: Board): Board {
  const cells = emptyCells(b);
  if (!cells.length) return b;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = clone(b);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

/** Slide + merge a single row to the left. Returns the row and points gained. */
function slideRow(row: number[]): { row: number[]; gained: number } {
  const nums = row.filter((n) => n !== 0);
  const merged: number[] = [];
  let gained = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      const sum = nums[i] * 2;
      merged.push(sum);
      gained += sum;
      i++; // skip the consumed tile
    } else {
      merged.push(nums[i]);
    }
  }
  while (merged.length < SIZE) merged.push(0);
  return { row: merged, gained };
}

type Dir = "left" | "right" | "up" | "down";

function move(b: Board, dir: Dir): { board: Board; gained: number; moved: boolean } {
  // Normalize every direction to a left-slide by transforming the grid.
  const rows: number[][] = [];
  for (let i = 0; i < SIZE; i++) {
    let line: number[];
    if (dir === "left" || dir === "right") {
      line = [...b[i]];
      if (dir === "right") line.reverse();
    } else {
      line = b.map((row) => row[i]); // column
      if (dir === "down") line.reverse();
    }
    rows.push(line);
  }

  let gained = 0;
  const slid = rows.map((line) => {
    const res = slideRow(line);
    gained += res.gained;
    return res.row;
  });

  const next = empty();
  for (let i = 0; i < SIZE; i++) {
    let line = slid[i];
    if (dir === "right" || dir === "down") line = [...line].reverse();
    for (let j = 0; j < SIZE; j++) {
      if (dir === "left" || dir === "right") next[i][j] = line[j];
      else next[j][i] = line[j];
    }
  }

  const moved = JSON.stringify(next) !== JSON.stringify(b);
  return { board: next, gained, moved };
}

function canMove(b: Board): boolean {
  if (emptyCells(b).length) return true;
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (c + 1 < SIZE && b[r][c] === b[r][c + 1]) return true;
      if (r + 1 < SIZE && b[r][c] === b[r + 1][c]) return true;
    }
  return false;
}

function freshBoard(): Board {
  return spawn(spawn(empty()));
}

// Tile color ramp — brand-tinted, brightening with value.
const TILE: Record<number, string> = {
  0: "bg-white/5 text-transparent",
  2: "bg-white/10 text-text",
  4: "bg-white/[0.16] text-text",
  8: "bg-brand/30 text-text",
  16: "bg-brand/45 text-white",
  32: "bg-brand/60 text-white",
  64: "bg-brand/80 text-white",
  128: "bg-brand text-white",
  256: "bg-accent/70 text-white",
  512: "bg-accent/85 text-white",
  1024: "bg-accent text-white",
  2048: "bg-gradient-to-br from-brand to-accent text-white",
};

const SWIPE_THRESHOLD = 24; // px

export default function Game2048() {
  const [board, setBoard] = useState<Board>(freshBoard);
  const [score, setScore] = useState(0);
  const [best, setBest] = useLocalStorage<number>("game:2048:best", 0);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const apply = useCallback(
    (dir: Dir) => {
      setBoard((prev) => {
        if (!canMove(prev)) return prev;
        const { board: next, gained, moved } = move(prev, dir);
        if (!moved) return prev;
        const withSpawn = spawn(next);
        setScore((s) => {
          const ns = s + gained;
          setBest((b) => (ns > b ? ns : b));
          return ns;
        });
        if (!won && withSpawn.some((row) => row.includes(2048))) setWon(true);
        if (!canMove(withSpawn)) setOver(true);
        return withSpawn;
      });
    },
    [won, setBest]
  );

  const reset = useCallback(() => {
    setBoard(freshBoard());
    setScore(0);
    setOver(false);
    setWon(false);
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        a: "left",
        d: "right",
        w: "up",
        s: "down",
      };
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      apply(dir);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [apply]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    touchStart.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) > Math.abs(dy)) apply(dx > 0 ? "right" : "left");
    else apply(dy > 0 ? "down" : "up");
  };

  return (
    <div className="container-x flex min-h-screen flex-col items-center pb-20 pt-28">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={16} />
          홈으로
        </Link>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Easter Egg</span>
            <h1 className="mt-2 text-4xl font-bold">
              <span className="text-gradient">2048</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="rounded-xl bg-white/5 px-4 py-2 text-center ring-1 ring-white/10">
              <p className="text-[0.65rem] uppercase tracking-wider text-muted">Score</p>
              <p className="text-lg font-bold tabular-nums">{score}</p>
            </div>
            <div className="rounded-xl bg-white/5 px-4 py-2 text-center ring-1 ring-white/10">
              <p className="flex items-center gap-1 text-[0.65rem] uppercase tracking-wider text-muted">
                <Trophy size={11} className="text-amber-300" /> Best
              </p>
              <p className="text-lg font-bold tabular-nums">{best}</p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">
          방향키·WASD 또는 <span className="text-text">스와이프</span>로 타일을 밀어 같은 숫자를 합치세요.
        </p>

        {/* Board */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative mt-5 touch-none select-none rounded-2xl bg-white/5 p-3 ring-1 ring-white/10"
        >
          <div className="grid grid-cols-4 gap-3">
            {board.flatMap((row, r) =>
              row.map((v, c) => (
                <div
                  key={`${r}-${c}-${v}`}
                  className={
                    "grid aspect-square place-items-center rounded-xl text-2xl font-bold tabular-nums transition-colors duration-150 sm:text-3xl " +
                    (TILE[v] ?? "bg-gradient-to-br from-accent to-brand text-white") +
                    (v ? " animate-[pop_0.15s_ease]" : "")
                  }
                >
                  {v || ""}
                </div>
              ))
            )}
          </div>

          {/* Overlay: win / game over */}
          {(over || won) && (
            <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-bg/80 backdrop-blur-sm">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {won && !over ? "🎉 2048 달성!" : "게임 오버"}
                </p>
                <p className="mt-1 text-sm text-muted">점수 {score}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {won && !over && (
                    <button onClick={() => setWon(false)} className="btn btn-ghost">
                      계속하기
                    </button>
                  )}
                  <button onClick={reset} className="btn btn-primary">
                    <RotateCcw size={16} />
                    다시 시작
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={reset} className="btn btn-ghost mt-4 w-full">
          <RotateCcw size={16} />
          새 게임
        </button>
      </div>
    </div>
  );
}
