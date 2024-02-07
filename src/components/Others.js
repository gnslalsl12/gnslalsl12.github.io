import React, { useRef } from "react";
import { GoLinkExternal } from "react-icons/go";
import { MdContentCopy } from "react-icons/md";
import useAnimationOnScroll from "../utils/useAnimationOnScroll";
const Others = () => {
  const othersTitleRef = useRef();
  const othersListRef = useRef();

  useAnimationOnScroll(othersTitleRef, "titleAnimation");
  useAnimationOnScroll(othersListRef, "othersListAnimation");

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
    <div className="page_global_background page_others">
      <div className="page_others_topTriangle">
        <div className="topTriangle-left" />
        <div className="topTriangle-right" />
      </div>
      <div className="page_global_title page_others_title" ref={othersTitleRef}>
        <span>OTHERS</span>
      </div>
      <div className="page_global_box page_others_container" ref={othersListRef}>
        <div>
          <div className="others_category">EMAIL</div>
          <button onClick={() => copyText()}>
            wjdgnsxhsl@naver.com <MdContentCopy className="others_icon" />
          </button>
        </div>
        <div>
          <div className="others_category">Github</div>
          <a href="https://github.com/gnslalsl12" target="_blank" rel="noopener noreferrer">
            https://github.com/gnslalsl12 <GoLinkExternal className="others_icon" />
          </a>
        </div>
        <div>
          <div className="others_category">BAEKJOON</div>
          <a href="https://solved.ac/profile/wjdgnsxhsl" target="_blank" rel="noopener noreferrer">
            https://solved.ac/profile/wjdgnsxhsl <GoLinkExternal className="others_icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Others;
