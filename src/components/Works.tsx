import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import project2D_Worldy from '../images/project2D_Worldy.png';
import project2D_Eeum from '../images/project2D_E-Eum.png';
import project2D_RendezBoo from '../images/project2D_RendezBoo.png';
import project3D_Worldy from '../images/project3D_Worldy.png';
import project3D_Eeum from '../images/project3D_E-Eum.png';
import project3D_RendezBoo from '../images/project3D_RendezBoo.png';

type WorksItemType = {
  type: string;
  title: string;
  period: string;
  about_title: string;
  about_explain: string;
  link: string;
  img_2d: string;
  img_3d: string;
};

const Works = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const WorksItemList: WorksItemType[] = [
    {
      type: 'Team Project (Web)',
      title: 'Worldy',
      period: '2023.04~2023.05',
      about_title: 'Worldy 프로젝트 주제',
      about_explain: 'Worldy 프로젝트 소개',
      link: 'https://',
      img_2d: project2D_Worldy,
      img_3d: project3D_Worldy,
    },
    {
      type: 'Team Project (Mobile)',
      title: 'E-Eum',
      period: '2023.02~2023.04',
      about_title: '이음 프로젝트 주제',
      about_explain: '이음 프로젝트 소개',
      link: 'https://',
      img_2d: project2D_Eeum,
      img_3d: project3D_Eeum,
    },
    {
      type: 'Team Project (WEB)',
      title: 'Rendez-BOO',
      period: '2023.01~2023.02',
      about_title: '랑데부 프로젝트 주제',
      about_explain: '랑데부 프로젝트 소개',
      link: 'https://',
      img_2d: project2D_RendezBoo,
      img_3d: project3D_RendezBoo,
    },
  ];

  const [imageHoverState, setImageHoverState] = useState<boolean>(false);

  const [menuIndex, setMenuIndex] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const handleIndex = (input: boolean) => {
    setMenuIndex((prev) => {
      const increment = input ? 1 : WorksItemList.length - 1;
      return (prev + increment) % WorksItemList.length;
    });
  };

  const [tempBackground2D, setTempBackground2D] = useState<string>('');

  const changeEvent = (input: boolean | number) => {
    setFadeOut(true); //일단 사라지게 만들고
    setTempBackground2D(WorksItemList[menuIndex].img_2d);
    setTimeout(() => {
      //0.3초 후
      setTimeout(() => {
        setFadeOut(false); //사라지는 변수 초기화 => 생성 class 삽입
      }, 30);
      if (typeof input === 'boolean') {
        //원하는 메뉴로 아이템 변경
        handleIndex(input);
      } else {
        setMenuIndex(input);
      }
      setTempBackground2D('');
    }, 200);
  };

  useEffect(() => {
    WorksItemList.forEach((item) => {
      new Image().src = item.img_2d;
      new Image().src = item.img_3d;
    });
  }, []);

  return (
    <div id='page_works'>
      <div id='page_works_container'>
        <div id='container_texts'>
          <div className='text_pj_top_container'>
            <div
              className={`text_pj_type ${fadeOut ? 'fade_out' : 'fade_in_1st'}`}
            >
              {WorksItemList[menuIndex].type}
            </div>
            <div
              className={`text_pj_title ${
                fadeOut ? 'fade_out' : 'fade_in_2nd'
              }`}
            >
              {WorksItemList[menuIndex].title}
            </div>
            <div
              className={`text_pj_period ${
                fadeOut ? 'fade_out' : 'fade_in_3rd'
              }`}
            >
              {WorksItemList[menuIndex].period}
            </div>
          </div>
          <div className='text_pj_bottom_container'>
            <div
              className={`text_pj_about_title ${
                fadeOut ? 'fade_out' : 'fade_in_1st'
              }`}
            >
              {WorksItemList[menuIndex].about_title}
            </div>
            <div
              className={`text_pj_about_explain ${
                fadeOut ? 'fade_out' : 'fade_in_2nd'
              }`}
            >
              {WorksItemList[menuIndex].about_explain}
            </div>
            <a
              href={WorksItemList[menuIndex].link}
              className={`text_pj_link ${fadeOut ? 'fade_out' : 'fade_in_3rd'}`}
            >
              Link
            </a>
          </div>
        </div>
        <div
          id='container_images'
          className={`${imageHoverState ? 'spread_images' : 'shrink_images'}`}
          onMouseEnter={() => setImageHoverState(!fadeOut && true)}
          onMouseLeave={() => setImageHoverState(false)}
        >
          <div
            className='images_2d_box'
            style={{
              backgroundImage: `url(${tempBackground2D})`,
              backgroundSize: 'auto 100%',
              backgroundPosition: 'center',
            }}
          >
            <img
              src={WorksItemList[menuIndex].img_2d}
              alt='2dImage'
              className={`images_2d_content ${
                fadeOut ? 'fade_out_2d' : 'fade_in_image_2d'
              }`}
            />
          </div>
          <div className={`images_3d_box`}>
            <div
              className={`images_3d_shadow  ${
                fadeOut ? 'fade_out_3d_shadow' : 'fade_in_3d_shadow'
              }`}
            />
            <img
              src={WorksItemList[menuIndex].img_3d}
              alt='3dImage'
              className={`images_3d_content  ${
                fadeOut ? 'fade_out_3d_image' : 'fade_in_3d_image'
              } `}
            />
          </div>
        </div>
        <div id='container_menu'>
          <div className='menu_index'>
            {menuIndex + 1} / {WorksItemList.length}
          </div>
          <div className='menu_list'>
            {WorksItemList.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => changeEvent(index)}
                  className='menu_list_item'
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          <div className='menu_buttons'>
            <button
              className='menu_buttons_previous'
              onClick={() => changeEvent(true)}
            >
              <BsArrowLeft />
            </button>
            <button
              className='menu_buttons_next'
              onClick={() => changeEvent(false)}
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
