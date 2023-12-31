import React, { useContext, useEffect } from "react";
import ActiveSectionContext from "../contexts/ActiveSectionContext";
import ScrollToSectionContext from "../contexts/ScrollToSectionContext";

const NavBar = ({ isSticky }) => {
  const sectionArray = ["home", "about", "skills", "projects", "extra", "contact"];
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext);

  const { scrollToSection } = useContext(ScrollToSectionContext);

  return (
    <div className={"page_navbar " + (isSticky ? "navbar_sticky" : "")}>
      <ul className="navbar_ul">
        {sectionArray.map((section) => (
          <li
            key={section}
            onClick={() => {
              scrollToSection(section);
              setActiveSection(section);
            }}
            className={section === activeSection ? "navbar_li_active" : "navbar_li"}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
