import { useEffect, useState } from "react";
import { About } from "./components/About";
import Main from "./components/Main";
import { NavBar } from "./components/NavBar";

function App() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      //현재 스크롤의 위치 가져오기
      const currentScrollPosition = window.scrollY;

      //동적 뷰포트 높이(100vh) 가져오기
      const viewportHeight = window.innerHeight;

      //100vh 이상 움직였을 떄 sticky 처리
      if (!isSticky && currentScrollPosition >= viewportHeight + 50) {
        setIsSticky(true);
      } else if (isSticky && currentScrollPosition < viewportHeight) {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  return (
    <div className="page_app">
      <Main />
      <NavBar isSticky={isSticky} />
      <About />
    </div>
  );
}

export default App;
