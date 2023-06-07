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
import Logo_Worldy from '../images/Logo_Worldy.png';
import Logo_Eeum from '../images/Logo_Eeum.png';
import Logo_RendezBoo from '../images/Logo_RendezBoo.png';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type WorksItemType = {
  type: string;
  title: string;
  period: string;
  about_title: string;
  about_explain: string;
  link: string;
  img_2d: string;
  img_3d: string;
  logo: string;
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
      logo: Logo_Worldy,
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
      logo: Logo_Eeum,
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
      logo: Logo_RendezBoo,
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
      logo: Logo_RendezBoo,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    draggable: false,
    pauseOnHover: true,
    swipe: false,
    touchMove: false,
    // rtl: true,
  };

  return (
    <div id='page_works'>
      <div id='works_container'>
        <div className='works_flows_box'></div>
        <div className='works_menu_box'>
          <div className='works_menu_top'></div>
          <div className='works_menu_bottom'>
            <Slider {...settings}>
              <div>
                <h3>Slide 6</h3>
              </div>
              <div>
                <h3>Slide 1</h3>
              </div>
              <div>
                <h3>Slide 2</h3>
              </div>
              <div>
                <h3>Slide 3</h3>
              </div>
              <div>
                <h3>Slide 4</h3>
              </div>
              <div>
                <h3>Slide 5</h3>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
