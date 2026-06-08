# gnslalsl12.github.io

정훈(Jeong Hoon)의 개인 포트폴리오 & 도구함. **Bento / Glassmorphism** 다크 테마로 디자인했습니다.

🔗 **Live:** https://gnslalsl12.github.io

## ✨ 구성

- **`/` 포트폴리오** — Hero · About · Skills · Projects(상세 모달) · Contact
- **`/tools` 도구함** — 보드게임·타이머·유틸리티 도구 모음 (전부 브라우저 로컬 저장, 설치 불필요)
  - 🎲 보드게임: 보드게임 타이머, 점수 카운터, 주사위 & 랜덤, 사다리타기, 룰렛, 동전 던지기
  - ⏱️ 타이머: 뽀모도로, 멀티 타이머, 스톱워치, D-day
  - 🛠️ 유틸리티: QR 코드 생성, 빠른 메모, 컬러 팔레트, 단위 변환기
- **`/blog` 블로그** — 글 목록(`/blog`)·상세(`/blog/:number`)·작성/게시(`/blog/write`)
  - 백엔드가 없어 글은 **GitHub 이슈**(`blog` 라벨)로 저장되고, 런타임에 GitHub API로
    읽어 렌더링합니다. `/blog/write` 에서 본인 토큰으로 게시하면 **즉시** 반영됩니다.

## 🧰 기술 스택

| 영역 | 사용 |
| --- | --- |
| 빌드 | Vite 6 |
| 언어 | TypeScript |
| UI | React 18 · React Router |
| 스타일 | Tailwind CSS v4 + CSS 디자인 토큰 |
| 애니메이션 | Framer Motion |
| 아이콘 | lucide-react |
| 기타 | qrcode.react |

## 🚀 개발

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
npm run typecheck# 타입 검사
```

## 📦 배포 (GitHub Pages)

```bash
npm run deploy   # dist 를 gh-pages 브랜치로 배포
```

`gnslalsl12.github.io` 는 사용자 페이지(루트 도메인)라 Vite `base` 는 `/` 입니다.
새로고침 시에도 `/tools` 등 클라이언트 라우트가 동작하도록 `public/404.html`
SPA 리다이렉트 기법을 적용했습니다.

## 🎨 테마 색상

메인 컬러는 CSS 토큰(`src/index.css` 의 `@theme`)으로 관리합니다.
`--color-brand` 값만 바꾸면 사이트 전체 포인트 컬러가 교체됩니다.

```
--color-brand:   #8b5cf6   /* violet */
--color-brand-2: #6366f1   /* indigo */
--color-brand-3: #3b82f6   /* blue   */
--color-accent:  #d946ef   /* fuchsia */
```

## 📁 구조

```
src/
  components/   공통 컴포넌트 (Navbar, Footer, Modal, Reveal …)
  sections/     포트폴리오 섹션 (Hero, About, Skills, Projects …)
  pages/        Portfolio, Tools 라우트
  tools/        도구 14종 + registry
  data/         projects, skills 데이터
  lib/          유틸 (cn, localStorage, sound, scroll)
  assets/       이미지
```
