import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Timeline from "../sections/Timeline";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import SectionDots from "../components/SectionDots";

type ScrollState = { scrollTo?: string };

export default function Portfolio() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as ScrollState | null)?.scrollTo;
    if (target) {
      const t = setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <SectionDots />
      <Hero />
      <div id="about"><About /></div>
      <div id="journey"><Timeline /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><Contact /></div>
    </>
  );
}
