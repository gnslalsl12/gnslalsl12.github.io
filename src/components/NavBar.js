import React from "react";

export const NavBar = ({ isSticky }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={"page_navbar " + (isSticky ? "navbar_sticky" : "")}>
      <ul className="navbar_ul">
        <li onClick={() => scrollToSection("home")}>Home</li>
        <li onClick={() => scrollToSection("about")}>About</li>
        <li onClick={() => scrollToSection("skills")}>Skills</li>
        <li onClick={() => scrollToSection("projects")}>Projects</li>
        <li onClick={() => scrollToSection("extra")}>Extra</li> {/* 예: 'Extra'라는 페이지 제목 */}
        <li onClick={() => scrollToSection("contact")}>Contact</li>
      </ul>
    </div>
  );
};
