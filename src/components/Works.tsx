import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
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
      type: 'Team Project (WEB)',
      title: 'Worldy',
      period: '2023.04~2023.05',
      about_title: 'Worldy 게임 주제',
      about_explain: 'Worldy 게임 소개',
      link: 'https://',
      img_2d: project2D_Worldy,
      img_3d: project3D_Worldy,
    },
  ];

  const [imageHoverState, setImageHoverState] = useState<boolean>(false);

  const [menuIndex, setMenuIndex] = useState<number>(0);

  return (
    <div id='page_works'>
      <div id='page_works_container' className='tempboxW'>
        <div id='container_texts' className='tempboxR'>
          <div className='text_pj_top_container'>
            <div className='text_pj_type'>{WorksItemList[0].type}</div>
            <div className='text_pj_title'>{WorksItemList[0].title}</div>
            <div className='text_pj_period'>{WorksItemList[0].period}</div>
          </div>
          <div className='text_pj_bottom_container'>
            <div className='text_pj_about_title'>
              {WorksItemList[0].about_title}
            </div>
            <div className='text_pj_about_explain'>
              {WorksItemList[0].about_explain}
            </div>
            <a href={WorksItemList[0].link} className='text_pj_link'>
              Link <BsBoxArrowUpRight style={{ marginLeft: '10px' }} />
            </a>
          </div>
        </div>
        <div
          id='container_images'
          className={`${imageHoverState ? 'spread_images' : 'shrink_images'}`}
          onMouseEnter={() => setImageHoverState(true)}
          onMouseLeave={() => setImageHoverState(false)}
        >
          <div className='images_2d_box'>
            <img
              src={WorksItemList[0].img_2d}
              alt='2dImage'
              className='images_2d_content'
            />
          </div>
          <div className='images_3d_box'>
            <div className='images_3d_shadow' />
            <img
              src={WorksItemList[0].img_3d}
              alt='2dImage'
              className='images_3d_content'
            />
          </div>
        </div>
        <div id='container_menu' className='tempboxR'>
          <div className='menu_index'>
            {menuIndex + 1} / {WorksItemList.length}
          </div>
          <div className='menu_list'>
            <button className='menu_list_item'>{WorksItemList[0].title}</button>
            <button className='menu_list_item'>{WorksItemList[0].title}</button>
            <button className='menu_list_item'>{WorksItemList[0].title}</button>
          </div>
          <div className='menu_buttons'></div>
        </div>
      </div>
    </div>
  );
};

export default Works;
