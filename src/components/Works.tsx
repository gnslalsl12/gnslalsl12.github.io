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
  projectTitle: string;
  projectType: string;
  projectExplain: JSX.Element;
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
      projectExplain: <>디자인 맘에 안든다</>,
      project2DSrc: project2D_Worldy,
      project3DSrc: project3D_Worldy,
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
    {
      projectTitle: '이음',
      projectType: '팀 프로젝트 (모바일)',
      projectExplain: <>디자인 맘에 안든다</>,
      project2DSrc: project2D_Eeum,
      project3DSrc: project3D_Eeum,
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
    {
      projectTitle: 'Rendez-Boo',
      projectType: '팀 프로젝트 (웹)',
      projectExplain: <>디자인 맘에 안든다</>,
      project2DSrc: project2D_RendezBoo,
      project3DSrc: project3D_RendezBoo,
      projectLink: 'https://gnslalsl12.github/~',
      myAfford: ['페이지 구성', '게임 디자인', '페이지 알고리즘'],
      projectSkills: ['TypeScript', 'React', 'Three.js'],
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [hoveredProject, setHoveredProject] = useState<number>(-1);

  useEffect(() => {
    console.log(hoveredProject);
  }, [hoveredProject]);

  return (
    <div id='page_works'>
      <div className='page_works_container'>
        {/* {changeContent && (
          <> */}
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
        <div className='page_works_visuals '>
          <div
            className='project_image '
            onMouseEnter={() => setHoveredProject(selectedIndex)}
            onMouseLeave={() => setHoveredProject(-1)}
          >
            <img
              src={ProjectList[0].project2DSrc}
              alt='Project 2D'
              className={`project_image_2d  ${
                selectedIndex === 0 ? 'image_2d_appear' : 'image_2d_disappear'
              }
              ${hoveredProject === 0 ? 'hovered2D' : ''}`}
            />
            <img
              src={ProjectList[1].project2DSrc}
              alt='Project 2D'
              className={`project_image_2d  ${
                selectedIndex === 1 ? 'image_2d_appear' : 'image_2d_disappear'
              }
                ${hoveredProject === 1 ? 'hovered2D' : ''}
              `}
            />
            <img
              src={ProjectList[2].project2DSrc}
              alt='Project 2D'
              className={`project_image_2d  ${
                selectedIndex === 2 ? 'image_2d_appear' : 'image_2d_disappear'
              } ${hoveredProject === 2 ? 'hovered2D' : ''}`}
            />
            <img
              src={ProjectList[0].project3DSrc}
              alt='Project 3D'
              className={`project_image_3d  ${
                selectedIndex === 0 ? 'image_3d_appear' : 'image_3d_disappear'
              }
              ${hoveredProject === 0 ? 'hovered3D' : ''}
              `}
            />
            <img
              src={ProjectList[1].project3DSrc}
              alt='Project 3D'
              className={`project_image_3d  ${
                selectedIndex === 1 ? 'image_3d_appear' : 'image_3d_disappear'
              }
              ${hoveredProject === 1 ? 'hovered3D' : ''}
              `}
            />
            <img
              src={ProjectList[2].project3DSrc}
              alt='Project 3D'
              className={`project_image_3d  ${
                selectedIndex === 2 ? 'image_3d_appear' : 'image_3d_disappear'
              }
              ${hoveredProject === 2 ? 'hovered3D' : ''}
              `}
            />
          </div>
          <div className='project_skill_box'>
            {ProjectList[selectedIndex].projectSkills.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
          </div>
        </div>
        <div className='page_works_indexes '>
          {ProjectList.map((item, index) => {
            return (
              <button key={index} onClick={() => setSelectedIndex(index)}>
                {item.projectTitle}
              </button>
            );
          })}
        </div>
        {/* </>
        )} */}
      </div>
    </div>
  );
};

export default Works;
