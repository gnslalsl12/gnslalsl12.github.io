import React, { useEffect, useState } from "react";
import ProjectImageCarousel from "./ProjectImageCarousel";

const ProjectModal = (project, imageList) => {
  const [tempImages, setTempImages] = useState([]);

  const projectList = [
    {
      title: "WORLDY",
      period: "23-04-10 ~ 23-05-26",
      skills: "React & Three.js",
    },
    {
      title: "이음",
      period: "23-02-20 ~ 23-04-07",
      skills: "ReactNative",
    },
    {
      title: "Rendez-Boo",
      period: "23-01-03 ~ 23-02-17",
      skills: "React & WebRTC",
    },
  ];
  useEffect(() => {
    const worldyContext = require.context(
      "../assets/images/projects/projectWorldy",
      false,
      /\.(png)$/
    );
    setTempImages(worldyContext.keys().map((path) => worldyContext(path)));
  }, []);

  return (
    <div className="modal_wholePage">
      <div className="modal_container">
        <div className="modal_container_topBox"></div>
        <div className="modal_container_bottomBox">
          <div className="modal_conatiner_bottom_leftBox">
            <div className="modal_bottom_left_imgBox">
              <ProjectImageCarousel images={tempImages} />
              {/* <img src={tempImages[0]} alt=";;" /> */}
            </div>
            <div className="modal_bottom_left_summaryBox"></div>
          </div>
          <div className="modal_conatiner_bottom_rightBox"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
