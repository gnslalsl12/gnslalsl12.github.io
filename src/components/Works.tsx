import * as React from "react";
import { useState, useEffect } from "react";
import { SiGithub } from "react-icons/si";
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
  about_explain: string;
  link: string;
  intro: string;
  img_2d: string;
  img_3d: string;
  logo: string;
};

type Projects = {
  [key: string]: WorksItemType;
};

const Works = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const WorksItemList: Projects = {
    Worldy: {
      type: "Team Project (Web)",
      title: "Worldy",
      period: "2023.04~2023.05",
      about_title: "Worldy 프로젝트 주제",
      about_explain: "Worldy 프로젝트 소개",
      link: "https://",
      intro: project_Worldy_Intro,
      img_2d: project2D_Worldy,
      img_3d: project3D_Worldy,
      logo: Logo_Worldy,
    },
    Eeum: {
      type: "Team Project (Mobile)",
      title: "E-Eum",
      period: "2023.02~2023.04",
      about_title: "이음 프로젝트 주제",
      about_explain: "이음 프로젝트 소개",
      link: "https://",
      intro: project_Eeum_Intro,
      img_2d: project2D_Eeum,
      img_3d: project3D_Eeum,
      logo: Logo_Eeum,
    },
    RendezBoo: {
      type: "Team Project (WEB)",
      title: "Rendez-BOO",
      period: "2023.01~2023.02",
      about_title: "랑데부 프로젝트 주제",
      about_explain: "랑데부 프로젝트 소개",
      link: "https://",
      intro: project_RendezBoo_Intro,
      img_2d: project2D_RendezBoo,
      img_3d: project3D_RendezBoo,
      logo: Logo_RendezBoo,
    },
  };

  const [detailShowState, setDetailShowState] = useState<boolean>(false);
  const [detailProject, setDetailProject] = useState<string>("");

  const DetailModal = (): JSX.Element => {
    return <div></div>;
  };

  return (
    <div id="page_works">
      {detailProject !== "" && <DetailModal />}
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
                setDetailProject("Worldy");
                setDetailShowState(true);
              }}
            >
              <div className="work_text_box">
                <span>Worldy</span>
              </div>
              <div className="work_image_box">
                <img src={WorksItemList.Worldy.intro} alt="intro" />
              </div>
            </div>
            <div
              id="work_box_RendezBoo"
              className="work_box_web"
              onClick={() => {
                setDetailProject("RendezBoo");
                setDetailShowState(true);
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
                <img src={WorksItemList.RendezBoo.intro} alt="intro" />
              </div>
            </div>
            <div id="work_box_Olds">
              <div
                id="work_box_MyHome"
                className="work_box"
                onClick={() => {
                  setDetailProject("MyHome");
                  setDetailShowState(true);
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
              </div>
              <a id="work_box_More" className="work_box" href="https://github.com/gnslalsl12">
                <SiGithub color="white" />
              </a>
            </div>
            <div
              id="work_box_Eeum"
              className="work_box_mobile"
              onClick={() => {
                setDetailProject("Eeum");
                setDetailShowState(true);
              }}
            >
              <div className="work_text_box">
                <span>이음</span>
              </div>
              <div className="work_image_box">
                <img src={WorksItemList.Eeum.intro} alt="intro" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
