import * as React from 'react';
import { useState, useEffect } from 'react';

import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import About from './components/About';

function App() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

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
  return (
    <div id='page_index'>
      <NavigationBar windowWidth={windowWidth} />
      <Main windowWidth={windowWidth} />
      <About windowWidth={windowWidth} />
    </div>
  );
}

export default App;
