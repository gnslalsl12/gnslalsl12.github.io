import React from "react";

import { MdDevices } from "react-icons/md";
import { FiFeather } from "react-icons/fi";
import { IoRocketOutline } from "react-icons/io5";
import { TbBulb } from "react-icons/tb";

const Skills = () => {
  const skillsContent = () => {
    const skillsArray = [
      {
        title: "Intuitive",
        icon: <TbBulb color="white" />,
        summary: "직관적인 UI/UX 디자인을 추구하여\n빠르고 쉬운 사용 환경을 제공합니다.",
      },
      {
        title: "Efficiency",
        icon: <FiFeather color="white" />,
        summary: "효율적인 프로그래밍을 위해 노력하며\n최적의 상호작용을 추구합니다",
      },
      {
        title: "Dynamic",
        icon: <IoRocketOutline color="white" />,
        summary: "다양한 에니메이션과 동적인 반응으로\n페이지에 생동감을 더합니다.",
      },
      {
        title: "Responsive",
        icon: <MdDevices color="white" />,
        summary: "최고의 사용 경험을 위해\n반응형 페이지를 구현합니다.",
      },
    ];

    return (
      <ul>
        {skillsArray.map((item, index) => {
          return (
            <li key={index} className="skills_summary_item">
              <div className="skills_summary_item_icon">
                <div className="skills_summary_item_icon_value">{item.icon}</div>
              </div>
              <div className="skills_summary_item_title">{item.title}</div>
              <div className="skills_summary_item_summary">{item.summary}</div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="page_global_background page_skills">
      <div className="page_global_title">
        <span>SKILLS</span>
      </div>
      <div className="page_global_topBox skills_summary">{skillsContent()}</div>
      <div className="skills_bottomBox"></div>
    </div>
  );
};

export default Skills;
