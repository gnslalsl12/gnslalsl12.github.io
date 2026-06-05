import { useState } from "react";
import { Play } from "lucide-react";
import { beep } from "../lib/sound";

const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#06b6d4", "#34d399", "#f59e0b", "#ec4899", "#f43f5e"];

function point(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
}

export default function Roulette() {
  const [raw, setRaw] = useState("치킨\n피자\n족발\n보쌈\n떡볶이\n초밥");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const items = raw.split("\n").map((s) => s.trim()).filter(Boolean);
  const n = items.length;
  const slice = n ? 360 / n : 360;

  const spin = () => {
    if (spinning || n < 2) return;
    setSpinning(true);
    setWinner(null);
    const idx = Math.floor(Math.random() * n);
    const center = idx * slice + slice / 2;
    const current = ((rotation % 360) + 360) % 360;
    const delta = ((360 - center - current + 360) % 360) + 360 * 5;
    setRotation((r) => r + delta);
    window.setTimeout(() => {
      setSpinning(false);
      setWinner(items[idx]);
      beep(720, 0.14);
    }, 4200);
  };

  return (
    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="mx-auto">
        <div className="relative grid place-items-center">
          {/* pointer */}
          <div className="absolute -top-1 z-10 h-0 w-0 border-x-[10px] border-t-[18px] border-x-transparent border-t-brand drop-shadow" />
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4s cubic-bezier(0.2, 0.8, 0.1, 1)" : "none",
            }}
          >
            <svg width="240" height="240" viewBox="0 0 220 220">
              {items.length >= 2 ? (
                items.map((label, i) => {
                  const start = i * slice;
                  const end = (i + 1) * slice;
                  const [x1, y1] = point(110, 110, 100, start);
                  const [x2, y2] = point(110, 110, 100, end);
                  const large = slice > 180 ? 1 : 0;
                  const [lx, ly] = point(110, 110, 64, start + slice / 2);
                  return (
                    <g key={i}>
                      <path
                        d={`M110 110 L ${x1} ${y1} A 100 100 0 ${large} 1 ${x2} ${y2} Z`}
                        fill={COLORS[i % COLORS.length]}
                        opacity={0.9}
                        stroke="rgba(10,10,15,0.6)"
                        strokeWidth="1"
                      />
                      <text
                        x={lx}
                        y={ly}
                        fill="#fff"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {label.length > 6 ? label.slice(0, 6) + "…" : label}
                      </text>
                    </g>
                  );
                })
              ) : (
                <circle cx="110" cy="110" r="100" fill="rgba(255,255,255,0.05)" />
              )}
              <circle cx="110" cy="110" r="16" fill="#0a0a0f" stroke="rgba(255,255,255,0.2)" />
            </svg>
          </div>
        </div>

        <div className="mt-5 text-center">
          {winner ? (
            <p className="font-display text-2xl font-bold">
              👑 <span className="text-gradient">{winner}</span>
            </p>
          ) : (
            <p className="text-sm text-muted">{n < 2 ? "항목을 2개 이상 입력하세요" : "스핀을 눌러 돌려보세요"}</p>
          )}
          <button onClick={spin} disabled={spinning || n < 2} className="btn btn-primary mt-3">
            <Play size={18} />
            {spinning ? "도는 중..." : "스핀"}
          </button>
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">항목 (한 줄에 하나)</p>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={8}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none focus:border-brand"
        />
        <p className="mt-2 text-xs text-muted">메뉴 정하기, 벌칙, 순서 정하기 등에 활용해 보세요.</p>
      </div>
    </div>
  );
}
