import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { SiGithub } from "react-icons/si";
import { GrYoutube } from "react-icons/gr";
import project2D_Worldy from "../images/project2D_Worldy.png";
import project2D_Eeum from "../images/project2D_E-Eum.png";
import project2D_RendezBoo from "../images/project2D_RendezBoo.png";
import project3D_Worldy from "../images/project3D_Worldy.png";
import project3D_Eeum from "../images/project3D_E-Eum.png";
import project3D_RendezBoo from "../images/project3D_RendezBoo.png";
import Logo_Worldy from "../images/Logo_Worldy.png";
import Logo_Eeum from "../images/Logo_Eeum.png";
import Logo_RendezBoo from "../images/Logo_RendezBoo.png";
import project_Worldy_Intro from "../images/project_Worldy_Intro.png";
import project_Eeum_Intro from "../images/project_Eeum_Intro.png";
import project_RendezBoo_Intro from "../images/project_RendezBoo_Intro.png";

type WorksItemType = {
  type: string;
  title: string;
  period: string;
  about_title: string;
  about_explain: JSX.Element;
  github_link: string;
  youtube_link: string;
  intro: string;
  img_2d: string;
  img_3d: string;
  logo: string;
  resp: string;
  cont: JSX.Element;
  FEs: JSX.Element;
  BEs: JSX.Element;
};

