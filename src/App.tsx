import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import About from './components/About';
import Works from './components/Works';

function App() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  useEffect(() => {
    if (windowWidth === 0) setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    // if (windowWidth === undefined) setWindowWidth(window.innerWidth);

    const handleResizeWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResizeWindowWidth);

    return () => {
      //컴포넌트 언마운트 시 리스너 제거용
      window.removeEventListener('resize', handleResizeWindowWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY;
      const scrollAmount = window.innerHeight / 3;

      if (delta < 0) {
        window.scroll({
          top: window.pageYOffset - scrollAmount,
          behavior: 'smooth',
        });
      } else {
        window.scroll({
          top: window.pageYOffset + scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const [loadOtherPages, setLoadOtherPages] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadOtherPages(true);
    }, 2000);
  }, []);

  return (
    <div id='page_index' ref={topRef}>
      <div id='page_index_background' />
      <NavigationBar windowWidth={windowWidth} />
      <Main windowWidth={windowWidth} />
      {loadOtherPages && (
        <>
          <About windowWidth={windowWidth} />
          <Works windowWidth={windowWidth} />
        </>
      )}
    </div>
  );
}

export default App;
