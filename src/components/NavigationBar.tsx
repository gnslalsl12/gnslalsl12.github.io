import { useEffect, useState } from 'react';
import React from 'react';

const NavigationBar = ({
  windowWidth,
}: {
  windowWidth: number;
}): JSX.Element => {
  const SpreadedMenu = (): JSX.Element => {
    return (
      <div id='navigationbar_spreadedmenu'>
        <button>Intro</button>
        <button>About</button>
        <button>Works</button>
        <button>Stack</button>
        <button>Contact</button>
      </div>
    );
  };

  useEffect(() => {
    if (windowWidth > 900) setHamOpenState(false);
  }, [windowWidth]);

  const [hamOpenState, setHamOpenState] = useState<boolean>(false);
  const handleHamOpenState = () => {
    setHamOpenState(!hamOpenState);
  };

  return (
    <div
      id='component_navigationbar'
      style={hamOpenState ? { backgroundColor: 'rgba(0,0,0,0.7)' } : {}}
    >
      <img
        className='navigationbar_logo'
        src='images/HoonsTextLogoWhite.png'
        alt='LogoWhite'
      />
      {windowWidth > 900 ? (
        <SpreadedMenu />
      ) : (
        <>
          {hamOpenState && (
            <div id='listedmenu-popdown'>
              <button className='listedmenu-list lm-l-1'>Intro</button>
              <button className='listedmenu-list lm-l-2'>About</button>
              <button className='listedmenu-list lm-l-3'>Works</button>
              <button className='listedmenu-list lm-l-4'>Stack</button>
              <button className='listedmenu-list lm-l-5'>Contact</button>
            </div>
          )}
          <div id='listedmenu-container'>
            <input
              type='checkbox'
              id='checkbox'
              checked={hamOpenState}
              onChange={handleHamOpenState}
            />
            <label
              htmlFor='checkbox'
              className={`toggle ${hamOpenState ? 'checked' : ''}`}
            >
              <div
                className={`bars ${
                  hamOpenState ? 'checkedbar bar1-ch' : 'bar1'
                }`}
              ></div>
              <div
                className={`bars ${
                  hamOpenState ? 'checkedbar bar2-ch' : 'bar2'
                }`}
              ></div>
              <div
                className={`bars ${
                  hamOpenState ? 'checkedbar bar3-ch' : 'bar3'
                }`}
              ></div>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
