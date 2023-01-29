import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import "./carouselControls.css";

const CarouselControls: React.FC<{ direction: string }> = ({ direction }) => {
  return (
    <>
      {direction === "right" ? (
        <div className="right-arrow">
          <FiArrowRight
            size={35}
            color="#8D28AD"
            className="arrow"
          ></FiArrowRight>
        </div>
      ) : (
        <div className="left-arrow">
          <FiArrowLeft
            size={35}
            color="#8D28AD"
            className="arrow"
          ></FiArrowLeft>
        </div>
      )}
    </>
  );
};
export default CarouselControls;
