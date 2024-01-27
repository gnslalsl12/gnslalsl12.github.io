import React from "react";

const ModalRightBoxInfos = ({ projectArray }) => {
  return (
    <>
      <div className="modal_rightBox_my_work">
        <h1>담당 기능</h1>
        <ul>
          {projectArray.rightBox.my_works.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      </div>
      <div className="modal_rightBox_gain">
        <h1>강화 역량</h1>
        <ul>
          {projectArray.rightBox.gain.map((value, index) => {
            return (
              <li key={index}>
                <span className="gain_big">{value.big}</span>
                <br />
                <span className="gain_small">{value.small}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="modal_rightBox_info">
        <h1>수행 정보</h1>
        <ul>
          <li>
            <div>팀 구성</div>
            <div>{projectArray.rightBox.info[0]}</div>
          </li>
          <li>
            <div>역할</div>
            <div>{projectArray.rightBox.info[1]}</div>
          </li>
          <li>
            <div>제작 기간</div>
            <div>{projectArray.rightBox.info[2]}</div>
          </li>
        </ul>
      </div>
      <div className="modal_rightBox_used_skills">
        <h1>활용 기술</h1>
        <ul>
          {projectArray.rightBox.used_skills.map((array, arrayIndex) => {
            return (
              <ul key={arrayIndex}>
                <h2>{arrayIndex === 0 ? "Front-End" : arrayIndex === 1 ? "Back-End" : "Others"}</h2>
                <ul>
                  {array.map((value, index) => {
                    return <li key={index}>{value}</li>;
                  })}
                </ul>
              </ul>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ModalRightBoxInfos;
