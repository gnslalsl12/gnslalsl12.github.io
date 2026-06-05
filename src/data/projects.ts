import worldyOverview from "../assets/images/projects/Worldy_Overview.png";
import eeumOverview from "../assets/images/projects/Eeum_Overview.png";
import rendezOverview from "../assets/images/projects/Rendez_Overview.png";

export type ProjectGain = { title: string; detail: string };
export type ProjectSkillGroup = { group: string; items: string[] };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  role: string;
  team: string;
  prize?: string;
  link: string;
  overview: string;
  gallery: string[];
  highlight: string;
  works: string[];
  gains: ProjectGain[];
  skills: ProjectSkillGroup[];
  featured?: boolean;
};

/** Turn a Vite glob record into a numerically-sorted list of image URLs. */
function gallery(globResult: Record<string, string>): string[] {
  return Object.entries(globResult)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}

const worldyGallery = gallery(
  import.meta.glob("../assets/images/projects/projectWorldy/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);
const eeumGallery = gallery(
  import.meta.glob("../assets/images/projects/projectEeum/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);
const rendezGallery = gallery(
  import.meta.glob("../assets/images/projects/projectRendez/*.png", {
    eager: true,
    import: "default",
  }) as Record<string, string>
);

export const projects: Project[] = [
  {
    id: "worldy",
    title: "WORLDY",
    subtitle: "AI 기술을 활용한 3D 메타버스 세계 지식 학습 게임",
    description:
      "AI기반의 세계 상식 퀴즈 게임과 3D 메타버스로 구현된 세계 탐험 및 블루마블 게임을 통해 남녀노소 누구나 재미있게 세계를 배우는 게임, Worldy입니다.",
    period: "2023.04.10 ~ 2023.05.26",
    role: "프론트엔드 리더",
    team: "FE 3 · BE 3",
    prize: "SSAFY PJT 우수상",
    link: "https://github.com/SSAFY507/Worldy",
    overview: worldyOverview,
    gallery: worldyGallery,
    highlight: "React · Three.js · AI",
    featured: true,
    works: [
      "서비스 UI/UX 디자인 및 구현",
      "상식 퀴즈 게임, 틀린 그림 찾기 게임 구현 및 페이지 구성",
      "마이 페이지, 게임 랭킹 시스템, 개발자를 위한 OpenAI 기능 페이지 구현",
      "기부 및 결제 시스템 구현",
      "Blender와 Three.js를 활용한 3D 메타버스 환경, 3D 블루마블 페이지 구현",
    ],
    gains: [
      {
        title: "개발 서비스 구현 역량 강화",
        detail:
          "복잡한 게임 알고리즘과 시간제한 기능, 랭킹 시스템 기능 등의 구현을 통해 코딩 구현 역량 강화",
      },
      {
        title: "가독성·재사용성 높은 코딩 역량",
        detail:
          "Redux와 Axios 기능을 커스텀하여 재사용성을 높이고, 코드 검수 및 코딩 스타일 획일화를 통해 가독성과 재사용성 높은 코딩 스타일 구축",
      },
      {
        title: "사용자 최우선의 개발 경험",
        detail:
          "사용 환경을 고려한 튜토리얼 기능, 퀴즈 스크랩 기능 등을 구성한 사용자 최우선의 개발 경험 획득",
      },
    ],
    skills: [
      {
        group: "Front-End",
        items: ["JavaScript", "HTML", "CSS", "React", "Redux", "TypeScript", "Three.js", "Tailwind"],
      },
      { group: "Back-End", items: ["JAVA", "MySQL", "OpenAPI", "ElasticSearch"] },
      { group: "Etc", items: ["GitLab", "JIRA", "Blender", "MatterMost"] },
    ],
  },
  {
    id: "eeum",
    title: "이음",
    subtitle: "빅데이터 분산 기술을 활용한 '자립 준비 청년' 사회적 지원 서비스",
    description:
      "보육원 보호가 종료된 자립 준비 청년들의 정서적 & 경제적 자립을 지원함으로써 그들이 사회로 이어지는 데에 더욱 튼튼한 연결 고리가 되어주는 서비스, 이음입니다.",
    period: "2023.02.20 ~ 2023.04.07",
    role: "프론트엔드",
    team: "FE 3 · BE 3",
    link: "https://github.com/IEUM-Team/IEUM",
    overview: eeumOverview,
    gallery: eeumGallery,
    highlight: "React Native · Recoil",
    works: [
      "서비스 UI/UX 디자인 및 구현",
      "메인 기능 페이지 및 3D 애니메이션 구현",
      "고민 메시지 작성 기능 및 랜덤 전송 알고리즘 구현",
      "전체 페이지 개요 구성 및 이동 알고리즘 구현",
      "Blender를 활용한 메인 기능 3D 시각화 및 애니메이션 제작",
    ],
    gains: [
      {
        title: "다양한 사용환경의 개발 역량",
        detail: "모바일 서비스 프로젝트를 수행하며 여러 사용 환경에서의 개발 역량 강화",
      },
      {
        title: "가독성·재사용성 높은 코딩 역량",
        detail:
          "Recoil과 Axios 기능을 커스텀하여 재사용성을 높이고, 코드 검수 및 코딩 스타일 획일화를 통해 가독성과 재사용성 높은 코딩 스타일 구축",
      },
      {
        title: "다양한 배경의 사용자를 위한 개발",
        detail:
          "다양한 배경의 사용자들을 고려한 프로젝트 성격에 맞게 직관적인 UI/UX 및 페이지 디자인 구현",
      },
    ],
    skills: [
      {
        group: "Front-End",
        items: ["JavaScript", "HTML", "CSS", "React Native", "Recoil", "TypeScript", "Styled-Components"],
      },
      { group: "Back-End", items: ["JAVA", "MySQL", "Python", "Flask", "Hadoop", "Spark"] },
      { group: "Etc", items: ["GitLab", "JIRA", "Blender", "MatterMost"] },
    ],
  },
  {
    id: "rendez-boo",
    title: "Rendez-Boo",
    subtitle: "WebRTC 기술을 활용한 블라인드 미팅 플랫폼",
    description:
      "처음 만나는 사람들의 내면을 들여다봄으로써 속 깊은 커뮤니케이션을 구축하고 진정성 있는 관계를 만들어주는 1:1, 3:3 미팅 플랫폼, Rendez-BOO(랑데부)입니다.",
    period: "2023.01.03 ~ 2023.02.17",
    role: "프론트엔드",
    team: "FE 3 · BE 3",
    link: "https://github.com/gnslalsl12/Rendez-Boo",
    overview: rendezOverview,
    gallery: rendezGallery,
    highlight: "React · WebRTC · TensorFlow",
    works: [
      "서비스 UI/UX 디자인 및 구현",
      "효율적인 프로젝트 성능을 위해 직접 달력 알고리즘 및 날짜 선택 기능 구현",
      "회원 히스토리 데이터를 활용한 상태 관리 및 선호도 분석 기능 구현",
      "미니게임 알고리즘 구현 및 페이지 디자인",
      "Blender와 Three.js를 활용한 WebRTC 화면의 실시간 스킨 적용 기능 구현",
    ],
    gains: [
      {
        title: "프로젝트 최적화 역량 강화",
        detail:
          "실시간 소통 기능에서 사용자 경험을 높이기 위해 LazyLoading을 적용하며 프로젝트 최적화 역량 강화",
      },
      {
        title: "코딩·알고리즘 설계 역량 강화",
        detail:
          "적절한 Library를 활용한 메인 및 서브 기능 구현과, 복잡한 달력 기능 구현을 통한 코딩 및 알고리즘 설계 역량 강화",
      },
      {
        title: "서비스 기능 구현 역량 강화",
        detail:
          "회원 정보 시스템, 페이지 이동 알고리즘, UI/UX 구성 구현 등을 통해 기본적인 서비스 기능 구현 역량 강화",
      },
    ],
    skills: [
      {
        group: "Front-End",
        items: ["JavaScript", "HTML", "CSS", "React", "Redux", "WebRTC", "Three.js", "face-api.js", "TensorFlow"],
      },
      { group: "Back-End", items: ["JAVA", "MySQL", "MongoDB", "Redis", "Zulu"] },
      { group: "Etc", items: ["GitLab", "JIRA", "Blender", "MatterMost"] },
    ],
  },
];
