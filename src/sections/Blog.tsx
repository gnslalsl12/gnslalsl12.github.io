import { ArrowUpRight, BookOpen } from "lucide-react";
import blogAlgorithm from "../assets/images/blog/blog_algorithm.jpg";
import blogSolved from "../assets/images/blog/blog_solved.jpg";
import blogCs from "../assets/images/blog/blog_cs.jpg";
import blogLanguages from "../assets/images/blog/blog_languages.jpg";
import blogAvatar from "../assets/images/blog/notion_avatar_trans.png";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const BLOG_URL = "https://hoonyblog.vercel.app/";

const CATEGORIES = [
  { title: "Algorithm", category: "📚Algorithm", image: blogAlgorithm, desc: "Boyer-Moore, KMP, Dijkstra 등 알고리즘 학습 정리" },
  { title: "Solved", category: "📈SolvedAlgos", image: blogSolved, desc: "백준 골드~다이아 및 타 사이트 문제 풀이 기록" },
  { title: "CS", category: "🤖ComputerScience", image: blogCs, desc: "CS · Front-End · React 등 지식 정리" },
  { title: "Languages", category: "🌐Languages", image: blogLanguages, desc: "Java, JS, HTML, CSS, MySQL 활용 팁" },
];

export default function Blog() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Blog"
          title={
            <>
              배운 것을 <span className="text-gradient">기록</span>합니다
            </>
          }
          description="꾸준히 학습한 내용을 정리하는 개인 기술 블로그입니다."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* CTA card */}
          <Reveal className="md:row-span-2">
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bento group flex h-full flex-col justify-between overflow-hidden p-7"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand/30 to-brand-2/20 ring-1 ring-white/10">
                  <BookOpen size={22} className="text-brand" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">Hoony Blog</h3>
                <p className="mt-2 text-sm text-muted">
                  알고리즘, CS, 언어별 학습 노트를 카테고리로 정리해 둔 공간입니다.
                </p>
              </div>
              <img src={blogAvatar} alt="" className="animate-float mx-auto my-4 h-24 w-24 object-contain" />
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:text-accent">
                블로그 방문하기
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>

          {/* Category cards */}
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.title} delay={0.05 * (i + 1)}>
              <a
                href={`${BLOG_URL}?category=${c.category}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bento group flex h-full overflow-hidden"
              >
                <div className="relative w-28 shrink-0 overflow-hidden sm:w-32">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg/60" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <h4 className="font-semibold">{c.title}</h4>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">{c.desc}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
