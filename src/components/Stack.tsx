import * as React from "react";
import { useState, useEffect, useRef } from "react";
import bg from "../images/tech_background.png";

type skillItem = {
  img: string;
  title: string;
  explain: string;
};

const Stack = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect(); //뷰포트의 상단~aboutRef의 하단까지 거리
        if (rect.top >= window.innerHeight * -0.5 && rect.top <= window.innerHeight * 0.3) {
        } else {
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const skillsFE: skillItem[] = [
    {
      title: "HTML",
      img: require("../images/tool_logo_html.png"),
      explain: "웹페이지의 구조를 설명하는 마크업 언어",
    },
    {
      title: "CSS",
      img: require("../images/tool_logo_css.png"),
      explain: "웹페이지의 디자인과 레이아웃을 조정하는 스타일 시트 언어",
    },
    {
      title: "JavaScript",
      img: require("../images/tool_logo_js.png"),
      explain: "웹 브라우저에서 주로 사용되는 동적 프로그래밍 언어",
    },
    {
      title: "React",
      img: require("../images/tool_logo_react.png"),
      explain: "Facebook에서 개발한 JavaScript 라이브러리",
    },
    {
      title: "ReactNative",
      img: require("../images/tool_logo_reactnative.png"),
      explain: "React원칙을 이용한 모바일 애플리케이션 개발 프레임워크",
    },
    {
      title: "TypeScript",
      img: require("../images/tool_logo_ts.png"),
      explain: "JavaScript의 슈퍼셋인 오픈소스 프로그래밍 언어",
    },
    {
      title: "Vue",
      img: require("../images/tool_logo_vue.png"),
      explain: "사용자 인터페이스를 구축하기 위한 프로그레시브 JavaScript 프레임워크",
    },
    {
      title: "Redux",
      img: require("../images/tool_logo_redux.png"),
      explain: "JavaScript에서 사용되는 상태 관리 라이브러리",
    },
    {
      title: "Recoil",
      img: require("../images/tool_logo_recoil.png"),
      explain: "React에서 사용되는 상태 관리 라이브러리",
    },
    {
      title: "SASS",
      img: require("../images/tool_logo_sass.png"),
      explain: "SCSS의 문법과 모듈화를 활용한 CSS 전처리기",
    },
    {
      title: "TailwindCSS",
      img: require("../images/tool_logo_tailwind.png"),
      explain: "빌드 프로세스를 사용하여 CSS를 생성하는 오픈 소스 CSS 프레임워크",
    },
    {
      title: "StyledComponent",
      img: require("../images/tool_logo_styledcomponent.png"),
      explain: "지정된 스타일 컴포넌트를 생성하여 활용하는 오픈 소스 CSS 프레임워크",
    },
    {
      title: "Three.js",
      img: require("../images/tool_logo_three.png"),
      explain: "WebGL을 더 쉽게 사용할 수 있게 해주는 3D 활용 JavaScript 라이브러리",
    },
  ];

  const skillsBE: skillItem[] = [
    {
      title: "Java",
      img: require("../images/tool_logo_java.png"),
      explain:
        "객체지향 프로그래밍 언어로, 플랫폼 독립적이며 안정성과 보안성이 높은 프로그래밍 언어",
    },
    {
      title: "Spring",
      img: require("../images/tool_logo_spring.png"),
      explain:
        "개발 생산성과 유지 보수성을 향상시켜주는 Java 기반의 오픈 소스 애플리케이션 프레임워크",
    },
    {
      title: "Python",
      img: require("../images/tool_logo_python.png"),
      explain:
        "객체지향 프로그래밍 언어로, 플랫폼 독립적이며 안정성과 보안성이 높은 프로그래밍 언어",
    },
    {
      title: "MySQL",
      img: require("../images/tool_logo_mysql.png"),
      explain:
        "데이터 조작 및 관리 작업을 수행하는 오픈 소스 기반의 관계형 데이터베이스 관리 시스템",
    },
  ];
  const skillsOthers: skillItem[] = [
    {
      title: "GitLab",
      img: require("../images/tool_logo_gitlab.png"),
      explain: "협업을 위한 웹 기반의 Git 저장소 관리 및 CI/CD 기능을 제공하는 플랫폼",
    },
    {
      title: "Jira",
      img: require("../images/tool_logo_jira.png"),
      explain: "Atlassian에서 제공하는 프로젝트 관리 및 이슈 추적을 위한 웹 기반의 애플리케이션",
    },
    {
      title: "Blender",
      img: require("../images/tool_logo_blender.png"),
      explain: "3D 그래픽을 생성하기 위한 자유-오픈 소스 소프트웨어",
    },
    {
      title: "SketchUp",
      img: require("../images/tool_logo_sketchup.png"),
      explain: "건축, 인테리어 디자인 등의 분야에 활용되는 3D 모델링 컴퓨터 프로그램",
    },
  ];

  return (
    <div id="page_stack" ref={stackRef}>
      <div id="page_effect_top" />

      <img src={bg} alt="background" id="page_background" />

      <div id="page_stack_container">
        <span className="page_stack_title">TECH STACK</span>
        <div className="stack_FE_box stack_box">
          <span># Front-End</span>
          <div className="skill_item_list">
            {skillsFE.map((item, index) => (
              <div className="stack_item_box" key={index}>
                <div className="left_box">
                  <div className="img_box">
                    <img src={item.img} alt="skill logo" />
                  </div>
                  <div className="inner_right_box">
                    <span className="title">{item.title}</span>
                    <span className="content">{item.explain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stack_BE_box stack_box">
          <span># Back-End</span>
          <div className="skill_item_list">
            {skillsBE.map((item, index) => (
              <div className="stack_item_box" key={index}>
                <div className="left_box">
                  <div className="img_box">
                    <img src={item.img} alt="skill logo" />
                  </div>
                  <div className="inner_right_box">
                    <span className="title">{item.title}</span>
                    <span className="content">{item.explain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="stack_Others_box stack_box">
          <span># Others</span>
          <div className="skill_item_list">
            {skillsOthers.map((item, index) => (
              <div className="stack_item_box" key={index}>
                <div className="left_box">
                  <div className="img_box">
                    <img src={item.img} alt="skill logo" />
                  </div>
                  <div className="inner_right_box">
                    <span className="title">{item.title}</span>
                    <span className="content">{item.explain}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
