import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "../lib/cn";

type Cat = "length" | "weight" | "temp";

const UNITS: Record<Exclude<Cat, "temp">, Record<string, number>> = {
  // base: meter
  length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144, mile: 1609.344 },
  // base: gram
  weight: { mg: 0.001, g: 1, kg: 1000, t: 1_000_000, oz: 28.3495, lb: 453.592 },
};
const TEMP_UNITS = ["°C", "°F", "K"];

function toCelsius(v: number, unit: string) {
  if (unit === "°F") return ((v - 32) * 5) / 9;
  if (unit === "K") return v - 273.15;
  return v;
}
function fromCelsius(c: number, unit: string) {
  if (unit === "°F") return (c * 9) / 5 + 32;
  if (unit === "K") return c + 273.15;
  return c;
}

const CATS: { id: Cat; label: string }[] = [
  { id: "length", label: "길이" },
  { id: "weight", label: "무게" },
  { id: "temp", label: "온도" },
];

export default function UnitConverter() {
  const [cat, setCat] = useState<Cat>("length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("cm");

  const onCat = (c: Cat) => {
    setCat(c);
    if (c === "length") {
      setFrom("m");
      setTo("cm");
    } else if (c === "weight") {
      setFrom("kg");
      setTo("g");
    } else {
      setFrom("°C");
      setTo("°F");
    }
  };

  const units = cat === "temp" ? TEMP_UNITS : Object.keys(UNITS[cat]);
  const num = parseFloat(value);
  let result = "—";
  if (!Number.isNaN(num)) {
    if (cat === "temp") {
      result = String(Math.round(fromCelsius(toCelsius(num, from), to) * 1000) / 1000);
    } else {
      const table = UNITS[cat];
      result = String(Math.round(((num * table[from]) / table[to]) * 100000) / 100000);
    }
  }

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex gap-1 rounded-xl bg-white/5 p-1">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => onCat(c.id)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              cat === c.id ? "bg-brand text-white" : "text-muted hover:text-text"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <div>
          <label className="text-xs text-muted">값</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-lg outline-none focus:border-brand"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <button onClick={swap} className="btn btn-ghost mb-1 p-3" aria-label="단위 교체">
          <ArrowLeftRight size={18} />
        </button>

        <div>
          <label className="text-xs text-muted">결과</label>
          <div className="mt-1 truncate rounded-xl border border-brand/30 bg-brand/10 px-3 py-3 font-display text-lg font-bold text-gradient">
            {result}
          </div>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-surface px-3 py-2 text-sm outline-none focus:border-brand"
          >
            {units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
