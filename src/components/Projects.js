import React, { useState, useEffect } from "react";

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
      { title: "WORLDY", period: "2023-04-10 ~ 2023-05-26", imgSrc: "" },
      { title: "이음", period: "2023-02-20 ~ 2023-04-07", imgSrc: "" },
      { title: "Rendez-Boo", period: "2023-01-03 ~ 2023-02-17", imgSrc: "" },
    ];

    return projects.map((value, index) => {
      return (
        <li key={index}>
          <img src={value.imgSrc}></img>
          <div className="projects_summary">
            <span className="projects_summary_title">{value.title}</span>
            <span className="projects_summary_period">{value.period}</span>
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
