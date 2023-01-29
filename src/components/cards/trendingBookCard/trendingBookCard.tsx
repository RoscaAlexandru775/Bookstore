import React from "react";
import { AiFillStar } from "react-icons/ai";
import { IBook } from "../../../models/book";
import { toTitleCase } from "../../../utils/string";

const TrendingBookCard: React.FC<{ book: IBook }> = ({ book }) => {
  return (
    <div className="d-flex flex-row mt-5">
      <img
        style={{ width: 200, height: 286, borderRadius: 20 }}
        src={book.image}
        alt=""
      />
      <div style={{ marginLeft: 20, width: 200, marginTop: -45 }}>
        <div className="d-flex flex-row mt-5">
          <div
            style={{
              backgroundColor: "#e0b7ed",
              borderRadius: 5,
              paddingInline: 20,
              paddingBlock: 10,
            }}
          >
            <div style={{ color: "#8D28AD" }}>
              {toTitleCase(book.bookGenre)}
            </div>
          </div>
          <div
            className="d-flex flex-row"
            style={{
              backgroundColor: "#FFD782",
              borderRadius: 5,
              marginLeft: 10,
              padding: 10,
              paddingInline: 15,
            }}
          >
            <AiFillStar size={25} color="#FF7A00"></AiFillStar>
            <div style={{ color: "#FF7A00", marginLeft: 5 }}>
              {book.rating.toPrecision(3)}
            </div>
          </div>
        </div>
        <h5 style={{ marginTop: 20 }}>{toTitleCase(book.name)}</h5>
        <p>{book.author}</p>
      </div>
    </div>
  );
};

export default TrendingBookCard;
