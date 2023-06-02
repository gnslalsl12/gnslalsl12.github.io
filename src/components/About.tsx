import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import aboutBG from '../images/aboutBG.png';

const About = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const [popupText, setPopupText] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect(); //뷰포트의 상단~aboutRef의 하단까지 거리
        console.log('rect', rect.top);
        console.log('innerHeight', window.innerHeight);
        if (
          rect.top >= window.innerHeight * -0.5 &&
          rect.top <= window.innerHeight * 0.3
        ) {
          console.log('딱');
          setPopupText(true);
        } else {
          setPopupText(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [minimize, setMinimize] = useState<boolean>(false);

  useEffect(() => {
    if (windowWidth > 900) {
      setMinimize(false);
    } else {
      setMinimize(true);
    }
  }, [windowWidth]);

  return (
    <div id='page_about' ref={aboutRef}>
      {minimize && <div className='about_background_full' />}
      {!minimize && <div className='about_bottomline' />}
      <div id='about_container'>
        <div>
          <span
            id='about_title'
            className={`${popupText ? 'about_text' : 'about_text_hide'}`}
          >
            I'M READY TO FLIGHT!
            <br />
            JEONG HOON, {minimize && <br />}the FE Developer
          </span>
          <span
            id='about_explain'
            className={`${popupText ? 'about_text' : 'about_text_hide'}`}
          >
            안녕하세요, 프론트엔드 개발의 비상을 꿈꾸는 정훈입니다.
            <br />
            <br />
            사용자 중심의 디자인을 향한 끊임없는 도전으로,
            <br />
            성장하는 프론트엔드 개발자로서의 발전을 이루고 있습니다.
            <br />
            <br />
            아직 배워야 할 것이 많지만,
            {minimize && <br />}그것이 저를 성장시키는 원동력입니다.
            <br />
            언제나 배움의 자세로, 저의 '이륙'을 위한 준비가 되어있습니다!
            <br />
            <br />
            <span className='about_explain_keyword'>#성장</span>
            <span className='about_explain_keyword'>#발전</span>
            <span className='about_explain_keyword'>#이륙</span>
          </span>
        </div>
        {!minimize && <div className='about_background' />}
      </div>
    </div>
  );
};

export default About;
