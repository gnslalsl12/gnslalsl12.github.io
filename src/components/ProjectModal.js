import React, { useEffect, useState } from "react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import ModalRightBoxInfos from "./ModalRightBoxInfos";
import { IoLogoGithub } from "react-icons/io";
import myProjectLists from "../utils/myProjectLists";
import { useFetcher } from "react-router-dom";

const ProjectModal = ({ openProject, imageList, setModalState, modalState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openedProject, setOpenedProject] = useState({
    title: "",
    link: "",
    explain_short: "",
    prize: "",
    explain_long: "",
    my_works: [""],
    gainTitle: [],
    gainValue: [],
    info: ["", "", ""],
    used_skills: [[""], [""], [""]],
  });

  const [sidebarIndex, setSidebarIndex] = useState(0);

  const [modalContents, setModalContents] = useState([{ bigTitle: "", midTitle: [], value: [] }]);

  const closeModal = () => {
    setModalState(false);
    setTimeout(() => {
      //모달 꺼진 후 이미지 인덱스 0으로 초기화 (에니메이션 방지)
      setCurrentIndex(0);
      setSidebarIndex(0);
    }, 350);
  };

  useEffect(() => {
    setOpenedProject(myProjectLists[openProject]);
  }, [openProject]);

  useEffect(() => {
    setModalContents([
      { bigTitle: "주요 담당 기능 5가지", value: openedProject.my_works },
      { bigTitle: "강화 역량", midTitle: openedProject.gainTitle, value: openedProject.gainValue },
      {
        bigTitle: "수행 정보",
        midTitle: ["팀 구성", "역할", "제작 기간"],
        value: openedProject.info,
      },
      {
        bigTitle: "활용 기술",
        midTitle: ["Front-End", "Back-End", "Others"],
        value: openedProject.used_skills,
      },
    ]);
  }, [openedProject]);

  useEffect(() => {
    console.log(modalContents);
  }, [modalContents]);
  const modalContentsShow = () => {
    return (
      <>
        <div className="modal_contents_bigTitle">{modalContents[sidebarIndex].bigTitle}</div>
        {modalContents[sidebarIndex].midTitle === undefined
          ? modalContents[sidebarIndex].value.map((item, index) => {
              return (
                <li className="modal_contents_value" key={index}>
                  {item}
                </li>
              );
            })
          : modalContents[sidebarIndex].midTitle.map((item, index) => {
              return (
                <li className="modal_contents_midTitle" key={index}>
                  {item}
                  <li className="modal_contents_value">
                    {modalContents[sidebarIndex].value[index]}
                  </li>
                </li>
              );
            })}
      </>
    );
  };

  const modalSidebarContents = [
    <IoLogoGithub />,
    <IoLogoGithub />,
    <IoLogoGithub />,
    <IoLogoGithub />,
  ];

  return (
    <div
      className={`${modalState ? "popUp_wholePage" : ""} modal_wholePage`}
      onClick={() => closeModal()}
    >
      <div className="modal_wallPop_container" onClick={(event) => event.stopPropagation()}>
        <div className="modal_wallPop_topBox">
          <div className="modal_wallPop_topBox_textBox">
            <span className="openedProject_title">{openedProject.title}</span>
            <span className="openedProject_explain_short">{openedProject.explain_short}</span>
          </div>
          <a href={openedProject.link} target="_blank" rel="noopener noreferrer">
            <IoLogoGithub />
          </a>
        </div>
        <div className="modal_wallPop_bottomBox">
          <div className="modal_wallPop_bottomBox_textBox">{modalContentsShow()}</div>
          <div className="modal_wallPop_sideBar" onClick={(event) => event.stopPropagation()}>
            {modalSidebarContents.map((value, index) => {
              return (
                <button key={index} onClick={() => setSidebarIndex(index)}>
                  <div className="sidebar_button_icon">{value}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="modal_imageCarousel_container" onClick={() => closeModal()}>
        <div className="modal_imageCarousel" onClick={(event) => event.stopPropagation()}></div>
      </div>
    </div>
  );
};

export default ProjectModal;
