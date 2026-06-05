import { useState } from "react";
import { ArrowUpRight, Trophy } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { cn } from "../lib/cn";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import ProjectModal from "./ProjectModal";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const featured = project.featured;
  return (
    <article
      className={cn(
        "bento group cursor-pointer overflow-hidden",
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : "flex flex-col"
      )}
      onClick={onOpen}
    >
      <div className={cn("relative overflow-hidden", featured ? "min-h-56" : "aspect-video")}>
        <img
          src={project.overview}
          alt={`${project.title} 미리보기`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
        {project.prize && (
          <span className="chip absolute left-4 top-4 text-amber-300">
            <Trophy size={14} />
            {project.prize}
          </span>
        )}
      </div>

      <div className={cn("flex flex-col p-6", featured && "justify-center md:p-8")}>
        <div className="flex items-center gap-2 text-xs text-muted">
          <span>{project.period}</span>
          <span className="h-1 w-1 rounded-full bg-muted/50" />
          <span>{project.role}</span>
        </div>
        <h3 className={cn("mt-2 font-bold", featured ? "text-3xl" : "text-xl")}>{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.subtitle}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.highlight.split(" · ").map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand transition-colors group-hover:text-accent">
          자세히 보기
          <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Projects"
          title={
            <>
              직접 만든 <span className="text-gradient">프로젝트</span>
            </>
          }
          description="SSAFY에서 진행한 팀 프로젝트들입니다. 각 카드를 눌러 상세 내용을 확인해 보세요."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={0.06 * i} className={cn(p.featured && "md:col-span-2")}>
              <ProjectCard project={p} onOpen={() => setSelected(p)} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
