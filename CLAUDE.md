# CLAUDE.md

정훈(Jeong Hoon)의 개인 포트폴리오 & 도구함(Toolbox), 그리고 블로그를 담은
정적 SPA. 이 문서는 Claude Code가 이 저장소에서 일관되게 작업하기 위한 가이드입니다.

## 프로젝트 개요

- **성격**: 백엔드 없는 **정적 SPA**. GitHub Pages **사용자 페이지**(`gnslalsl12.github.io`)로
  루트 도메인에 배포되므로 Vite `base`는 `/`.
- **라우트**
  - `/` — 포트폴리오 (Hero · About · Skills · Projects · Contact)
  - `/tools` — 도구함 14종 (전부 브라우저 로컬 저장, 설치 불필요)
  - `/blog` · `/blog/:number` · `/blog/write` — 블로그 (목록 / 상세 / 작성·게시, GitHub Issues 기반)
  - `/archive` · `/archive/upload` — 문서 아카이브 (standalone HTML 문서 허브 / 업로드)

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

## 블로그 (GitHub Issues 방식)

- 백엔드가 없으므로 글은 이 저장소의 **GitHub 이슈**(`blog` 라벨)로 저장됨.
- 사이트는 **런타임에 GitHub REST API로 이슈를 읽어** 렌더링 → 재빌드 없이 즉시 반영.
  공개 저장소 읽기는 인증 불필요(비로그인 60req/시간/IP, 60초 메모리 캐시 적용).
- 메타데이터: 제목=이슈 title, 날짜=created_at, 태그=본문 맨 위
  `<!-- tags: a, b -->` 주석(렌더 시 제거), 발췌=본문 앞부분 자동 생성, slug=이슈 번호.
- 라우트: `/blog`(목록) · `/blog/:number`(상세) · `/blog/write`(작성·게시).
- `/blog/write`는 **실제 게시**: 사용자 GitHub 토큰(localStorage에만 저장, `public_repo`
  권한)으로 GitHub Issues API에 이슈를 생성 → 즉시 게시.
- 핵심 로직은 `src/lib/blog.ts` (`fetchPosts`/`fetchPost`/`createPost`, 토큰 저장).
- 본문 렌더는 `react-markdown` + `remark-gfm`, 스타일은 `index.css`의 `.markdown`.

## 문서 아카이브 (Archive)

- Claude로 만든 **완성된 HTML 문서**를 그대로 한 페이지로 보여주는 허브.
- 문서는 **실제 정적 파일** `public/docs/<category>/<slug>.html` 로 저장되어
  `/docs/<category>/<slug>.html` 로 직접 서빙됨(원본 스타일·스크립트 그대로).
  > ⚠️ 정적 파일은 일부러 `archive/`가 아닌 **`docs/`** 네임스페이스에 둠. SPA가
  > `/archive`·`/archive/upload` 라우트를 소유하는데, 정적 파일이 같은 접두사를
  > 쓰면 GitHub Pages가 `/archive/`를 실제 디렉터리로 처리해 새로고침 시 SPA 폴백
  > 대신 디렉터리 내용을 내보내는 충돌이 생김. `docs/`로 분리해 회피.
- 목록은 매니페스트 `public/docs/index.json`(`docs[]`: slug·title·category·
  description·path·date)로 관리. 허브(`/archive`)가 런타임에 읽어 카테고리별로 묶어 표시.
- 카테고리 정의는 `src/lib/archive.ts`의 `CATEGORIES`(id↔라벨).
- `/archive/upload`는 **소유자 전용 자가 업로드**: HTML 파일 선택 → 토큰으로
  `main`에 HTML + 매니페스트를 **한 커밋**(Git Data API)으로 푸시 → GitHub Actions가
  자동 빌드·배포(`.github/workflows/deploy.yml`) → 1~2분 뒤 반영.
- 허브(`/archive`)에서 **소유자만** 각 카드의 삭제 버튼으로 문서 삭제 가능(파일+매니페스트
  한 커밋 제거 → 재배포). 핵심 로직 `src/lib/archive.ts`
  (`fetchDocs`/`publishDoc`/`deleteDoc`/`commitFiles`).
  토큰·소유자 검증은 블로그와 동일(`blog.ts`의 `getToken`/`verifyToken`/`isAllowedAuthor` 재사용).

## 배포 주의

- 사용자 페이지라 `base: "/"`. 새로고침 시 클라이언트 라우트가 동작하도록
  `public/404.html` SPA 리다이렉트 기법이 적용되어 있음 — 라우트 추가 시 영향 없음.
- **자동 배포**: `main`에 푸시되면 `.github/workflows/deploy.yml`이 빌드 후 `gh-pages`로
  배포함. 따라서 평소엔 수동 `npm run deploy` 불필요(둘 다 gh-pages 브랜치를 서빙).
  로컬에서 즉시 배포하고 싶을 때만 `npm run deploy` 사용.

## SessionStart 훅

`.claude/hooks/session-start.sh` — 웹 세션 시작 시 `npm install`을 자동 실행해
의존성 없는 새 컨테이너에서도 즉시 작업 가능하게 함. `.claude/settings.json`에 등록됨.
