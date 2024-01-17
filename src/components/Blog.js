import React, { useState } from "react";
import blog_algorithm from "../assets/images/blog/blog_algorithm.jpg";
import blog_solved from "../assets/images/blog/blog_solved.jpg";
import blog_cs from "../assets/images/blog/blog_cs.jpg";
import blog_languages from "../assets/images/blog/blog_languages.jpg";

const Blog = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCardList = () => {
    const blogContent = [
      {
        title: "Algorithm",
        imgSrc: blog_algorithm,
        update: "24-01-17",
        explain:
          "Java 및 JavaScript 언어를 기반으로 Boyer-Moore, KMP, Dijkstra 등 여러 알고리즘에 대해 공부하며 정리한 항목",
      },
      {
        title: "Solved Algorithms",
        imgSrc: blog_solved,

        update: "24-01-17",
        explain:
          "Java, JavaScript, MySQL 언어를 기반으로 백준 골드, 플레티넘, 다이아 난이도와 그에 준하는 타 사이트 알고리즘 문제 풀이를 기록한 항목",
      },
      {
        title: "CS",
        imgSrc: blog_cs,

        update: "24-01-17",
        explain:
          "네트워크, Front-End, React 등 다양한 CS에 대한 지식과 새로 알게된 정보들을 정리해 모아놓은 항목",
      },
      {
        title: "Languages",
        imgSrc: blog_languages,

        update: "24-01-17",
        explain:
          "Java, JavaScript, HTML, CSS, MySQL 등의 프로그래밍 언어들에 대해 공부하며 얻게된 활용 팁 및 정보들을 모아놓은 항목",
      },
    ];

    return (
      <ul>
        {blogContent.map((value, index) => {
          return (
            <li
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`${hoveredCard !== null && hoveredCard !== index ? "unhovered" : ""}`}
            >
              <div className="blogCard_topBox">
                <img src={value.imgSrc} alt={`${value.title} 이미지`} />
              </div>
              <div className="blogCard_middleBox">
                <h1>{value.title}</h1>
                <span>{value.update}</span>
              </div>
              <div className="blogCard_line" />
              <div className="blogCard_bottomBox">
                <p>{value.explain}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="page_global_background page_blog">
      <div className="page_global_title">
        <span>BLOG</span>
      </div>
      <div className="page_global_box blog_container">
        <div className="blog_container_cardBox">{getCardList()}</div>
      </div>
    </div>
  );
};

export default Blog;
