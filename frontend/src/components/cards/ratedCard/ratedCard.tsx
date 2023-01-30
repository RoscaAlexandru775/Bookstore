import React from "react";
import { IBook } from "../../../models/book";
import { toTitleCase } from "../../../utils/string";
import StarRating from "../../shared/starRating/starRating";
import "./ratedCard.css";

const RatedBook: React.FC<{ book: IBook }> = ({ book }) => {
  return (
    <div>
      <div style={{ borderRadius: 20 }}>
        <img className="image" src={book.image} alt="" />
      </div>
      <StarRating rating={book.rating}></StarRating>
      <div style={{ marginTop: 10, width: 170, height: 100 }}>
        <h5>{toTitleCase(book.name)}</h5>
        <h6 className="author-info">{book.author}</h6>
      </div>
    </div>
  );
};
export default RatedBook;
