import React, { useContext } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import ActiveSectionContext from "../contexts/ActiveSectionContext";
import ScrollToSectionContext from "../contexts/ScrollToSectionContext";

const Bottom = () => {
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);

  const { scrollToSection } = useContext(ScrollToSectionContext);

  return (
    <div className="page_bottom_container">
      <button
        className="page_bttom_topButton"
        onClick={() => {
          setActiveSection("home");
          scrollToSection("home");
        }}
      >
        <MdKeyboardDoubleArrowUp />
      </button>
    </div>
  );
};
export default Bottom;
