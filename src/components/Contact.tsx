import * as React from "react";
import { useState, useEffect, useRef } from "react";

import bg from "../images/contact_background.png";

const Contact = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contactRef.current) {
        const rect = contactRef.current.getBoundingClientRect(); //뷰포트의 상단~aboutRef의 하단까지 거리
        if (rect.top >= window.innerHeight * -0.5 && rect.top <= window.innerHeight * 0.3) {
        } else {
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
    <div id="page_contact" ref={contactRef}>
      <div id="page_effect_top" />
      <div id="page_effect_bottom_contact" />

      <img src={bg} alt="background" id="page_background" />
      <div id="contact_container">
        <span className="page_contact_title">CONTACT</span>
        <div className="conatct_box">
          <span>PHONE : 010-9502-1903</span>
          <span>E-mail : wjdgnsxhsl12@gmail.com</span>
          <span>
            Github : <a href="https://github.com/gnslalsl12">https://github.com/gnslalsl12</a>
          </span>
        </div>
      </div>
      <div className="bright">
        <div className="bar" />
        <div className="light" />
      </div>
      <span id="footer">Copyright ⓒ 2023 JeongHoon All right reserved</span>
    </div>
  );
};

export default Contact;