const Works = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const workRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (workRef.current) {
        const rect = workRef.current.getBoundingClientRect(); //뷰포트의 상단~aboutRef의 하단까지 거리
        if (rect.top >= window.innerHeight * -0.5 && rect.top <= window.innerHeight * 0.3) {
        } else {
          setSelProject(-1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const WorksItemList: WorksItemType[] = [
    {
      type: "Team Project (Web)",
      title: "Worldy",
      period: "2023.04 ~ 2023.05",
      about_title:
        "3D 세계탐험과 나라별 퀴즈, 모노폴리 게임 등을 통해 재미있게 세상을 배울 수 있는 메타버스 3D 게임 프로젝트",
      about_explain: (
        <div>
          세계 각국의 문화와 역사, 시사 상식을 게임으로 배울 수 있는 서비스입니다.
          <br />
          각 나라에 대한 상식 퀴즈를 통해 세계를 알아가고, AI를 활용한 틀림그림 찾기, 3D 메타버스
          세상 탐험 등을 통해 직접 세상을 여행하는 듯한 실감나는 체험을 할 수 있습니다.
          <br />
          동시에, 모노폴리 게임을 모티브로 제작한 보드게임으로 일반적인 교육 게임에 비해 훨씬 더
          친숙하고 재미있게 다양한 나라에 대해 알아갈 수 있습니다.
        </div>
      ),
      github_link: "https://github.com/SSAFY507/Worldy",
      intro: project_Worldy_Intro,
      img_2d: project2D_Worldy,
      img_3d: project3D_Worldy,
      logo: Logo_Worldy,
      resp: "Front-End & 3D 디자인",
      cont: (
        <>
          <div>
            UI/UX
            <span>React & TypeScript</span>
          </div>
          <div>
            페이지 알고리즘 구성
            <span>React & TypeScript & Redux</span>
          </div>

          <div>
            기부/결제
            <span>React & TypeScript & KakaoPay API</span>
          </div>
          <div>
            튜토리얼 구현
            <span>React</span>
          </div>
          <div>
            마이페이지 & 유저 상태 관리
            <span>React & TypeScript & Redux</span>
          </div>
          <div>
            Open API 제공 기능
            <span>React & TypeScript & Axios</span>
          </div>
          <div>
            Supports
            <span>React & TypeScript</span>
          </div>
          <div>
            로그인/로그아웃
            <span>React & TypeScript & Redux</span>
          </div>
          <div>
            3D 디자인
            <span>Three.js & Blender</span>
          </div>
        </>
      ),
      FEs: (
        <>
          <span>React</span>
          <span>TypeScript</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>Redux</span>
          <span>CSS</span>
          <span>TailWind</span>
          <span>Axios</span>
          <span>Three.js</span>
          <span>Blender</span>
        </>
      ),
      BEs: (
        <>
          <span>Java</span>
          <span>SpringBoot</span>
          <span>SpringSecurity</span>
          <span>JPA</span>
          <span>MySQL</span>
          <span>ElasticSearch</span>
          <span>Python</span>
          <span>FastAPI</span>
          <span>OpenAI</span>
          <span>OpenCV</span>
          <span>Redis</span>
          <span>RabbitMQ</span>
          <span>WebSocket</span>
          <span>STOMP</span>
        </>
      ),
      youtube_link: "",
    },
    {
      type: "Team Project (Mobile)",
      title: "E-Eum",
      period: "2023.02 ~ 2023.04",
      about_title:
        "보육원의 보호가 종료된 ‘자립준비청년’들을 위한 진로 후원 및 정서적 지원 서비스 프로젝트",
      about_explain: (
        <span>
          보육원에서 독립해야하는 자립준비청년들을 위한 서비스입니다.
          <br />
          다양한 분야의 고민 상담가와 연결시켜주는 고민 상담 서비스, 청년들의 꿈을 이루기 위해
          후원을 신청 & 모집할 수 있는 꿈후원 서비스 등을 통해 정서적/경제적 자립을 지원합니다.
          <br />
          자립준비청년들이 꿈을 이루어나가는 과정에서 혼자가 아니라 사회·이웃과 '이어져 있다'는 것을
          체감할 수 있도록 든든한 연결 고리를 만들기 위한 프로젝트입니다.
        </span>
      ),
      github_link: "https://github.com/gnslalsl12/E-Eum",
      intro: project_Eeum_Intro,
      img_2d: project2D_Eeum,
      img_3d: project3D_Eeum,
      logo: Logo_Eeum,
      resp: "Front-End & 3D 디자인",
      cont: (
        <>
          <div>
            UI/UX
            <span>ReactNative & TypeScript</span>
          </div>
          <div>
            고민 상담 기능
            <span>ReactNative & TypeScript & Recoil</span>
          </div>
          <div>
            자립준비청년 등록 및 구분
            <span>ReactNative & TypeScript & Recoil</span>
          </div>
          <div>
            로그인/로그아웃
            <span>ReactNative & TypeScript & Recoil</span>
          </div>
          <div>
            3D 효과 및 에니메이션
            <span>ReactNative & TypeScript</span>
          </div>
          <div>
            3D 디자인
            <span>Blender</span>
          </div>
        </>
      ),
      FEs: (
        <>
          <span>ReactNative</span>
          <span>TypeScript</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>Recoil</span>
          <span>CSS</span>
          <span>styled-components</span>
          <span>Axios</span>
          <span>Blender</span>
        </>
      ),
      BEs: (
        <>
          <span>MySQL</span>
          <span>Java</span>
          <span>Python</span>
          <span>Flask</span>
          <span>SpringBoot</span>
          <span>SpringSecurity</span>
          <span>JPA</span>
          <span>QueryDSL</span>
          <span>Hadoop</span>
          <span>Spark</span>
          <span>Firebase</span>
        </>
      ),
      youtube_link: "",
    },
    {
      type: "Team Project (Web)",
      title: "Rendez-BOO",
      period: "2023.01 ~ 2023.02",
      about_title: "Web RTC를 기반으로 한 1대1 / 3대3 블라인드 데이팅 웹 서비스",
      about_explain: (
        <span>
          서로의 얼굴을 알지 못한 채 시작되는 블라인드 미팅 서비스로, 대화를 통해 서로의 마음을
          열어갈 수록 얼굴이 드러나게 됩니다.
          <br />
          동시에 서로의 감정 상태를 알려주는 기능으로 보다 확실하고 적극적인 반응을 이끌어 낼 수
          있습니다.
          <br />
          1:1과 3:3 미팅 서비스를 선택해 사용하며 다양한 사람들과 다채롭게 만날 수 있습니다.
        </span>
      ),
      github_link: "https://github.com/gnslalsl12/Rendez-Boo",
      intro: project_RendezBoo_Intro,
      img_2d: project2D_RendezBoo,
      img_3d: project3D_RendezBoo,
      logo: Logo_RendezBoo,
      resp: "Front-End",
      cont: (
        <>
          <div>
            UI/UX
            <span>React & TypeScript</span>
          </div>
          <div>
            미니게임 구현
            <span>React & Redux</span>
          </div>

          <div>
            화상통화 페이지 구현
            <span>React & Redux & WebRTC</span>
          </div>
          <div>
            로그인/로그아웃
            <span>React & Redux</span>
          </div>
          <div>
            회원가입
            <span>React & Redux</span>
          </div>
          <div>
            페이지 알고리즘
            <span>React</span>
          </div>
        </>
      ),
      FEs: (
        <>
          <span>React</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>Redux</span>
          <span>CSS</span>
          <span>WebRTC</span>
          <span>Axios</span>
          <span>Three.js</span>
          <span>Moment.js</span>
          <span>face-api.js</span>
          <span>tensorflow</span>
        </>
      ),
      BEs: (
        <>
          <span>MySQL</span>
          <span>MongoDB</span>
          <span>Redis</span>
          <span>Zulu</span>
          <span>JPA</span>
          <span>SpringBoot</span>
          <span>AWS</span>
        </>
      ),
      youtube_link: "",
    },
  ];

  const handleDetailProject = (next: boolean) => {
    if (next) {
      setSelProject((selProject + 1) % WorksItemList.length);
    } else {
      setSelProject((selProject - 1 + WorksItemList.length) % WorksItemList.length);
    }
  };

  const [selProject, setSelProject] = useState<number>(-1);
  const DetailModal = (): JSX.Element => {
    const [selItem, setSelItem] = useState<number>(0);
    return (
      <div id="works_modal_container">
        <div className="works_modal_box">
          <div className="works_modal_top">
            <img src={WorksItemList[selProject].img_3d} alt="intro" className="works_modal_3D" />
          </div>
          <div className="works_modal_bottom">
            <div className="works_modal_NPbutton">
              <button
                onClick={() => {
                  handleDetailProject(false);
                }}
              >
                Prev
              </button>
              <button
                onClick={() => {
                  handleDetailProject(true);
                }}
              >
                Next
              </button>
            </div>
            <div className="works_modal_bottom_box">
              {selItem === 0 && <ModalContent1 item={WorksItemList[selProject]} />}
              {selItem === 1 && <ModalContent2 item={WorksItemList[selProject]} />}
              {selItem === 2 && <ModalContent3 item={WorksItemList[selProject]} />}
              {selItem === 3 && <ModalContent4 item={WorksItemList[selProject]} />}
              {selItem === 4 && <ModalContent5 item={WorksItemList[selProject]} />}
            </div>
          </div>
          <div className="works_modal_menu_container">
            <button
              onClick={() => setSelItem(0)}
              className={`${selItem === 0 ? "activated_button" : ""}`}
            >
              개요
            </button>
            <button
              onClick={() => setSelItem(1)}
              className={`${selItem === 1 ? "activated_button" : ""}`}
            >
              상세
            </button>
            <button
              onClick={() => setSelItem(2)}
              className={`${selItem === 2 ? "activated_button" : ""}`}
            >
              기여
            </button>
            <button
              onClick={() => setSelItem(3)}
              className={`${selItem === 3 ? "activated_button" : ""}`}
            >
              기술
            </button>
            <button
              onClick={() => setSelItem(4)}
              className={`${selItem === 4 ? "activated_button" : ""}`}
            >
              링크
            </button>
            <button onClick={() => setSelProject(-1)} className="close_button">
              닫기
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ModalContent1 = ({ item }: { item: WorksItemType }): JSX.Element => {
    const [imgHoverState, setImgHoverState] = useState<boolean>(false);

    return (
      <div className="modal_content_1_container modal_content_common_container">
        <div className="modal_1_logo">
          <div className={`logo_text ${imgHoverState ? "blured" : ""}`}>
            <span>로고</span>
            <span>미리보기</span>
          </div>
          <img
            src={item.logo}
            alt="logo"
            className={`logo_img_left ${imgHoverState ? "blured" : ""}`}
          />
          <img
            src={item.img_2d}
            alt="logo"
            onClick={() => setImgHoverState((prev) => !prev)}
            className={` ${imgHoverState ? "logo_img_right_clicked" : "logo_img_right"}`}
          />
        </div>
        <div className={`modal_1_outline ${imgHoverState ? "blured" : ""}`}>
          <span className="title">프로젝트 타입</span>
          <span className="content">{item.type}</span>
        </div>
        <div className={`modal_1_period ${imgHoverState ? "blured" : ""}`}>
          <span className="title">프로젝트 기간</span>
          <span className="content">{item.period}</span>
        </div>
      </div>
    );
  };

  const ModalContent2 = ({ item }: { item: WorksItemType }): JSX.Element => {
    return (
      <div className="modal_content_2_container modal_content_common_container">
        <div className="modal_2_subject">
          <span className="title">프로젝트 주제</span>
          <span className="content">{item.about_title}</span>
        </div>
        <div className="modal_2_explain">
          <span className="title">프로젝트 상세 내용</span>
          <span className="content">{item.about_explain}</span>
        </div>
      </div>
    );
  };

  const ModalContent3 = ({ item }: { item: WorksItemType }): JSX.Element => {
    return (
      <div className="modal_content_3_container modal_content_common_container">
        <div className="modal_3_resp">
          <span className="title">
            역할 : <span>{item.resp}</span>
          </span>
        </div>
        <div className="modal_3_cont">
          <span className="title">담당 구현</span>
          <div className="content">{item.cont}</div>
        </div>
      </div>
    );
  };

  const ModalContent4 = ({ item }: { item: WorksItemType }): JSX.Element => {
    return (
      <div className="modal_content_4_container modal_content_common_container">
        <div className="modal_4_left">
          <span>Front-End</span>
          <div className="content">{item.FEs}</div>
        </div>
        <div className="modal_4_right">
          <span>Back-End</span>
          <div className="content">{item.BEs}</div>
        </div>
      </div>
    );
  };

  const ModalContent5 = ({ item }: { item: WorksItemType }): JSX.Element => {
    return (
      <div className="modal_content_5_container modal_content_common_container">
        <a href={item.youtube_link} className="left_button">
          <GrYoutube />
        </a>
        <a href={item.github_link} className="right_button">
          <SiGithub />
        </a>
      </div>
    );
  };

  return (
    <div id="page_works" ref={workRef}>
      {selProject !== -1 && <DetailModal />}
      <div className="works_container">
        <div className="works_top_box">
          <span className="works_top_text">Works</span>
        </div>
        <div className="works_bottom_box">
          <div className="bottom_box_flows">
            <div
              id="work_box_Worldy"
              className="work_box_web"
              onClick={() => {
                setSelProject(0);
              }}
            >
              <div className="work_text_box">
                <span>Worldy</span>
              </div>
              <div className="work_image_box">
                <img src={WorksItemList[0].intro} alt="intro" />
              </div>
            </div>
            <div
              id="work_box_Eeum"
              className="work_box_mobile"
              onClick={() => {
                setSelProject(1);
              }}
            >
              <div className="work_text_box">
                <span>이음</span>
              </div>
              <div className="work_image_box">
                <img src={WorksItemList[1].intro} alt="intro" />
              </div>
            </div>
            <div
              id="work_box_RendezBoo"
              className="work_box_web"
              onClick={() => {
                setSelProject(2);
              }}
            >
              <div className="work_text_box">
                <span>
                  Rendez
                  <br />
                  Boo
                </span>
              </div>
              <div className="work_image_box">
                <img src={WorksItemList[2].intro} alt="intro" />
              </div>
            </div>
            <div id="work_box_Olds">
              {/* <div
                id="work_box_MyHome"
                className="work_box"
                onClick={() => {
                  setSelProject(-1);
                }}
              >
                <div className="work_text_box">
                  <span>
                    Where is
                    <br />
                    My Home
                  </span>
                </div>
                <div className="work_image_box"></div>
              </div> */}
              <a id="work_box_More" className="work_box" href="https://github.com/gnslalsl12">
                <SiGithub color="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
