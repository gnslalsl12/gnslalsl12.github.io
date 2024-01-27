import React, { useEffect, useState } from "react";
import ScrollSectionContext from "./ScrollToSectionContext";
import scrollToSection from "../functions/scrollToSection";
import ActiveSectionContext from "./ActiveSectionContext";

const ContextProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("");

  const contextArray = [
    { context: ScrollSectionContext, value: { scrollToSection } },
    { context: ActiveSectionContext, value: { activeSection, setActiveSection } },
  ];

  const combinedProviders = contextArray.reduce((acc, { context, value }) => {
    return <context.Provider value={value}>{acc}</context.Provider>;
  }, children);

  return <>{combinedProviders}</>;
};

export default ContextProvider;
