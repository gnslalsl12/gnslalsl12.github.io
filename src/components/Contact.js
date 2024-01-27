import React from "react";
import { GoLinkExternal } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
const Contact = () => {
  const copyText = async () => {
    try {
      //문자열을 클립보드에 복사
      await navigator.clipboard.writeText("wjdgnsxhsl@naver.com");
      alert("Copied to clipboard!");
    } catch (err) {
      console.log("복사 기능 에러", err);
    }
  };

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
          <button onClick={() => copyText()}>
            wjdgnsxhsl@naver.com <MdContentCopy className="contact_icon" />
          </button>
        </div>
        <div>
          <div className="contact_category">Github</div>
          <a href="https://github.com/gnslalsl12" target="_blank" rel="noopener noreferrer">
            https://github.com/gnslalsl12 <GoLinkExternal className="contact_icon" />
          </a>
        </div>
        <div>
          <div className="contact_category">BAEKJOON</div>
          <a href="https://solved.ac/profile/wjdgnsxhsl" target="_blank" rel="noopener noreferrer">
            https://solved.ac/profile/wjdgnsxhsl <GoLinkExternal className="contact_icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
