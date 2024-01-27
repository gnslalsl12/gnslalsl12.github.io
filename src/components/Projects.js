import React, { useState, useEffect, useContext } from "react";
import Worldy_Overview from "../assets/images/projects/Worldy_Overview.png";
import Eeum_Overview from "../assets/images/projects/Eeum_Overview.png";
import Rendez_Overview from "../assets/images/projects/Rendez_Overview.png";
import ProjectModal from "./ProjectModal";
import ActiveSectionContext from "../contexts/ActiveSectionContext";
import ScrollToSectionContext from "../contexts/ScrollToSectionContext";

const Projects = () => {
  const projectCount = 3; //프로젝트 수
  // const [filtered, setFiltered] = useState(0);
  const [openProject, setOpenProject] = useState(0);
  const [imageList, setImageList] = useState(Array.from(Array(projectCount), () => []));
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [modalState, setModalState] = useState(false);
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);

  const { scrollToSection } = useContext(ScrollToSectionContext);

  // const filterButtons = () => {
  //   const filters = ["ALL", "REACT", "JAVASCRIPT"];

  //   return filters.map((value, index) => {
  //     return (
  //       <button key={index} onClick={() => setFiltered(index)}>
  //         {value}
  //       </button>
  //     );
  //   });
  // };

  const openProjectModal = (projectIndex) => {
    setOpenProject(projectIndex);
    setModalState(true);
  };

  const projectsCardList = () => {
    const projectList = [
      {
        title: "WORLDY",
        period: "23-04-10 ~ 23-05-26",
        imgSrc: Worldy_Overview,
        skills: "React & Three.js",
      },
      {
        title: "이음",
        period: "23-02-20 ~ 23-04-07",
        imgSrc: Eeum_Overview,
        skills: "ReactNative",
      },
      {
        title: "Rendez-Boo",
        period: "23-01-03 ~ 23-02-17",
        imgSrc: Rendez_Overview,
        skills: "React & WebRTC",
      },
    ];
    return projectList.map((value, index) => {
      return (
        <li key={index}>
          <div className="projects_imgBox">
            <img src={value.imgSrc} alt={`${value.title} 프로젝트 오버뷰`}></img>
          </div>
          <div className="projects_summary">
            <div className="projects_summary_topBox">
              <span className="projects_summary_title">
                {value.title}
                <span>{value.skills}</span>
              </span>
            </div>
            <div className="projects_summary_bottomBox">
              <button
                className="projects_summary_button"
                onClick={() => {
                  openProjectModal(index);
                  setActiveSection("projects");
                  scrollToSection("projects");
                }}
              >
                Details
              </button>
            </div>
          </div>
        </li>
      );
    });
  };

  useEffect(() => {
    if (imageList && imageList.length === projectCount && !isImagesLoaded) {
      const worldyContext = require.context(
        "../assets/images/projects/projectWorldy",
        false,
        /\.(png)$/
      );
      const worldyImageList = worldyContext.keys().map((path) => worldyContext(path));
      const eeumContext = require.context(
        "../assets/images/projects/projectEeum",
        false,
        /\.(png)$/
      );
      const eeumImageList = eeumContext.keys().map((path) => eeumContext(path));
      const rendezContext = require.context(
        "../assets/images/projects/projectRendez",
        false,
        /\.(png)$/
      );
      const rendezImageList = rendezContext.keys().map((path) => rendezContext(path));
      setImageList([worldyImageList, eeumImageList, rendezImageList]);
      setIsImagesLoaded(true);
    }
  }, []);

  return (
    <div className="page_global_background page_projects">
      <div className="page_global_title">
        <span>PROJECTS</span>
      </div>
      <div className="page_global_box projects_container">
        {/* <div className="projects_container_topBox">
          <div className="projects_filter_floating">
            <div className={`floating_bar moveTo_${filtered}`} />
          </div>
          <ul className="projects_filter_array">
            {filterButtons()}
          </ul>
        </div> */}
        <div className="projects_container_bottomBox">
          <ul>{projectsCardList()}</ul>
        </div>
      </div>
      <div id="modalState_pop">
        <ProjectModal
          openProject={openProject}
          imageList={imageList[openProject]}
          setModalState={setModalState}
          modalState={modalState}
        />
      </div>
    </div>
  );
};

export default Projects;
