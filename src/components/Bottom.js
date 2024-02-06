import React, { useContext } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ActiveSectionContext from "../contexts/ActiveSectionContext";
import ScrollToSectionContext from "../contexts/ScrollToSectionContext";
import { FaInstagram } from "react-icons/fa";
const Bottom = () => {
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);

  const { scrollToSection } = useContext(ScrollToSectionContext);

  return (
    <div className="page_bottom_container">
      <button
        className="page_bottom_topButton"
        onClick={() => {
          setActiveSection("home");
          scrollToSection("home");
        }}
      >
        <MdKeyboardDoubleArrowUp />
      </button>
      <div className="page_bottom_contents">
        <div className="bottom_contents_buttonList">
          {/* <a>
            <FaInstagram />
          </a> */}
          <a
            href="https://www.instagram.com/jeong_hoooon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="bottom_contents_rights">
          <br />© 2024 JeongHoon, All rights reserved.
        </div>
      </div>
    </div>
  );
};
export default Bottom;
