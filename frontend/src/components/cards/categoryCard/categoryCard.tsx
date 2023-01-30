import React from "react";
import "./categoryCard.css";

const CategoryCard: React.FC<{
  category: String;
  stock: Number;
}> = ({ category, stock }) => {
  return (
    <div className="category-card">
      <h6 className="category-title">{category}</h6>
      <p className="category-text">{stock.toString()}+ items</p>
    </div>
  );
};
export default CategoryCard;
