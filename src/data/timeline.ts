// Career / education / project timeline shown on the portfolio. Ordered most
// recent first. Edit freely — dates and copy are plain data.

export type TimelineKind = "work" | "education" | "award" | "project";

export type TimelineEntry = {
  period: string; // free-form, e.g. "2024.05 ~ 현재"
  title: string;
  org?: string;
  kind: TimelineKind;
  description?: string;
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    period: "2024.05 ~ 현재",
    title: "하나금융티아이 · AI솔루션셀",
    org: "재직 중",
    kind: "work",
    description: "AI 솔루션 개발·운영. 사용자 관점에서 문제를 정의하고 완성도 높은 결과물을 만듭니다.",
    tags: ["Frontend", "AI Solution"],
  },
  {
    period: "진행 중",
    title: "Famring",
    org: "개인 프로젝트 · 운영 중",
    kind: "project",
    description: "가족 단위로 계정·일정·정보를 안전하게 공유하는 모바일 PWA를 1인 풀스택으로 기획·개발·운영.",
    tags: ["PWA", "풀스택", "보안 설계"],
  },
  {
    period: "2023.06",
    title: "SSAFY 8기 수료",
    org: "삼성 청년 SW 아카데미",
    kind: "education",
    description: "1년간 알고리즘·웹·프로젝트 중심의 집중 교육 과정 이수.",
    tags: ["Frontend", "Algorithm"],
  },
  {
    period: "2023.04 ~ 05",
    title: "WORLDY — SSAFY 자율 PJT",
    org: "프론트엔드 리더 · 우수상",
    kind: "award",
    description: "AI 기술을 활용한 3D 메타버스 세계 지식 학습 게임. 자율 프로젝트 우수상 수상.",
    tags: ["React", "Three.js", "리더"],
  },
  {
    period: "2023.02 ~ 04",
    title: "이음",
    org: "특화 프로젝트",
    kind: "project",
    description: "빅데이터 분산 기술을 활용한 '자립 준비 청년' 사회적 지원 서비스.",
    tags: ["React", "Big Data"],
  },
  {
    period: "2023.01 ~ 02",
    title: "Rendez-Boo",
    org: "공통 프로젝트",
    kind: "project",
    description: "WebRTC 기술을 활용한 블라인드 미팅 플랫폼.",
    tags: ["React", "WebRTC"],
  },
  {
    period: "2022.07",
    title: "SSAFY 8기 시작",
    org: "삼성 청년 SW 아카데미",
    kind: "education",
    description: "SW 개발자로서의 여정을 본격적으로 시작.",
  },
];
