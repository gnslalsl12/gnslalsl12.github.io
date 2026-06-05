import { Lightbulb, Feather, Rocket, MonitorSmartphone, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import profileImage from "../assets/images/profileImage.jpg";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

type Value = { title: string; icon: LucideIcon; desc: string };

const VALUES: Value[] = [
  { title: "Intuitive", icon: Lightbulb, desc: "직관적인 UI/UX를 구상해 빠르고 쉬운 사용 환경을 제공합니다." },
  { title: "Efficiency", icon: Feather, desc: "효율적인 프로그래밍으로 최적의 상호작용을 추구합니다." },
  { title: "Dynamic", icon: Rocket, desc: "다양한 애니메이션과 동적 반응으로 페이지에 생동감을 더합니다." },
  { title: "Responsive", icon: MonitorSmartphone, desc: "최고의 사용 경험을 위해 반응형 페이지를 구현합니다." },
];

export default function About() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="About"
          title={
            <>
              사용자를 위한 <span className="text-gradient">개발</span>을 합니다
            </>
          }
          description="사용자 중심의 개발 방향성을 바탕으로 다양한 컴포넌트 구현, 효율적인 데이터 처리, 직관적인 사용 환경 구성에 깊은 열정을 가지고 있습니다."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Profile card */}
          <Reveal className="md:col-span-1 md:row-span-2">
            <article className="bento flex h-full flex-col p-6">
              <div className="relative mx-auto aspect-square w-40 overflow-hidden rounded-2xl ring-1 ring-white/10 md:w-full">
                <img
                  src={profileImage}
                  alt="정훈 프로필"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/70 to-transparent" />
              </div>
              <div className="mt-5">
                <h3 className="text-2xl font-bold">
                  SW 개발자 <span className="text-gradient">정훈</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  새로운 기술을 빠르게 흡수하고, 사용자 관점에서 문제를 정의하며,
                  팀과 함께 완성도 높은 결과물을 만드는 것을 즐깁니다.
                </p>
              </div>

              {/* Current role */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-brand/15 to-brand-2/10 p-4 ring-1 ring-white/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <Briefcase size={18} className="text-brand" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">하나금융티아이 · AI솔루션셀</p>
                  <p className="text-xs text-muted">2024.05 ~ 현재 · 재직 중</p>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                <span className="chip">SSAFY 8기</span>
                <span className="chip">Frontend</span>
                <span className="chip">UI/UX</span>
              </div>
            </article>
          </Reveal>

          {/* Value cards */}
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={0.05 * (i + 1)}>
              <article className="bento group flex h-full flex-col p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <v.icon size={20} className="text-brand" />
                </div>
                <h4 className="mt-4 text-lg font-semibold">{v.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
