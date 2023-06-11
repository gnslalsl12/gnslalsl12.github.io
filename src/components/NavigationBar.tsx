import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-scroll";

const NavigationBar = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const SpreadedMenu = (): JSX.Element => {
    return (
      <div id="navigationbar_spreadedmenu">
        <Link to="page_main" smooth={true} className="linkcomp">
          Intro
        </Link>
        <Link to="page_about" smooth={true} className="linkcomp">
          About
        </Link>
        <Link to="page_works" smooth={true} className="linkcomp">
          Works
        </Link>
        <Link to="page_stack" smooth={true} className="linkcomp">
          Stack
        </Link>
        <Link to="page_contact" smooth={true} className="linkcomp">
          Contact
        </Link>
      </div>
    );
  };

  useEffect(() => {
    if (windowWidth > 900) {
      setHamOpenState(false);
      console.log("ㅈ가이짐");
    }
  }, [windowWidth]);

  const [hamOpenState, setHamOpenState] = useState<boolean>(false);
  const handleHamOpenState = () => {
    setHamOpenState(!hamOpenState);
  };

  return (
    <div
      id="component_navigationbar"
      style={hamOpenState ? { backgroundColor: "rgba(0,0,0,0.7)" } : {}}
    >
      <img className="navigationbar_logo" src="images/HoonsTextLogoWhite.png" alt="LogoWhite" />
      {windowWidth > 900 ? (
        <SpreadedMenu />
      ) : (
        <>
          {hamOpenState && (
            <div id="listedmenu-popdown">
              <Link
                to="page_main"
                smooth={true}
                className="listedmenu-list lm-l-1 linkcomp"
                onClick={() => setHamOpenState(false)}
              >
                Intro
              </Link>
              <Link
                to="page_about"
                smooth={true}
                className="listedmenu-list lm-l-2 linkcomp"
                onClick={() => setHamOpenState(false)}
              >
                About
              </Link>
              <Link
                to="page_works"
                smooth={true}
                className="listedmenu-list lm-l-3 linkcomp"
                onClick={() => setHamOpenState(false)}
              >
                Works
              </Link>
              <Link
                to="page_stack"
                smooth={true}
                className="listedmenu-list lm-l-4 linkcomp"
                onClick={() => setHamOpenState(false)}
              >
                Stack
              </Link>
              <Link
                to="page_contact"
                smooth={true}
                className="listedmenu-list lm-l-5 linkcomp"
                onClick={() => setHamOpenState(false)}
              >
                Contact
              </Link>
            </div>
          )}
          <div id="listedmenu-container">
            <input
              type="checkbox"
              id="checkbox"
              checked={hamOpenState}
              onChange={handleHamOpenState}
            />
            <label htmlFor="checkbox" className={`toggle ${hamOpenState ? "checked" : ""}`}>
              <div className={`bars ${hamOpenState ? "checkedbar bar1-ch" : "bar1"}`}></div>
              <div className={`bars ${hamOpenState ? "checkedbar bar2-ch" : "bar2"}`}></div>
              <div className={`bars ${hamOpenState ? "checkedbar bar3-ch" : "bar3"}`}></div>
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
