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

  useEffect(() => {
    const modalScrollY = document.getElementById("modalInnerScroll");
    if (modalScrollY) {
      modalScrollY.scrollTop = 0;
    }
  }, [modalState]);

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
      className={`${modalState ? "popUp_wholePage" : "popDown_wholePage"} modal_wholePage`}
      onClick={() => closeModal()}
    >
      <div className="modal_container" onClick={(event) => event.stopPropagation()}>
        <div className="modal_container_topBox">
          <a
            href={openedProject.link}
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
            </div>
            <div className="modal_bottom_left_summaryBox">
              <div className="modal_summaryBox_topBox">
                <div className="summaryBox_title">
                  {openedProject.title}
                  {openedProject.prize.length > 0 && (
                    <div className="modal_summaryBox_prize_container">
                      <FaStar className="prize_icon" />
                      <p className="prize_text">{openedProject.prize}</p>
                    </div>
                  )}
                </div>
                <span className="summaryBox_explain_short">{openedProject.explain_short}</span>
              </div>
              <div className="modal_summaryBox_bottomBox">
                <span>{openedProject.explain_long}</span>
              </div>
            </div>
          </div>
          <div className="modal_conatiner_bottom_rightBox">
            <div id="modalInnerScroll" className="modal_rightBox_Info">
              <ModalRightBoxInfos projectArray={openedProject} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
