import * as React from "react";
import { useState, useEffect, useRef } from "react";

import NavigationBar from "./components/NavigationBar";
import Main from "./components/Main";
import About from "./components/About";
import Works from "./components/Works";
import Stack from "./components/Stack";
import Contact from "./components/Contact";

function App() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (windowWidth === 0) setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, []);

  useEffect(() => {
    // if (windowWidth === undefined) setWindowWidth(window.innerWidth);

    const handleResizeWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResizeWindowWidth);

    return () => {
      //컴포넌트 언마운트 시 리스너 제거용
      window.removeEventListener("resize", handleResizeWindowWidth);
    };
  }, []);

  // useEffect(() => {
  //   const handleScroll = (e: WheelEvent) => {
  //     e.preventDefault();

  //     const delta = e.deltaY;
  //     const scrollAmount = window.innerHeight / 3;

  //     if (delta < 0) {
  //       window.scroll({
  //         top: window.pageYOffset - scrollAmount,
  //         behavior: 'smooth',
  //       });
  //     } else {
  //       window.scroll({
  //         top: window.pageYOffset + scrollAmount,
  //         behavior: 'smooth',
  //       });
  //     }
  //   };

  //   window.addEventListener('wheel', handleScroll, { passive: false });

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  const [loadOtherPages, setLoadOtherPages] = useState<boolean>(false);

  const preLoadImages: string[] = [
    "./images/aboutBG.png",
    "./images/contact_background.png",
    "./images/works_background.png",
    "./images/HoonsFavicon.png",
    "./images/HoonsTextLogo.png",
    "./images/HoonsTextLogoWhite.png",
    "./images/Logo_Eeum.png",
    "./images/Logo_RendezBoo.png",
    "./images/Logo_Worldy.png",
    "./images/profile.png",
    "./images/profileImgBusiness.png",
    "./images/project_Eeum_Intro.png",
    "./images/project_RendezBoo_Intro.png",
    "./images/project_Worldy_Intro.png",
    "./images/project2D_E-Eum.png",
    "./images/project2D_RendezBoo.png",
    "./images/project2D_Worldy.png",
    "./images/project3D_E-Eum.png",
    "./images/project3D_RendezBoo.png",
    "./images/project3D_Worldy.png",
    "./images/tech_background.png",
    "./images/tool_logo_blender.png",
    "./images/tool_logo_css.png",
    "./images/tool_logo_gitlab.png",
    "./images/tool_logo_html.png",
    "./images/tool_logo_java.png",
    "./images/tool_logo_jira.png",
    "./images/tool_logo_js.png",
    "./images/tool_logo_mysql.png",
    "./images/tool_logo_python.png",
    "./images/tool_logo_react.png",
    "./images/tool_logo_reactnative.png",
    "./images/tool_logo_recoil.png",
    "./images/tool_logo_redux.png",
    "./images/tool_logo_sass.png",
    "./images/tool_logo_sketchup.png",
    "./images/tool_logo_spring.png",
    "./images/tool_logo_styledcomponent.png",
    "./images/tool_logo_tailwind.png",
    "./images/tool_logo_three.png",
    "./images/tool_logo_ts.png",
    "./images/tool_logo_vue.png",
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoadOtherPages(true);
    }, 2000);
  }, []);
  useEffect(() => {
    preLoadImages.forEach((image) => {
      new Image().src = image;
    });
  }, []);

  return (
    <div id="page_index">
      <div id="page_index_background" />
      <NavigationBar windowWidth={windowWidth} />
      <Main windowWidth={windowWidth} />
      {loadOtherPages && (
        <>
          <About windowWidth={windowWidth} />
          <Works windowWidth={windowWidth} />
          <Stack windowWidth={windowWidth} />
          <Contact windowWidth={windowWidth} />
        </>
      )}
    </div>
  );
}

export default App;
