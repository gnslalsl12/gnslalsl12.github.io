import React, { useState, useEffect } from "react";
import Worldy_Overview from "../assets/images/projects/Worldy_Overview.png";
import Eeum_Overview from "../assets/images/projects/Eeum_Overview.png";
import Rendez_Overview from "../assets/images/projects/Rendez_Overview.png";

const Projects = () => {
  const [filtered, setFiltered] = useState(0);

  const filterButtons = () => {
    const filters = ["ALL", "REACT", "JAVASCRIPT"];

    return filters.map((value, index) => {
      return (
        <button key={index} onClick={() => setFiltered(index)}>
          {value}
        </button>
      );
    });
  };

  const projectsCardList = () => {
    const projects = [
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

    return projects.map((value, index) => {
      return (
        <li key={index}>
          <div className="projects_imgBox">
            <img src={value.imgSrc}></img>
          </div>
          <div className="projects_summary">
            <div className="projects_summary_topBox">
              <span className="projects_summary_title">
                {value.title}
                <span>{value.skills}</span>
              </span>
            </div>
            <div className="projects_summary_bottomBox">
              <button className="projects_summary_button">Details</button>
            </div>
          </div>
        </li>
      );
    });
  };

  useEffect(() => {
    console.log(filtered);
  }, [filtered]);

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
    </div>
  );
};

export default Projects;
