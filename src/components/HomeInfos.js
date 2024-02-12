import React, { useContext } from "react";
import ScrollToSectionContext from "../contexts/ScrollToSectionContext";
import ActiveSectionContext from "../contexts/ActiveSectionContext";

const HomeInfos = () => {
  const { scrollToSection } = useContext(ScrollToSectionContext);
  const setActiveSection = useContext(ActiveSectionContext).setActiveSection;

  const moveTo = () => {
    scrollToSection("about");
    window.preventScrollUpdate = true;
    setActiveSection("about");
  };

  return (
    <div className="home_infos">
      <h1>
        Hi, I'm <strong>Jeong Hoon</strong>
        .<br />
        I'm a SW Developer.
      </h1>
      <button onClick={moveTo}>More</button>
    </div>
  );
};

export default HomeInfos;
