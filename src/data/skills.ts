import recoilImg from "../assets/images/skills/recoil.png";
import styledComponentsImg from "../assets/images/skills/styled-components.png";

export type Skill = { name: string; icon: string };
export type SkillGroup = { label: string; items: Skill[] };

const devicon = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

export const skillGroups: SkillGroup[] = [
  {
    label: "Front-End",
    items: [
      { name: "JavaScript", icon: devicon("javascript/javascript-original.svg") },
      { name: "TypeScript", icon: devicon("typescript/typescript-original.svg") },
      { name: "HTML", icon: devicon("html5/html5-original.svg") },
      { name: "CSS", icon: devicon("css3/css3-original.svg") },
      { name: "React", icon: devicon("react/react-original.svg") },
      { name: "React Native", icon: devicon("react/react-original.svg") },
      { name: "Vue", icon: devicon("vuejs/vuejs-original.svg") },
      { name: "Redux", icon: devicon("redux/redux-original.svg") },
      { name: "Recoil", icon: recoilImg },
      { name: "Sass", icon: devicon("sass/sass-original.svg") },
      { name: "Tailwind", icon: devicon("tailwindcss/tailwindcss-original.svg") },
      { name: "Styled Components", icon: styledComponentsImg },
      { name: "Three.js", icon: devicon("threejs/threejs-original.svg") },
    ],
  },
  {
    label: "Back-End",
    items: [
      { name: "JAVA", icon: devicon("java/java-original.svg") },
      { name: "Spring", icon: devicon("spring/spring-original.svg") },
      { name: "MySQL", icon: devicon("mysql/mysql-original.svg") },
      { name: "Python", icon: devicon("python/python-original.svg") },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: devicon("git/git-original.svg") },
      { name: "GitLab", icon: devicon("gitlab/gitlab-original.svg") },
      { name: "JIRA", icon: devicon("jira/jira-original.svg") },
      { name: "Blender", icon: devicon("blender/blender-original.svg") },
    ],
  },
];
