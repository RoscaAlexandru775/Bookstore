import React from "react";
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import "./starRating.css";

interface Props {
  rating: number;
  size?: number;
}

const StarRating: React.FC<Props> = (props) => {
  const rating = Math.round(props.rating * 2) / 2; // Round to nearest half
  const stars = [];
  for (let i = 0; i < rating; i++) {
    if (i + 0.5 === rating) {
      stars.push(<IoStarHalf size={props.size} key={i} color="#FF7A00" />);
    } else {
      stars.push(<IoStar size={props.size} key={i} color="#FF7A00" />);
    }
  }
  if (stars.length < 5) {
    for (let i = stars.length + 1; i <= 5; i++) {
      stars.push(<IoStar size={props.size} key={i} color="#E5E5E5" />);
    }
  }
  return <div>{stars}</div>;
};

export default StarRating;
