import React, { useRef } from "react";
import profileImage from "../assets/images/profileImage.jpg";
import { MdDevices } from "react-icons/md";
import { FiFeather } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { TbBulb } from "react-icons/tb";
import useAnimationOnScroll from "../utils/useAnimationOnScroll";

const About = () => {
  const aboutTitleRef = useRef();
  const aboutSummaryCardRef = useRef();
  const aboutInfoImgRef = useRef();
  const aboutInfoPercentRef = useRef();

  useAnimationOnScroll(aboutTitleRef, "titleAnimation");
  useAnimationOnScroll(aboutSummaryCardRef, "slideRightCardsAnimation");
  useAnimationOnScroll(aboutInfoImgRef, "slideRightAnimation10");
  useAnimationOnScroll(aboutInfoPercentRef, "aboutInfoPercentAnimation");

  const aboutTopContent = () => {
    const aboutSummaryArray = [
      {
        title: "Intuitive",
        icon: <TbBulb color="white" />,
        summary: "직관적인 UI/UX 디자인을 구상하여\n빠르고 쉬운 사용 환경을 제공합니다.",
      },
      {
        title: "Efficiency",
        icon: <FiFeather color="white" />,
        summary: "효율적인 프로그래밍을 위해 노력하며\n최적의 상호작용을 추구합니다.",
      },
      {
        title: "Dynamic",
        icon: <IoRocketOutline color="white" />,
        summary: "다양한 에니메이션과 동적인 반응으로\n페이지에 생동감을 더합니다.",
      },
      {
        title: "Responsive",
        icon: <MdDevices color="white" />,
        summary: "최고의 사용 경험을 위해\n반응형 페이지를 구현합니다.",
      },
    ];

    return (
      <ul ref={aboutSummaryCardRef}>
        {aboutSummaryArray.map((item, index) => {
          return (
            <li key={index} className={`about_summary_item  cardRef${index + 1}`}>
              <div className="about_summary_left">
                <div className="about_summary_item_icon">
                  <div className="about_summary_item_icon_value">{item.icon}</div>
                </div>
                <div className="about_summary_item_title">{item.title}</div>
              </div>
              <div className="about_summary_item_summary">{item.summary}</div>
            </li>
          );
        })}
      </ul>
    );
  };

  const knowledgeArray = [
    {
      name: "JavaScript",
      exp: 90,
      like: 1,
      explain: "고급 클로저, 비동기 처리 및 ES6+ 기능 숙련도.",
    },
    { name: "HTML", exp: 90, like: 1, explain: "HTML5 및 웹 접근성에 대한 깊은 이해." },
    {
      name: "CSS",
      exp: 90,
      lke: 1,
      explain: "다양한 에니메이션과 반응형 디자인 구현 능력.",
    },
    {
      name: "React",
      exp: 90,
      like: 1,
      explain: "컴포넌트 생명주기, 상태 관리 및 Hooks 활용 능력.",
    },
    {
      name: "ReactNative",
      exp: 70,
      like: 1,
      explain: "네이티브 모듈 통합 및 크로스 플랫폼 앱 개발 경험.",
    },
    {
      name: "TypeScript",
      exp: 70,
      like: 1,
      explain: "정적 타입 지정 및 인터페이스 사용 능력.",
    },
    { name: "Java", exp: 70, like: 1, explain: "객체 지향 프로그래밍 및 JVM 이해도." },
    { name: "SASS", exp: 70, like: 1, explain: "SASS 및 SCSS를 활용한 스타일링 능력." },
    {
      name: "Tailwind",
      exp: 70,
      like: 1,
      explain: "유틸리티-퍼스트 CSS 프레임워크를 활용한 효율적인 디자인 구현.",
    },
    {
      name: "MySQL",
      exp: 50,
      like: 1,
      explain: "데이터베이스 설계 및 SQL 쿼리 최적화 경험.",
    },
    { name: "Redux", exp: 50, like: 1, explain: "상태 관리 패턴 및 미들웨어 통합 능력." },
    { name: "Vue", exp: 50, like: 1, explain: "Vue 생태계 및 MVVM 패턴 이해." },
    {
      name: "Three.js",
      exp: 70,
      like: 1,
      explain: "웹 기반 3D 그래픽스 구현 및 애니메이션 경험.",
    },
  ];

  const aboutPercentContent = () => {
    return (
      <ul>
        {(() => {
          const items = [];
          for (let i = 0; i < 10 && i < knowledgeArray.length; i++) {
            items.push(
              <li key={i}>
                <div className="about_info_rightBox_about_name">{knowledgeArray[i].name}</div>
                <div
                  className={`about_info_rightBox_about_percent percent_${knowledgeArray[i].exp}`}
                />
              </li>
            );
          }
          return items;
        })()}
      </ul>
    );
  };

  return (
    <div className="page_global_background page_about">
      <div className="page_global_title" ref={aboutTitleRef}>
        <span>ABOUT</span>
      </div>
      <div className="page_global_box about_summary">{aboutTopContent()}</div>
      <div className="page_global_box about_info">
        <div className="about_info_leftBox" ref={aboutInfoImgRef}>
          <img src={profileImage} alt="프로필 이미지" className="about_info_leftBox_img" />
          <div className="about_info_leftBox_text">
            <div className="about_info_leftBox_text_title">
              Front-End 개발자 <br /> 정훈입니다
            </div>
            <p className="about_info_leftBox_text_value">
              사용자 중심의 개발 방향성을 강화한 역량으로
              <br />
              다양한 UI/UX 설계, 다이나믹 에니메이션 구현,
              <br />
              직관적인 사용 환경 구성에 깊은 열정이 있습니다.
            </p>
          </div>
        </div>
        <div className="about_info_rightBox" ref={aboutInfoPercentRef}>
          <div className="about_percent">{aboutPercentContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;