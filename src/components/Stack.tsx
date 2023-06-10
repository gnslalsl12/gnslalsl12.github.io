import * as React from "react";
import { useState, useEffect, useRef } from "react";

const Stack = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect(); //뷰포트의 상단~aboutRef의 하단까지 거리
        if (rect.top >= window.innerHeight * -0.5 && rect.top <= window.innerHeight * 0.3) {
        } else {
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="page_about" ref={stackRef}>
      <div className="stack_topline" />
    </div>
  );
};

export default Stack;
