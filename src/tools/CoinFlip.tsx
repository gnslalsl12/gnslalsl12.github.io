import { useState } from "react";
import { Coins } from "lucide-react";
import { beep } from "../lib/sound";

export default function CoinFlip() {
  const [flips, setFlips] = useState(0);
  const [result, setResult] = useState<"H" | "T">("H");
  const [busy, setBusy] = useState(false);
  const [tally, setTally] = useState({ H: 0, T: 0 });

  const flip = () => {
    if (busy) return;
    setBusy(true);
    const next: "H" | "T" = Math.random() < 0.5 ? "H" : "T";
    setResult(next);
    setFlips((f) => f + 5 + (next === result ? 0 : 0)); // 5 full spins each press
    setTimeout(() => {
      setBusy(false);
      setTally((t) => ({ ...t, [next]: t[next] + 1 }));
      beep(next === "H" ? 760 : 520, 0.12);
    }, 1100);
  };

  const rotation = flips * 360 + (result === "H" ? 0 : 180);

  return (
    <div className="p-6 text-center sm:p-8">
      <div className="coin-scene mx-auto grid h-40 w-40 place-items-center">
        <div
          className="coin h-40 w-40"
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          <div className="coin-face bg-gradient-to-br from-amber-300 to-amber-500 text-3xl font-bold text-amber-900 shadow-lg">
            앞
          </div>
          <div className="coin-back bg-gradient-to-br from-slate-300 to-slate-500 text-3xl font-bold text-slate-900 shadow-lg">
            뒤
          </div>
        </div>
      </div>

      <p className="mt-6 font-display text-2xl font-bold">
        {busy ? "…" : result === "H" ? "앞면" : "뒷면"}
      </p>

      <button onClick={flip} disabled={busy} className="btn btn-primary mt-5">
        <Coins size={18} />
        동전 던지기
      </button>

      <div className="mt-6 flex justify-center gap-3 text-sm text-muted">
        <span className="chip">앞 {tally.H}</span>
        <span className="chip">뒤 {tally.T}</span>
        <button
          onClick={() => setTally({ H: 0, T: 0 })}
          className="text-xs underline-offset-2 hover:underline"
        >
          기록 초기화
        </button>
      </div>
    </div>
  );
}
