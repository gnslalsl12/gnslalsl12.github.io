import React from "react";
import { GoLinkExternal } from "react-icons/go";

const Contact = () => {
  return (
    <div className="page_global_background page_contact">
      <div className="page_contact_topTriangle">
        <div className="topTriangle-left" />
        <div className="topTriangle-right" />
      </div>
      <div className="page_global_title page_contact_title">
        <span>CONTACT</span>
      </div>
      <div className="page_global_box page_contact_container">
        <div>
          <div className="contact_category">EMAIL</div>
          <div>wjdgnsxhsl@naver.com</div>
        </div>
        <div>
          <div className="contact_category">Github</div>
          <a href="https://github.com/gnslalsl12" target="_blank" rel="noopener noreferrer">
            https://github.com/gnslalsl12 <GoLinkExternal className="contact_link_icon" />
          </a>
        </div>
        <div>
          <div className="contact_category">BAEKJOON</div>
          <a href="https://solved.ac/profile/wjdgnsxhsl" target="_blank" rel="noopener noreferrer">
            https://solved.ac/profile/wjdgnsxhsl <GoLinkExternal className="contact_link_icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
