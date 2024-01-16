import React, { useState } from "react";

const ProjectImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <button onClick={goToPrevious}>이전</button>
      <img src={images[currentIndex]} alt="carousel" />
      <button onClick={goToNext}>다음</button>
    </>
  );
};

export default ProjectImageCarousel;
