import React from "react";
import { IoStar } from "react-icons/io5";
import { IBook } from "../../../models/book";
import { toTitleCase } from "../../../utils/string";
import "./reviewedBook.css";

const ReviewedBook: React.FC<{ book: IBook }> = ({ book }) => {
  return (
    <div>
      <div style={{ borderRadius: 20 }}>
        <div className="rating-container">
          <div className="star-container">
            <IoStar size={15} style={{ marginTop: -5 }} color="white" />
          </div>
          <div className="rating">{book.rating.toPrecision(3)}</div>
        </div>
        <img
          className="reviewed-book-image"
          src={book.image}
          alt="book-image"
        />
      </div>
      <div style={{ textAlign: "center", width: 270 }}>
        <h4 style={{ color: "#83aff7", marginTop: 30 }}>{book.bookGenre}</h4>
        <h3>{toTitleCase(book.name)}</h3>
        <h5 className="author-info">{book.author}</h5>
      </div>
    </div>
  );
};

export default ReviewedBook;
