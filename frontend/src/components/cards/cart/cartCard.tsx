import React from "react";
import { BsTrash } from "react-icons/bs";
import UseToastContext from "../../../hooks/useToastContext";
import axiosInstance from "../../../config/axiosInstance";
import { useActions } from "../../../contexts/mainContext";

export default function CartCard({
  bookReserved,
  finishAction,
}: {
  bookReserved: any;
  finishAction: Function;
}) {
  const addToast = UseToastContext();
  const { removeFromCart } = useActions();
  const removeBook = async () => {
    try {
      const response = await axiosInstance.post(`/cart/remove-from-cart`, {
        cart_id: bookReserved.cart_id,
      });

      if (response.status === 200) {
        removeFromCart();
        addToast({
          title: "Book removed from cart",
          message: "Operation was successful",
        });
      }
    } catch (err: any) {
      addToast({
        title: "Error while removing  book from car",
        message: `Error: ${err.response.data.message}. Please try again later.`,
        isError: true,
      });
    }
    finishAction();
  };
  return (
    <div
      className="d-flex flex-row justify-content-between m-5"
      style={{ borderBottom: "1px solid var(--color-gray)", paddingBottom: 30 }}
    >
      <div className="d-flex flex-row ">
        <img
          src={bookReserved.book.image}
          style={{ width: 150, height: 180, borderRadius: 10 }}
        />
        <div className="d-flex flex-column" style={{ marginLeft: 20 }}>
          <div
            style={{
              color: "#143d81",
              backgroundColor: "#93b8f5",
              borderRadius: 5,
              padding: 5,
              paddingInline: 35,
            }}
          >
            <h6> {bookReserved.book.book_genre}</h6>
          </div>
          <h5 style={{ color: "#143d81" }}>{bookReserved.book.name}</h5>
          <h6 style={{ color: "#143d81" }}>{bookReserved.book.author}</h6>
        </div>
      </div>
      <div
        onClick={removeBook}
        className="d-flex flex-column"
        style={{ marginRight: 50, justifyContent: "center" }}
      >
        <BsTrash size={30} color="#143d81" />
      </div>
    </div>
  );
}
