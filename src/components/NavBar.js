import React, { useEffect } from "react";

export const NavBar = ({ isSticky }) => {
  return <div className={"page_navbar " + (isSticky ? "navbar_sticky" : "")}>NavBar</div>;
};
