import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LazyImg from "./LazyImg";

const ProjectImageCarousel = ({ images, currentIndex, setCurrentIndex }) => {
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
      <LazyImg src={images[currentIndex]} alt="carouselImg" />
      <div className="carousel_button_container">
        <button className="carousel_button carousel_button_previous" onClick={goToPrevious}>
          <IoIosArrowBack className="carousel_button_icon" />
        </button>
        <div className="carousel_button_imageIndex">
          {currentIndex + 1}/{images.length}
        </div>
        <button className="carousel_button carousel_button_next" onClick={goToNext}>
          <IoIosArrowForward className="carousel_button_icon" />
        </button>
      </div>
    </>
  );
};

export default ProjectImageCarousel;
