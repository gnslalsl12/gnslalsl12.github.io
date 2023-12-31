import React from "react";

const ActiveSectionContext = React.createContext({
  activeSection: "", //기본값
  setActiveSection: () => {}, //기본 함수 형태
});

export default ActiveSectionContext;
