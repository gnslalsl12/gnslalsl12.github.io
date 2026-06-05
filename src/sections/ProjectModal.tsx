import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Github, Trophy, Users, CalendarDays, UserCircle2 } from "lucide-react";
import Modal from "../components/Modal";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project?.id]);

  const gallery = project?.gallery ?? [];
  const move = (dir: number) => {
    if (gallery.length === 0) return;
    setIndex((i) => (i + dir + gallery.length) % gallery.length);
  };

  return (
    <Modal open={!!project} onClose={onClose} className="max-w-4xl">
      {project && (
        <div>
          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-black/40">
              <img
                src={gallery[index]}
                alt={`${project.title} 스크린샷 ${index + 1}`}
                className="h-full w-full object-contain"
              />
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => move(-1)}
                    className="btn btn-ghost absolute left-3 top-1/2 -translate-y-1/2 p-2"
                    aria-label="이전 이미지"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => move(1)}
                    className="btn btn-ghost absolute right-3 top-1/2 -translate-y-1/2 p-2"
                    aria-label="다음 이미지"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        aria-label={`${i + 1}번 이미지`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === index ? "w-5 bg-brand" : "w-1.5 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {project.prize && (
                  <span className="chip mb-3 text-amber-300">
                    <Trophy size={14} />
                    {project.prize}
                  </span>
                )}
                <h3 className="text-3xl font-bold">{project.title}</h3>
                <p className="mt-2 text-muted">{project.subtitle}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>

            {/* Meta */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip"><CalendarDays size={14} />{project.period}</span>
              <span className="chip"><UserCircle2 size={14} />{project.role}</span>
              <span className="chip"><Users size={14} />{project.team}</span>
            </div>

            <p className="mt-6 leading-relaxed text-text/90">{project.description}</p>

            {/* Works */}
            <div className="mt-8">
              <h4 className="eyebrow">담당 역할</h4>
              <ul className="mt-3 space-y-2">
                {project.works.map((w, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gains */}
            <div className="mt-8">
              <h4 className="eyebrow">성과 & 배움</h4>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {project.gains.map((g, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-sm font-semibold text-text">{g.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{g.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h4 className="eyebrow">사용 기술</h4>
              <div className="mt-3 space-y-3">
                {project.skills.map((s) => (
                  <div key={s.group} className="flex flex-wrap items-center gap-2">
                    <span className="w-20 shrink-0 text-xs font-semibold text-muted">{s.group}</span>
                    {s.items.map((item) => (
                      <span key={item} className="chip">{item}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
