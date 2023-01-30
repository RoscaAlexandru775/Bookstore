import React from "react";
import "./infoCard.css";
import { IoStorefrontSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

const InfoCard: React.FC<{
  backgroundColor: string;
  textColor: string;
}> = ({ backgroundColor, textColor }) => {
  return (
    <div
      className="d-flex flex-row mt-5 info-container"
      style={{ backgroundColor: backgroundColor }}
    >
      <div>
        <div className="display-row" style={{ justifyContent: "space-evenly" }}>
          <IoStorefrontSharp size={45} color={textColor} />
          <h3 className="info-card-text" style={{ color: textColor }}>
            268
          </h3>
        </div>
        <p className="info-card-description" style={{ color: textColor }}>
          Our stores around the world
        </p>
      </div>
      <div>
        <div className="display-row" style={{ justifyContent: "space-evenly" }}>
          <FaUsers size={45} color={textColor}></FaUsers>
          <h3 className="info-card-text" style={{ color: textColor }}>
            25,634
          </h3>
        </div>
        <p className="info-card-description" style={{ color: textColor }}>
          Our happy customers
        </p>
      </div>
      <div>
        <div className="display-row" style={{ justifyContent: "space-evenly" }}>
          <ImBooks size={45} color={textColor}></ImBooks>
          <h3 className="info-card-text" style={{ color: textColor }}>
            65+k
          </h3>
        </div>
        <p
          className="info-card-description"
          style={{ marginLeft: 10, color: textColor }}
        >
          Book Collections
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
