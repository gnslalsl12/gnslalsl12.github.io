import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, Github, Mail, Code2, ArrowUpRight, LayoutGrid } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const EMAIL = "wjdgnsxhsl@naver.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="section pb-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Contact"
          align="center"
          title={
            <>
              함께 <span className="text-gradient">만들어요</span>
            </>
          }
          description="새로운 기회나 협업 제안은 언제든 환영합니다. 편하게 연락 주세요."
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Reveal className="sm:col-span-2">
            <button
              onClick={copyEmail}
              className="bento group flex w-full items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/20 ring-1 ring-white/10">
                  <Mail size={22} className="text-brand" />
                </span>
                <div>
                  <p className="text-xs text-muted">Email</p>
                  <p className="font-semibold">{EMAIL}</p>
                </div>
              </div>
              <span className="chip">
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "복사됨" : "복사"}
              </span>
            </button>
          </Reveal>

          <Reveal delay={0.05}>
            <a
              href="https://github.com/gnslalsl12"
              target="_blank"
              rel="noopener noreferrer"
              className="bento group flex h-full items-center gap-4 p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Github size={22} />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted">GitHub</p>
                <p className="font-semibold">gnslalsl12</p>
              </div>
              <ArrowUpRight size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="https://solved.ac/profile/wjdgnsxhsl"
              target="_blank"
              rel="noopener noreferrer"
              className="bento group flex h-full items-center gap-4 p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <Code2 size={22} />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted">Baekjoon · solved.ac</p>
                <p className="font-semibold">wjdgnsxhsl</p>
              </div>
              <ArrowUpRight size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          <Reveal delay={0.15} className="sm:col-span-2">
            <Link
              to="/tools"
              className="bento group flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-accent/30 to-brand/20 ring-1 ring-white/10">
                  <LayoutGrid size={22} className="text-accent" />
                </span>
                <div>
                  <p className="text-xs text-muted">개인 도구함</p>
                  <p className="font-semibold">보드게임 타이머 · 카운터 · 유틸리티 모음</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
