import { Briefcase, GraduationCap, Trophy, FolderGit2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { timeline, type TimelineKind } from "../data/timeline";

const KIND_META: Record<TimelineKind, { icon: LucideIcon; tint: string }> = {
  work: { icon: Briefcase, tint: "text-brand" },
  education: { icon: GraduationCap, tint: "text-brand-3" },
  award: { icon: Trophy, tint: "text-amber-300" },
  project: { icon: FolderGit2, tint: "text-accent" },
};

export default function Timeline() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Journey"
          title={
            <>
              걸어온 <span className="text-gradient">길</span>
            </>
          }
          description="교육부터 프로젝트, 그리고 현재까지 — 개발자로 성장해 온 발자취입니다."
        />

        <div className="mt-12 max-w-3xl">
          <ol className="relative border-l border-white/10 pl-6 sm:pl-8">
            {timeline.map((entry, i) => {
              const meta = KIND_META[entry.kind];
              const Icon = meta.icon;
              return (
                <li key={`${entry.title}-${i}`} className="relative pb-10 last:pb-0">
                  {/* node on the rail */}
                  <span className="absolute -left-[2.1rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-surface ring-1 ring-white/10 sm:-left-[2.85rem]">
                    <Icon size={16} className={meta.tint} />
                  </span>

                  <Reveal y={16} delay={0.04 * i}>
                    <article className="bento p-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                          {entry.period}
                        </span>
                        {entry.org && (
                          <span className="text-xs text-muted">· {entry.org}</span>
                        )}
                      </div>
                      <h3 className="mt-1.5 text-lg font-semibold">{entry.title}</h3>
                      {entry.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {entry.description}
                        </p>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.tags.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
