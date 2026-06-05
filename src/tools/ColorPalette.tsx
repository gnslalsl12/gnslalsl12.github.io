import { useEffect, useState } from "react";
import { Check, Lock, RefreshCw, Unlock } from "lucide-react";

type Swatch = { hex: string; locked: boolean };

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const c = l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function randomColor(): Swatch {
  const h = Math.floor(Math.random() * 360);
  const s = 55 + Math.floor(Math.random() * 30);
  const l = 45 + Math.floor(Math.random() * 20);
  return { hex: hslToHex(h, s, l), locked: false };
}

export default function ColorPalette() {
  const [colors, setColors] = useState<Swatch[]>(() => Array.from({ length: 5 }, randomColor));
  const [copied, setCopied] = useState<number | null>(null);

  const regenerate = () =>
    setColors((cs) => cs.map((c) => (c.locked ? c : randomColor())));

  const toggleLock = (i: number) =>
    setColors((cs) => cs.map((c, j) => (j === i ? { ...c, locked: !c.locked } : c)));

  const copy = async (hex: string, i: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(i);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.target as HTMLElement)?.tagName !== "INPUT") {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {colors.map((c, i) => {
          const light = parseInt(c.hex.slice(1), 16) > 0x999999;
          const textCls = light ? "text-black/70" : "text-white/80";
          return (
            <div
              key={i}
              className="group relative flex h-40 flex-col justify-between overflow-hidden rounded-2xl ring-1 ring-white/10"
              style={{ background: c.hex }}
            >
              <button
                onClick={() => toggleLock(i)}
                className={`m-2 grid h-8 w-8 place-items-center self-end rounded-lg bg-black/20 backdrop-blur ${textCls}`}
                aria-label={c.locked ? "잠금 해제" : "잠금"}
              >
                {c.locked ? <Lock size={15} /> : <Unlock size={15} className="opacity-60" />}
              </button>
              <button
                onClick={() => copy(c.hex, i)}
                className={`px-3 pb-3 text-left font-display text-sm font-bold uppercase ${textCls}`}
              >
                {copied === i ? (
                  <span className="inline-flex items-center gap-1">
                    <Check size={14} /> 복사됨
                  </span>
                ) : (
                  c.hex
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-muted">스페이스바 또는 버튼으로 생성 · 자물쇠로 색 고정 · 클릭하면 복사</p>
        <button onClick={regenerate} className="btn btn-primary">
          <RefreshCw size={16} />
          새 팔레트
        </button>
      </div>
    </div>
  );
}
