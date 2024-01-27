import React, { useState, useEffect, useRef } from "react";

const LazyImg = ({ src, alt, ...props }) => {
  const [isVisible, setIsVisible] = useState(false); //이미지 보이기 상태
  const imgRef = useRef(); //이미지 엘리먼트 참조를 위한 ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //엘리먼트가 뷰포트에 들어오면 isVisible = true
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            //관찰을 중지하여 리소스 낭비 방지
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // 현재 ref가 가리키고 있는 DOM 요소가 있을 경우에만 observe를 시작
    if (imgRef.current) {
      observer.observe(imgRef.current); //imgRef를 관찰 시작
    }

    return () => {
      // if (imgRef.current) {
      observer.disconnect(); //컴퍼넌트가 언마운트될 때 관찰 중지
      // }
    };
  }, []);

  return (
    <div className="carousel_container">
      {isVisible ? (
        <img ref={imgRef} src={src} alt={alt} {...props} className="carousel_image" />
      ) : (
        <div ref={imgRef} className="lazyLoader" />
      )}
    </div>
  );
};

export default LazyImg;
