import React from "react";

export const NavBar = (props) => {
  const sectionArray = ["home", "about", "skills", "projects", "extra", "contact"];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={"page_navbar " + (props.isSticky ? "navbar_sticky" : "")}>
      <ul className="navbar_ul">
        {sectionArray.map((section) => (
          <li
            key={section}
            onClick={() => scrollToSection(section)}
            className={section === props.activeSection ? "navbar_li_active" : "navbar_li"}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};
