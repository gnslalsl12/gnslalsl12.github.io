import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
      <img className="carousel_image" src={images[currentIndex]} alt="carousel" />
      <div className="carousel_buttonContainer">
        <button onClick={goToPrevious}>
          <div className="carousel_button_previous" />
          <IoIosArrowBack className="carousel_button_icon" />
        </button>
        <button onClick={goToNext}>
          <div className="carousel_button_next" />
          <IoIosArrowForward className="carousel_button_icon" />
        </button>
      </div>
    </>
  );
};

export default ProjectImageCarousel;
