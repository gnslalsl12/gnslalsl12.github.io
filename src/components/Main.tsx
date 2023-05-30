import * as React from 'react';
import { useState, useEffect } from 'react';

const Main = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    setMainFontSize(Math.max(40, windowWidth * 0.07));
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

  const [mainFontSize, setMainFontSize] = useState<number>(100);

  return (
    <div id='page_main'>
      <div className='page_main_background' />
      <div
        className='page_main_centercontent'
        style={{ height: `${mainFontSize}px` }}
      >
        <span
          className='page_main_centercontent_text'
          style={{ fontSize: `${mainFontSize}px` }}
        >
          HOONS PORTFOLIO
        </span>
      </div>
    </div>
  );
};

export default Main;
