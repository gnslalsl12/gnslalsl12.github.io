// import React from "react";

// import { MdDevices } from "react-icons/md";
// import { FiFeather } from "react-icons/fi";
// import { IoRocketOutline } from "react-icons/io5";
// import { TbBulb } from "react-icons/tb";
// // import skillImages from "../assets/images/skills";

<<<<<<< Updated upstream
const Skills = () => {
  const skillsArray = [
    {
      name: "JavaScript",
      img: "",
      exp: 90,
      type: 0,
      explain: "고급 클로저, 비동기 처리 및 ES6+ 기능 숙련도.",
    },
    { name: "HTML", img: "", exp: 90, type: 0, explain: "HTML5 및 웹 접근성에 대한 깊은 이해." },
    {
      name: "CSS",
      img: "",
      exp: 90,
      type: 0,
      explain: "다양한 에니메이션과 반응형 디자인 구현 능력.",
    },
    {
      name: "React",
      img: "",
      exp: 90,
      type: 0,
      explain: "컴포넌트 생명주기, 상태 관리 및 훅스 활용 능력.",
    },
    {
      name: "ReactNative",
      img: "",
      exp: 70,
      type: 0,
      explain: "네이티브 모듈 통합 및 크로스 플랫폼 앱 개발 경험.",
    },
    {
      name: "TypeScript",
      img: "",
      exp: 70,
      type: 0,
      explain: "정적 타입 지정 및 인터페이스 사용 능력.",
    },
    { name: "Java", img: "", exp: 70, type: 1, explain: "객체 지향 프로그래밍 및 JVM 이해도." },
    { name: "Figma", img: "", exp: 70, type: 2, explain: "프로토타이핑 및 협업 디자인 경험." },
    {
      name: "MySQL",
      img: "",
      exp: 50,
      type: 1,
      explain: "데이터베이스 설계 및 SQL 쿼리 최적화 경험.",
    },
    { name: "Blender", img: "", exp: 50, type: 2, explain: "3D 모델링 및 애니메이션 기초 지식." },
    { name: "Vue", img: "", exp: 50, type: 0, explain: "Vue 생태계 및 MVVM 패턴 이해." },
    { name: "Redux", img: "", exp: 70, type: 0, explain: "상태 관리 패턴 및 미들웨어 통합 능력." },
    {
      name: "Recoil",
      img: "",
      exp: 50,
      type: 0,
      explain: "Recoil을 이용한 상태 관리 및 성능 최적화 경험.",
    },
    { name: "SASS", img: "", exp: 70, type: 0, explain: "SASS 및 SCSS를 활용한 스타일링 능력." },
    {
      name: "Tailwind",
      img: "",
      exp: 70,
      type: 0,
      explain: "유틸리티-퍼스트 CSS 프레임워크를 활용한 효율적인 디자인 구현.",
    },
    {
      name: "Styled-Components",
      img: "",
      exp: 70,
      type: 0,
      explain: "CSS-in-JS 접근 방식을 통한 컴포넌트 스타일링.",
    },
    {
      name: "Three.js",
      img: "",
      exp: 70,
      type: 0,
      explain: "웹 기반 3D 그래픽스 구현 및 애니메이션 경험.",
    },
    {
      name: "SpringBoot",
      img: "",
      exp: 50,
      type: 1,
      explain: "RESTful API 개발 및 스프링 생태계 이해.",
    },
    { name: "Python", img: "", exp: 50, type: 1, explain: "스크립팅 및 데이터 처리 기본 지식." },
    {
      name: "GitLab",
      img: "",
      exp: 60,
      type: 3,
      explain: "버전 관리 및 CI/CD 파이프라인 구축 경험.",
    },
    { name: "JIRA", img: "", exp: 60, type: 3, explain: "프로젝트 관리 및 이슈 추적 능력." },
    { name: "Photoshop", img: "", exp: 50, type: 2, explain: "기본 이미지 편집 및 디자인 스킬." },
    {
      name: "Node.js",
      img: "",
      exp: 60,
      type: 1,
      explain:
        "Express.js를 이용한 기본적인 RESTful API 개발 및 서버 사이드 스크립팅 경험. 비동기 프로그래밍 및 기본적인 Node.js 라이브러리 활용 능력.",
    },
  ];
=======
// const Skills = () => {
//   const knowledgeArray = [
//     {
//       name: "JavaScript",
//       exp: 90,
//       like: 1,
//       explain: "고급 클로저, 비동기 처리 및 ES6+ 기능 숙련도.",
//     },
//     { name: "HTML", exp: 90, like: 1, explain: "HTML5 및 웹 접근성에 대한 깊은 이해." },
//     {
//       name: "CSS",
//       exp: 90,
//       lke: 1,
//       explain: "다양한 에니메이션과 반응형 디자인 구현 능력.",
//     },
//     {
//       name: "React",
//       exp: 90,
//       like: 1,
//       explain: "컴포넌트 생명주기, 상태 관리 및 Hooks 활용 능력.",
//     },
//     {
//       name: "ReactNative",
//       exp: 70,
//       like: 1,
//       explain: "네이티브 모듈 통합 및 크로스 플랫폼 앱 개발 경험.",
//     },
//     {
//       name: "TypeScript",
//       exp: 70,
//       like: 1,
//       explain: "정적 타입 지정 및 인터페이스 사용 능력.",
//     },
//     { name: "Java", exp: 70, like: 1, explain: "객체 지향 프로그래밍 및 JVM 이해도." },
//     { name: "SASS", exp: 70, like: 1, explain: "SASS 및 SCSS를 활용한 스타일링 능력." },
//     {
//       name: "Tailwind",
//       exp: 70,
//       like: 1,
//       explain: "유틸리티-퍼스트 CSS 프레임워크를 활용한 효율적인 디자인 구현.",
//     },
//     {
//       name: "MySQL",
//       exp: 50,
//       like: 1,
//       explain: "데이터베이스 설계 및 SQL 쿼리 최적화 경험.",
//     },
//     { name: "Redux", exp: 50, like: 1, explain: "상태 관리 패턴 및 미들웨어 통합 능력." },
//     { name: "Vue", exp: 50, like: 1, explain: "Vue 생태계 및 MVVM 패턴 이해." },
//     {
//       name: "Three.js",
//       exp: 70,
//       like: 1,
//       explain: "웹 기반 3D 그래픽스 구현 및 애니메이션 경험.",
//     },
//     // { name: "Figma", exp: 70, like: 0, explain: "프로토타이핑 및 협업 디자인 경험." },
//     // { name: "Blender", exp: 50, like: 0, explain: "3D 모델링 및 애니메이션 기초 지식." },
//     // {
//     //   name: "Recoil",
//     //   exp: 50,
//     //   like: 1,
//     //   explain: "Recoil을 이용한 상태 관리 및 성능 최적화 경험.",
//     // },
//     // {
//     //   name: "Styled-Components",
//     //   exp: 70,
//     //   like: 0,
//     //   explain: "CSS-in-JS 접근 방식을 통한 컴포넌트 스타일링.",
//     // },
//     // {
//     //   name: "SpringBoot",
//     //   exp: 50,
//     //   like: 0,
//     //   explain: "RESTful API 개발 및 스프링 생태계 이해.",
//     // },
//     // { name: "Python", exp: 50, like: 0, explain: "스크립팅 및 데이터 처리 기본 지식." },
//     // {
//     //   name: "GitLab",
//     //   exp: 60,
//     //   like: 0,
//     //   explain: "버전 관리 및 CI/CD 파이프라인 구축 경험.",
//     // },
//     // { name: "JIRA", exp: 60, like: 0, explain: "프로젝트 관리 및 이슈 추적 능력." },
//     // {
//     //   name: "Node.js",
//     //   exp: 60,
//     //   like: 1,
//     //   explain:
//     //     "Express.js를 이용한 기본적인 RESTful API 개발 및 서버 사이드 스크립팅 경험. 비동기 프로그래밍 및 기본적인 Node.js 라이브러리 활용 능력.",
//     // },
//   ];
>>>>>>> Stashed changes

//   const skillsPercentContent = () => {
//     // knowledgeArray.sort((x1, x2) => (x1.like === x2.like ? x2.exp - x1.exp : x2.like - x1.like));
//     return (
//       <ul>
//         {(() => {
//           const items = [];
//           for (let i = 0; i < 10 && i < knowledgeArray.length; i++) {
//             items.push(
//               <li key={i}>
//                 <div className="about_info_rightBox_skills_name">{knowledgeArray[i].name}</div>
//                 <div
//                   className={`about_info_rightBox_skills_percent percent_${knowledgeArray[i].exp}`}
//                 />
//               </li>
//             );
//           }
//           return items;
//         })()}
//       </ul>
//     );
//   };

//   const skillsTopContent = () => {
//     const skillsArray = [
//       {
//         title: "Intuitive",
//         icon: <TbBulb color="white" />,
//         summary: "직관적인 UI/UX 디자인을 구상하여\n빠르고 쉬운 사용 환경을 제공합니다.",
//       },
//       {
//         title: "Efficiency",
//         icon: <FiFeather color="white" />,
//         summary: "효율적인 프로그래밍을 위해 노력하며\n최적의 상호작용을 추구합니다.",
//       },
//       {
//         title: "Dynamic",
//         icon: <IoRocketOutline color="white" />,
//         summary: "다양한 에니메이션과 동적인 반응으로\n페이지에 생동감을 더합니다.",
//       },
//       {
//         title: "Responsive",
//         icon: <MdDevices color="white" />,
//         summary: "최고의 사용 경험을 위해\n반응형 페이지를 구현합니다.",
//       },
//     ];

//     return (
//       <ul>
//         {skillsArray.map((item, index) => {
//           return (
//             <li key={index} className="skills_summary_item">
//               <div className="skills_summary_item_icon">
//                 <div className="skills_summary_item_icon_value">{item.icon}</div>
//               </div>
//               <div className="skills_summary_item_title">{item.title}</div>
//               <div className="skills_summary_item_summary">{item.summary}</div>
//             </li>
//           );
//         })}
//       </ul>
//     );
//   };

//   return (
//     <div className="page_global_background page_skills">
//       <div className="page_global_title">
//         <span>SKILLS</span>
//       </div>
//       <div className="page_global_topBox skills_summary">{skillsTopContent()}</div>
//       <div className="skills_bottomBox">
//         {/* <div className="skills_type">{skillsLanguagesContent()}</div> */}
//         <div className="skills_percent">{skillsPercentContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default Skills;
