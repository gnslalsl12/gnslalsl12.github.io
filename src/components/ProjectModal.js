import React, { useEffect, useState } from "react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import ModalRightBoxInfos from "./ModalRightBoxInfos";
import myProjectLists from "../utils/myProjectLists";

const ProjectModal = ({ openProject, imageList, setModalState, modalState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openedProject, setOpenedProject] = useState({
    title: "",
    link: "",
    explain_short: "",
    prize: "",
    explain_long: "",
    rightBox: {
      my_works: [""],
      gain: [
        {
          big: "",
          small: "",
        },
      ],
      used_skills: [[""], [""], [""]],
      info: ["", "", ""],
    },
  });

  const closeModal = () => {
    setModalState(false);
    setTimeout(() => {
      //모달 꺼진 후 이미지 인덱스 0으로 초기화 (에니메이션 방지)
      setCurrentIndex(0);
    }, 350);
  };

  useEffect(() => {
    setOpenedProject(myProjectLists[openProject]);
  }, [openProject]);

  return (
    <div
      className={`${modalState ? "popUp_wholePage" : ""} modal_wholePage`}
      onClick={() => closeModal()}
    >
      <div className="modal_wallPop_container" onClick={(event) => event.stopPropagation()}>
        <div className="modal_wallPop_topBox">
          <div className="modal_wallPop_topBox_textBox">
            <span>{openProject.title}</span>
          </div>
        </div>
        <div className="modal_wallPop_bottomBox">
          <div className="modal_wallPop_sideBar"></div>
          <div className="modal_wallPop_bottomBox_textBox"></div>
        </div>
      </div>
      <div className="modal_imageCarousel_container" onClick={() => closeModal()}>
        <div className="modal_imageCarousel" onClick={(event) => event.stopPropagation()}></div>
      </div>
    </div>
  );
};

export default ProjectModal;
