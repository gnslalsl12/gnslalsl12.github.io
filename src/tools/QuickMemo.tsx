import { useState } from "react";
import { Check, Copy, Eraser } from "lucide-react";
import { useLocalStorage } from "../lib/useLocalStorage";

export default function QuickMemo() {
  const [text, setText] = useLocalStorage<string>("tool.memo", "");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;

  return (
    <div className="p-6 sm:p-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 메모하세요. 자동으로 저장됩니다."
        rows={10}
        className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-text outline-none focus:border-brand"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 text-xs text-muted">
          <span className="chip">{chars}자</span>
          <span className="chip">{words}단어</span>
          <span className="chip">{lines}줄</span>
        </div>
        <div className="flex gap-2">
          <button onClick={copy} className="btn btn-ghost">
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? "복사됨" : "복사"}
          </button>
          <button
            onClick={() => setText("")}
            className="btn btn-ghost text-muted hover:text-rose-400"
          >
            <Eraser size={16} />
            지우기
          </button>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400/80">
        <Check size={13} /> 브라우저에 자동 저장됨
      </p>
    </div>
  );
}
