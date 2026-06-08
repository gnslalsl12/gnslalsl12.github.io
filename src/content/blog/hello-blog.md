---
title: 블로그를 시작합니다
date: 2026-06-08
tags: [회고, 블로그]
excerpt: 포트폴리오 사이트에 블로그를 붙였습니다. 어떻게 만들었는지, 앞으로 무엇을 쓸지 적어봅니다.
---

## 왜 블로그인가

개발하면서 배운 것들을 정리할 공간이 필요했습니다. 따로 플랫폼을 쓰기보다는
이미 운영 중인 포트폴리오 사이트에 직접 붙이기로 했습니다.

## 어떻게 만들었나

이 사이트는 **백엔드가 없는 정적 SPA**(React + Vite, GitHub Pages 배포)라
서버나 데이터베이스가 없습니다. 그래서 글을 **마크다운 파일**로 저장합니다.

- 글은 `src/content/blog/*.md` 에 둡니다.
- 빌드 시 Vite 의 `import.meta.glob` 으로 한 번에 불러옵니다.
- 본문은 `react-markdown` + `remark-gfm` 으로 렌더링합니다.

```ts
const modules = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
```

## GFM 지원

표, 체크리스트, 코드 블록 같은 GitHub-Flavored Markdown 문법을 그대로 씁니다.

| 기능 | 지원 |
| --- | --- |
| 표 | ✅ |
| 체크리스트 | ✅ |
| 코드 블록 | ✅ |

- [x] 목록 페이지
- [x] 상세 페이지
- [x] 작성 도우미

## 앞으로

프론트엔드 작업 노트, 프로젝트 회고, 그리고 자잘한 트러블슈팅을 기록할
예정입니다. 천천히, 그러나 꾸준히 채워보겠습니다.
