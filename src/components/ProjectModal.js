import React, { useEffect, useState } from "react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ProjectModal = ({ openProject, imageList, setModalState, modalState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = () => {
    setModalState(false);
    setTimeout(() => {
      //모달 꺼진 후 이미지 인덱스 0으로 초기화 (에니메이션 방지)
      setCurrentIndex(0);
    }, 350);
  };

  const projectList = [
    {
      title: "WORLDY",
      link: "https://github.com/SSAFY507/Worldy",
      explain_short: "AI 기술을 활용한 3D 메타버스 세계 지식 학습 게임",
      prize: "SSAFY 자율 프로젝트 우수상",
      explain_long:
        "AI기반의 세계 상식 퀴즈 게임과 3D 메타버스로 구현된 세계 탐험 및 블루마블 게임을 통해 남녀노소 누구나 재미있게 세계를 배우는 게임, Worldy입니다.",
      rightBox: {
        my_works: [
          "서비스 UI/UX 디자인 및 구현",
          "상식 퀴즈 게임, 틀린 그림 찾기 게임 구현 및 페이지 구성",
          "회원가입, 소셜 로그인, 게임 튜토리얼 등 회원 정보 관련 기능 구현",
          "마이 페이지, 게임 랭킹 시스템, 개발자를 위한 OpenAI 기능 페이지 구현",
          "ElasticSearch를 적용한 신고/문의 기능 구현",
          "기부 및 결제 시스템 구현",
          "전체 페이지 개요 구성 및 이동 알고리즘 구현",
          "Blender와 Three.js를 활용한 3D 메타버스 환경, 3D 블루마블 페이지 구현",
          "코드 검수 및 프론트엔드 코딩 스타일 획일화",
        ],
        gain: [
          {
            big: "개발 서비스 구현 역량 강화",
            small:
              "복잡한 게임 알고리즘과 시간제한 기능, 랭킹 시스템 기능 등의 구현을 통해 코딩 구현 역량 강화",
          },
          {
            big: "가독성 및 재사용성 높은 코딩 역량 강화",
            small:
              "Redux와 Axios 기능을 커스텀하여 재사용성을 높이고, 코드 검수 및 코딩 스타일 획일화를 통해 가독성과 재사용성 높은 코딩 스타일 구축",
          },
          {
            big: "사용자 최우선의 개발 경험",
            small:
              "사용 환경을 고려한 튜토리얼 기능, 퀴즈 스크랩기능 등을 구성한 사용자 최우선의 개발 경험 획득",
          },
        ],
        used_skills: [
          ["JavaScript", "HTML", "CSS", "React", "Redux", "TypeScript", "Three.js", "TailWind"],
          ["JAVA", "MySQL", "OpenAPI", "ElasticSearch", "etc"],
          ["GitLab", "JIRA", "Blender", "MatterMost"],
        ],
        info: ["FE : 3 / BE : 3", "프론트엔드 리더", "23-04-10 ~ 23-05-26"],
      },
    },
    {
      title: "이음",
      link: "https://github.com/IEUM-Team/IEUM",
      explain_short: "빅데이터 분산 기술을 활용한 '자립 준비 청년'들의 사회적 지원 서비스",
      prize: "",
      explain_long:
        "보육원 보호가 종료된 자립 준비 청년들의 정서적 & 경제적 자립을 지원함으로써 그들이 사회로 이어지는 데에 더욱 튼튼한 연결 고리가 되어주는 서비스, 이음입니다.",
      rightBox: {
        my_works: [
          "서비스 UI/UX 디자인 및 구현",
          "메인 기능 페이지 및 3D 에니메이션 구현",
          "고민 메시지 작성 기능 및 랜덤 전송 알고리즘 구현",
          "회원가입, 소셜 로그인 등 회원 정보 관련 기능 구현",
          "전체 페이지 개요 구성 및 이동 알고리즘 구현",
          "Blender를 활용한 메인 기능 3D 시각화 및 에니메이션 제작",
          "코드 검수 및 프론트엔드 코딩 스타일 획일화",
        ],
        gain: [
          {
            big: "다양한 사용환경의 개발 역량 강화",
            small: "모바일 서비스 프로젝트를 수행하며 여러 사용 환경에서의 개발 역량 강화",
          },
          {
            big: "가독성 및 재사용성 높은 코딩 역량 강화",
            small:
              "Recoil과 Axios 기능을 커스텀하여 재사용성을 높이고, 코드 검수 및 코딩 스타일 획일화를 통해 가독성과 재사용성 높은 코딩 스타일 구축",
          },
          {
            big: "다양한 배경의 사용자를 위한 개발 경험",
            small:
              "다양한 배경의 사용자들을 고려한 프로젝트 성격에 맞게 직관적인 UI/UX 및 페이지 디자인 구현",
          },
        ],
        used_skills: [
          ["JavaScript", "HTML", "CSS", "ReactNative", "Recoil", "TypeScript", "Styled-Components"],
          ["JAVA", "MySQL", "Python", "Flask", "Hadoop", "Spark", "etc"],
          ["GitLab", "JIRA", "Blender", "MatterMost"],
        ],
        info: ["FE : 3 / BE : 3", "프론트엔드", "23-02-20 ~ 23-04-07"],
      },
    },
    {
      title: "Rendez-Boo",
      link: "https://github.com/gnslalsl12/Rendez-Boo",
      explain_short: "WebRTC 기술을 활용한 블라인드 미팅 플랫폼",
      prize: "",
      explain_long:
        "처음 만나는 사람들의 내면을 들여다봄으로써 속 깊은 커뮤니케이션을 구축하고 진정성 있는 관계를 만들어주는 1:1, 3:3 미팅 플랫폼, Rendez-BOO(랑데부) 입니다",
      rightBox: {
        my_works: [
          "서비스 UI/UX 디자인 및 구현",
          "회원가입, 로그인 기능과 회원 정보를 활용한 관심사 매칭 알고리즘 구현",
          "메인 기능 페이지 및 마이페이지 구성환경 구현",
          "효율적인 프로젝트 성능을 위해 직접 달력 알고리즘 및 날짜 선택 기능 구현",
          "플랫폼 컨셉에 맞는 다양한 우주 디자인 요소 및 에니메이션 구현",
          "회원 히스토리 데이터를 활용한 상태 관리 및 선호도 분석 기능 구현",
          "미니게임 알고리즘 구현 및 페이지 디자인",
          "전체 페이지 개요 구성 및 이동 알고리즘 구현",
          "Blender와 Three.js를 활용한 WebRTC 화면의 실시간 스킨 적용 기능 구현",
          "코드 검수 및 프론트엔드 코딩 스타일 획일화",
        ],
        gain: [
          {
            big: "프로젝트 최적화 역량 강화",
            small:
              "실시간 소통 기능에서 사용자 경험을 높이기 위해 LazyLoading을 적용하며 프로젝트 최적화 역량 강화",
          },
          {
            big: "코딩 및 알고리즘 설계 역량 강화",
            small:
              "적절한 Library를 활용한 메인 및 서브 기능 구현과, 복잡한 달력 기능 구현을 통한 코딩 및 알고리즘 설계 역량 강화",
          },
          {
            big: "기본적인 서비스 기능 구현 역량 강화",
            small:
              "프로젝트에 필수적인 회원 정보 시스템, 페이지 이동 알고리즘, UI/UX 구성 구현 등을 통해 기본적인 서비스 기능 구현 역량 강화",
          },
        ],
        used_skills: [
          [
            "JavaScript",
            "HTML",
            "CSS",
            "React",
            "Redux",
            "WebRTC",
            "Three.js",
            "face-api.js",
            "Tensorflow",
          ],
          ["JAVA", "MySQL", "MongoDB", "Redis", "Zulu", "etc"],
          ["GitLab", "JIRA", "Blender", "MatterMost"],
        ],
        info: ["FE : 3 / BE : 3", "프론트엔드", "23-01-03 ~ 23-02-17"],
      },
    },
  ];

  const modalRightBoxInfos = () => {
    return (
      <>
        <div className="modal_rightBox_my_work">
          <h1>담당 기능</h1>
          <ul>
            {projectList[openProject].rightBox.my_works.map((value, index) => {
              return <li key={index}>{value}</li>;
            })}
          </ul>
        </div>
        <div className="modal_rightBox_gain">
          <h1>강화 역량</h1>
          <ul>
            {projectList[openProject].rightBox.gain.map((value, index) => {
              return (
                <li key={index}>
                  <span className="gain_big">{value.big}</span>
                  <br />
                  <span className="gain_small">{value.small}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="modal_rightBox_info">
          <h1>수행 정보</h1>
          <ul>
            <li>
              <div>팀 구성</div>
              <div>{projectList[openProject].rightBox.info[0]}</div>
            </li>
            <li>
              <div>역할</div>
              <div>{projectList[openProject].rightBox.info[1]}</div>
            </li>
            <li>
              <div>제작 기간</div>
              <div>{projectList[openProject].rightBox.info[2]}</div>
            </li>
          </ul>
        </div>
        <div className="modal_rightBox_used_skills">
          <h1>활용 기술</h1>
          <ul>
            {projectList[openProject].rightBox.used_skills.map((array, arrayIndex) => {
              return (
                <ul key={arrayIndex}>
                  <h2>
                    {arrayIndex === 0 ? "Front-End" : arrayIndex === 1 ? "Back-End" : "Others"}
                  </h2>
                  <ul>
                    {array.map((value, index) => {
                      return <li key={index}>{value}</li>;
                    })}
                  </ul>
                </ul>
              );
            })}
          </ul>
        </div>
      </>
    );
  };

  return (
    <div
      className={`${modalState ? "popUp_wholePage" : "popDown_wholePage"} modal_wholePage`}
      onClick={() => closeModal()}
    >
      <div className="modal_container" onClick={(event) => event.stopPropagation()}>
        <div className="modal_container_topBox">
          <a
            href={projectList[openProject].link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal_topBox_left"
          >
            <span>Link to Github</span>
            <FaExternalLinkAlt className="modal_icon_link" />
          </a>
          <button className="modal_topBox_right" onClick={() => closeModal()}>
            <IoClose />
          </button>
        </div>
        <div className="modal_container_bottomBox">
          <div className="modal_conatiner_bottom_leftBox">
            <div className="modal_bottom_left_imgBox">
              <ProjectImageCarousel
                images={imageList}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
              />
              {/* <img src={tempImages[0]} alt=";;" /> */}
            </div>
            <div className="modal_bottom_left_summaryBox">
              <div className="modal_summaryBox_topBox">
                <div className="summaryBox_title">
                  {projectList[openProject].title}
                  {projectList[openProject].prize.length > 0 && (
                    <div className="modal_summaryBox_prize_container">
                      <FaStar className="prize_icon" />
                      <p className="prize_text">{projectList[openProject].prize}</p>
                    </div>
                  )}
                </div>
                <span className="summaryBox_explain_short">
                  {projectList[openProject].explain_short}
                </span>
              </div>
              <div className="modal_summaryBox_bottomBox">
                <span>{projectList[openProject].explain_long}</span>
              </div>
            </div>
          </div>
          <div className="modal_conatiner_bottom_rightBox">
            <div className="modal_rightBox_Info">{modalRightBoxInfos()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
