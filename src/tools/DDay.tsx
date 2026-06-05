import { useState } from "react";
import { CalendarPlus, Trash2 } from "lucide-react";
import { useLocalStorage } from "../lib/useLocalStorage";

type Event = { id: number; name: string; date: string };

function dday(dateStr: string): { label: string; sub: string } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return { label: "D-DAY", sub: "오늘" };
  if (diff > 0) return { label: `D-${diff}`, sub: `${diff}일 남음` };
  return { label: `D+${-diff}`, sub: `${-diff}일 지남` };
}

export default function DDay() {
  const [events, setEvents] = useLocalStorage<Event[]>("tool.dday", [
    { id: 1, name: "새해", date: `${new Date().getFullYear() + 1}-01-01` },
  ]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const add = () => {
    if (!name.trim() || !date) return;
    setEvents((ev) => [...ev, { id: Date.now(), name: name.trim(), date }]);
    setName("");
    setDate("");
  };
  const remove = (id: number) => setEvents((ev) => ev.filter((e) => e.id !== id));

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <label className="flex-1 text-xs text-muted">
          이름
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 출시일, 생일"
            className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none focus:border-brand"
          />
        </label>
        <label className="text-xs text-muted">
          날짜
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-text outline-none focus:border-brand [color-scheme:dark]"
          />
        </label>
        <button onClick={add} className="btn btn-primary">
          <CalendarPlus size={16} />
          추가
        </button>
      </div>

      <ul className="mt-5 space-y-3">
        {sorted.map((e) => {
          const d = dday(e.date);
          return (
            <li
              key={e.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{e.name}</p>
                <p className="text-xs text-muted">
                  {e.date} · {d.sub}
                </p>
              </div>
              <span className="font-display text-2xl font-bold text-gradient">{d.label}</span>
              <button
                onClick={() => remove(e.id)}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted hover:text-rose-400"
                aria-label="삭제"
              >
                <Trash2 size={16} />
              </button>
            </li>
          );
        })}
        {sorted.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">기념일이나 마감일을 추가해 보세요.</p>
        )}
      </ul>
    </div>
  );
}
