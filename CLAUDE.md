# CLAUDE.md

정훈(Jeong Hoon)의 개인 포트폴리오 & 도구함(Toolbox), 그리고 블로그를 담은
정적 SPA. 이 문서는 Claude Code가 이 저장소에서 일관되게 작업하기 위한 가이드입니다.

## 프로젝트 개요

- **성격**: 백엔드 없는 **정적 SPA**. GitHub Pages **사용자 페이지**(`gnslalsl12.github.io`)로
  루트 도메인에 배포되므로 Vite `base`는 `/`.
- **라우트**
  - `/` — 포트폴리오 (Hero · About · Skills · Projects · Contact)
  - `/tools` — 도구함 14종 (전부 브라우저 로컬 저장, 설치 불필요)
  - `/blog` · `/blog/:slug` · `/blog/write` — 블로그 (목록 / 상세 / 작성 도우미)

## 기술 스택

| 영역 | 사용 |
| --- | --- |
| 빌드 | Vite 6 |
| 언어 | TypeScript (strict) |
| UI | React 18 · React Router v6 |
| 스타일 | Tailwind CSS v4 + CSS 디자인 토큰(`src/index.css` `@theme`) |
| 애니메이션 | Framer Motion |
| 아이콘 | lucide-react |
| 마크다운 | react-markdown · remark-gfm (블로그 렌더) |

## 명령어

```bash
npm install      # 의존성 설치 (SessionStart 훅이 웹에서 자동 실행)
npm run dev      # 개발 서버 http://localhost:5173
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
npm run typecheck# 타입 검사 (tsc --noEmit) — 이 프로젝트의 사실상 린트
npm run deploy   # dist 를 gh-pages 브랜치로 배포
```

> 별도의 ESLint/테스트 프레임워크는 없습니다. **변경 후 반드시 `npm run typecheck`로
> 검증**하세요. 가능하면 `npm run build`까지 통과시키는 것을 권장합니다.

## 디렉터리 구조

```
src/
  components/   공통 컴포넌트 (Navbar, Footer, Modal, Reveal, SectionHeader …)
  sections/     포트폴리오 섹션 (Hero, About, Skills, Projects, ProjectModal, Contact)
  pages/        라우트 단위 페이지 (Portfolio, Tools, Blog …)
  tools/        도구 14종 + registry
  content/blog/ 블로그 글 (.md, frontmatter 포함)
  data/         projects, skills 등 정적 데이터
  lib/          유틸 (cn, useLocalStorage, sound, scroll)
  assets/       이미지
```

## 컨벤션

- **별칭(import)**: `@/`는 `src/`를 가리킴 (`vite.config.ts` / `tsconfig.json`).
  단, 기존 파일들은 상대경로(`../`)를 주로 쓰므로 **주변 코드 스타일을 따를 것**.
- **스타일**: 색상·포인트 컬러는 하드코딩하지 말고 `src/index.css`의 CSS 토큰
  (`--color-brand` 등)과 재사용 클래스(`.btn`, `.chip`, `.bento`, `.glass`,
  `.section`, `.container-x`, `.text-gradient` …)를 활용.
- **애니메이션**: 스크롤 진입 효과는 `components/Reveal.tsx`를 재사용.
  `prefers-reduced-motion`을 존중할 것.
- **언어**: UI 카피는 한국어가 기본. 코드 주석/식별자는 영어.

## 블로그 (Markdown 방식)

- 글은 `src/content/blog/*.md`. 상단에 frontmatter:
  ```md
  ---
  title: 제목
  date: 2026-06-08
  tags: [react, vite]
  excerpt: 한 줄 요약
  ---
  본문(마크다운)…
  ```
- `import.meta.glob(..., { query: '?raw', eager: true })`로 빌드 시 로드.
- `/blog/write`는 정적 사이트 특성상 **작성 도우미**: 입력 → 미리보기 →
  완성된 `.md` 내용/파일명 생성 → 사용자가 `src/content/blog/`에 커밋하여 게시.

## 배포 주의

- 사용자 페이지라 `base: "/"`. 새로고침 시 클라이언트 라우트가 동작하도록
  `public/404.html` SPA 리다이렉트 기법이 적용되어 있음 — 라우트 추가 시 영향 없음.

## SessionStart 훅

`.claude/hooks/session-start.sh` — 웹 세션 시작 시 `npm install`을 자동 실행해
의존성 없는 새 컨테이너에서도 즉시 작업 가능하게 함. `.claude/settings.json`에 등록됨.
