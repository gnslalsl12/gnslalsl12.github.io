import { useEffect, useState } from "react";
import { About } from "./components/About";
import Home from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Extra } from "./components/Extra";
import { Contact } from "./components/Contact";
import { throttle } from "./utils/throttle";

function App() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sectionArray = ["contact", "extra", "projects", "skills", "about", "home"];

  useEffect(() => {
    const handleScroll = () => {
      //현재 스크롤의 위치 가져오기
      console.log("스크롤");
      const currentScrollPosition = window.scrollY;

      //동적 뷰포트 높이(100vh) 가져오기
      const viewportHeight = window.innerHeight;

      //Navbar Sticky 설정 useEffect
      //100vh 이상 움직였을 떄 sticky 처리
      if (!isSticky && currentScrollPosition >= viewportHeight + 49) {
        setIsSticky(true);
      } else if (isSticky && currentScrollPosition < viewportHeight) {
        setIsSticky(false);
      }

      //Navbar Text 효과 설정 useEffect
      for (const section of sectionArray) {
        if (currentScrollPosition >= document.getElementById(section).offsetTop) {
          setActiveSection(section);
          break;
        }
      }
    };

    const throttleHandleScroll = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttleHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttleHandleScroll);
    };
  }, [isSticky, activeSection]);

  return (
    <div className="page_app">
      <div id="home">
        <Home />
      </div>
      <NavBar isSticky={isSticky} activeSection={activeSection} />
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="extra">
        <Extra />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}

export default App;
