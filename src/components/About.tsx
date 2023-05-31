import * as React from 'react';
import { useState, useEffect } from 'react';
import profileImg from '../images/profileImgBuisness.png';

const About = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  return (
    <div id='page_about' style={{ padding: `140px ${windowWidth * 0.1}px` }}>
      <div
        className={`${
          windowWidth > 900
            ? 'about-content-container-row'
            : 'about-content-container-column'
        }`}
      >
        <div className='about-content-image'>
          <img
            src={profileImg}
            alt='profileImg'
            className='about-content-profileImg'
          />
        </div>
        <div className='about-content-text'>
          <span className='about-content-text-title'>
            어쩌구 저쩌구 큰 제목
          </span>
          <span className='about-content-text-explain'>
            어쩌구 저쩌구 작은 내용
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
