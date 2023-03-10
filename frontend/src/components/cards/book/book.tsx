import React, { useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { BsBasket2 } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { IBook } from "../../../models/book";
import { toTitleCase } from "../../../utils/string";
import { useActions, useData } from "../../../contexts/mainContext";
import "./book.css";
import UseToastContext from "../../../hooks/useToastContext";

export default function Book({ book }: { book: IBook }) {
  const [showButton, setShowButton] = useState<boolean>(false);
  const [reviews, setReviews] = useState([]);
  const addToast = UseToastContext();
  const state = useData();
  const { addToCart } = useActions();
  const navigate = useNavigate();

  const reserveBook = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    try {
      const response = await axiosInstance.post(`cart/add-to-cart`, {
        book_id: book.book_id,
        user_id: state.userId,
      });

      if (response.status === 201) {
        addToCart();
        addToast({
          title: "Book reserved successfully",
          message: "The book was reserved. Check cart page.",
        });
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        addToast({
          isError: true,
          title: "Book already reserved",
          message: "The book was already reserved. Check resrevation page.",
        });
      } else {
        addToast({
          title: "Couldn't reserve the book",
          message: `Error while trying to reserve the book. ${err.response.data.message}. Please try again later.`,
          isError: true,
        });
      }
    }
  };

  return (
    <div
      style={{ marginLeft: 80 }}
      onMouseEnter={() => {
        setShowButton(true);
      }}
      onMouseLeave={() => {
        setShowButton(false);
      }}
      onClick={() => {
        navigate("/book/" + book.book_id, { state: { book } });
      }}
    >
      <img
        style={{
          width: 350,
          height: 500,
          backgroundColor: "#C4C4C4",
          borderRadius: 20,
        }}
        src={book.image}
        alt=""
      />
      <div>
        {showButton === true ? (
          <div
            style={{ position: "absolute", marginTop: -130, marginLeft: 250 }}
          >
            <div
              onClick={reserveBook}
              style={{
                width: 79,
                height: 79,
                backgroundColor: "white",
                borderRadius: 50,
                marginTop: 20,
                color: "#143d81",
              }}
            >
              <BsBasket2
                size={35}
                style={{ marginLeft: 23, marginTop: 23 }}
              ></BsBasket2>
            </div>
          </div>
        ) : null}
      </div>

      <div className="d-flex flex-row mt-3">
        <IoStar color="#FF7A00" size={20}></IoStar>
        <h5 style={{ marginLeft: 10 }}>{book.rating}</h5>
        <BsCircleFill
          size={7}
          style={{ marginLeft: 7, marginTop: 9 }}
        ></BsCircleFill>
        <p style={{ fontSize: 20, marginLeft: 10, marginTop: -4 }}>
          {reviews.length} reviews
        </p>
      </div>
      <p style={{ color: "#143d81", fontSize: 22, fontWeight: 650 }}>
        {toTitleCase(book.book_genre)}
      </p>
      <h2 style={{ width: 350 }}>{toTitleCase(book.name)}</h2>
      <p style={{ opacity: 0.6, fontSize: 18 }}>{book.author}</p>
    </div>
  );
}
