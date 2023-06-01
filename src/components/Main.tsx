import * as React from 'react';
import { useState, useEffect } from 'react';

const Main = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  useEffect(() => {
    setMainFontSize(Math.max(35, windowWidth * 0.07));
  }, [windowWidth]);

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
      <div className='page_main_scrolldown_container'>
        <span className='page_main_scrolldown_text'> Scroll Down</span>
        <div className='page_main_scrolldown_arrow'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Main;
