import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";

export default function QrGenerator() {
  const [text, setText] = useState("https://gnslalsl12.github.io");
  const [fg, setFg] = useState("#0a0a0f");
  const wrapRef = useRef<HTMLDivElement>(null);

  const download = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
      <div className="flex flex-col items-center">
        <div ref={wrapRef} className="rounded-2xl bg-white p-4">
          {text ? (
            <QRCodeCanvas value={text} size={200} fgColor={fg} bgColor="#ffffff" level="M" marginSize={2} />
          ) : (
            <div className="grid h-[232px] w-[232px] place-items-center text-sm text-slate-400">
              내용을 입력하세요
            </div>
          )}
        </div>
        <button onClick={download} disabled={!text} className="btn btn-primary mt-4">
          <Download size={16} />
          PNG 저장
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm text-muted">
          내용 (URL · 텍스트)
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-text outline-none focus:border-brand"
          />
        </label>
        <label className="flex items-center justify-between text-sm text-muted">
          QR 색상
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            className="h-9 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent"
          />
        </label>
        <p className="text-xs text-muted">
          연락처, 와이파이, 링크 공유 등에 활용하세요. 입력 즉시 QR이 갱신됩니다.
        </p>
      </div>
    </div>
  );
}
