import React, { useEffect } from "react";

//ref : 관찰 요소에 대한 참조 (React ref)
//animationClass : 화면에 나타났을 때 적용할 CSS 클래스 이름
const useAnimationOnScroll = (ref, animationClass) => {
  //컴퓨넌트 마운트시 로직 실행

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0% 0% -30% 0%",
      threshold: 0,
    };
    const observer = new IntersectionObserver(
      (entries, observer) => {
        //observer가 관찰하는 모든 요소(entries)에 대해 반복
        entries.forEach((entry) => {
          //요소가 뷰포트에 들어오면(true) 해당 요소에 에니메이션 클래스 추가
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            //요소가 뷰포트에 들어온 후에는 더 이상 관찰 X
            observer.unobserve(entry.target);
          }
        });
      },
      //옵션 : 요소가 뷰포트의 ~이상 보일 때 콜백함수 실행 (0.5 : 50%)
      options
    );

    //참조된 요소(ref.curernt)에 대한 관찰 시작
    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    //컴포넌트가 언마운트 될 때 실행할 클린업 함수
    //관찰을 중단하고 observer 참조 해제
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
    //의존성 배열은 ref, animatinoClass가 변경될 때마다 훅 재실행
  }, [ref, animationClass]);
};

export default useAnimationOnScroll;
