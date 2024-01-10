import React from "react";
import profileImage from "../assets/images/profileImage.jpg";

const About = () => {
  return (
    <div className="page_global_background page_about">
      <div className="page_global_title">
        <span>ABOUT</span>
      </div>
      <div className="page_global_topBox about_info">
        <div className="about_info_leftBox">
          <img src={profileImage} alt="프로필 이미지" className="about_info_leftBox_img" />
          <div className="about_info_leftBox_text">
            <div>Front-End 개발자 정훈입니다.</div>
            사용자 중심의 개발 방향성을 강화한 역량으로
            <br />
            다양한 UI/UX 설계, 다이나믹 에니메이션 구현,
            <br />
            직관적인 사용 환경 구성에 깊은 열정이 있습니다.
          </div>
        </div>
        <div className="about_info_rightBox"></div>
      </div>
    </div>
  );
};

export default About;
