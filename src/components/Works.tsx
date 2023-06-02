import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import project2D_Worldy from '../images/project2D_Worldy.png';
import project2D_Eeum from '../images/project2D_E-Eum.png';
import project2D_RendezBoo from '../images/project2D_RendezBoo.png';

type WorksItemType = {
  projectTitle: string;
  projectType: string;
  projectExplain: string;
  project2DSrc: string;
  project3DSrc: string;
  projectLink: string;
  myAfford: string[];
  projectSkills: string[];
};

const Works = ({ windowWidth }: { windowWidth: number }): JSX.Element => {
  const ProjectList: WorksItemType[] = [
    {
      projectTitle: 'Worldy',
      projectType: '팀 프로젝트 (웹)',
      projectExplain:
        '월디게임 어쩌구저쩌구 설명 어쩌구적ㅇ너미소ㅓㄴ이ㅗ서니소ㅓㅁ나솸놋니ㅗ서ㅣ나ㅚ',
      project2DSrc: project2D_Worldy,
      project3DSrc: '../images/',
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
    {
      projectTitle: '이음',
      projectType: '팀 프로젝트 (모바일)',
      projectExplain:
        '월디게임 어쩌구저쩌구 설명 어쩌구적ㅇ너미소ㅓㄴ이ㅗ서니소ㅓㅁ나솸놋니ㅗ서ㅣ나ㅚ',
      project2DSrc: project2D_Eeum,
      project3DSrc: '../images/',
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
    {
      projectTitle: 'Rendez-Boo',
      projectType: '팀 프로젝트 (웹)',
      projectExplain:
        '월디게임 어쩌구저쩌구 설명 어쩌구적ㅇ너미소ㅓㄴ이ㅗ서니소ㅓㅁ나솸놋니ㅗ서ㅣ나ㅚ',
      project2DSrc: project2D_RendezBoo,
      project3DSrc: '../images/',
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div id='page_works'>
      <div className='page_works_container'>
        <div className='page_works_texts'>
          <span className='project_type'>
            {ProjectList[selectedIndex].projectType}
          </span>
          <span
            className='project_title'
            style={{
              fontFamily:
                selectedIndex === 1
                  ? 'Pretendard-ExtraBold'
                  : 'Montserrat-ExtraBold',
            }}
          >
            {ProjectList[selectedIndex].projectTitle}
          </span>
          <span className='project_explain'>
            {ProjectList[selectedIndex].projectExplain}
          </span>
          <a
            className='project_link'
            href={ProjectList[selectedIndex].projectLink}
          >
            Link <BsBoxArrowUpRight />
          </a>
        </div>
        <div className='page_works_images tempboxB'>
          <div className='project_image tempboxR'>
            <img
              src={ProjectList[selectedIndex].project2DSrc}
              alt='Project 2D'
              className='project_image_2d tempboxW'
            />
            <img
              src={ProjectList[selectedIndex].project3DSrc}
              alt='Project 3D'
              className='project_image_3d'
            />
          </div>
          <div className='project_skill_box'>
            {ProjectList[selectedIndex].projectSkills.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
        <div className='page_works_indexes tempboxR'>
          {ProjectList.map((item, index) => {
            return (
              <button key={index} onClick={() => setSelectedIndex(index)}>
                {item.projectTitle}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Works;
