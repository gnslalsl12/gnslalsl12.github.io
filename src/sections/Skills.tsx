import { skillGroups } from "../data/skills";
import { cn } from "../lib/cn";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const SPAN = ["md:col-span-3", "md:col-span-2", "md:col-span-1"];

export default function Skills() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          title={
            <>
              주로 다루는 <span className="text-gradient">기술 스택</span>
            </>
          }
          description="프론트엔드를 중심으로, 제품을 끝까지 완성하는 데 필요한 백엔드·협업 도구까지 폭넓게 다룹니다."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={0.06 * gi} className={cn(SPAN[gi] ?? "")}>
              <article className="bento h-full p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{group.label}</h3>
                  <span className="text-xs text-muted">{group.items.length}</span>
                </div>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((skill) => (
                    <li key={skill.name} className="group relative">
                      <div className="grid h-14 w-14 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:ring-brand/40">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          loading="lazy"
                          className="h-7 w-7 object-contain"
                        />
                      </div>
                      <span className="chip pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 scale-90 whitespace-nowrap text-text opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
