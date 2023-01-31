import React, { useCallback, useEffect, useState } from "react";
import UseToastContext from "../../hooks/useToastContext";
import axiosInstance from "../../config/axiosInstance";
import Navbar from "../../components/shared/navbar/navbar";
import Footer from "../../components/shared/footer/footer";
import CartCard from "../../components/cards/cart/cartCard";
import { useData } from "../../contexts/mainContext";

export default function Cart() {
  const [booksReserved, setBooksReserved] = useState<[]>([]);
  const addToast = UseToastContext();
  const state = useData();

  const getCart = useCallback(async () => {
    try {
      const response = await axiosInstance.post(`/cart/get-user-cart`, {
        user_id: state.userId,
      });

      if (response.status === 200) {
        setBooksReserved(response.data);
      }
    } catch (err: any) {
      addToast({
        title: "Couldn't get  books",
        message: `Error: ${err.response.data.message}. Please try again later.`,
        isError: true,
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getCart();
    })();
  }, [getCart]);
  return (
    <div style={{ width: "99.1vw" }}>
      <Navbar />
      <div
        className="d-flex flex-row"
        style={{ backgroundColor: "#93b8f5", paddingTop: 20 }}
      >
        <h5 style={{ color: "#143d81", marginLeft: 100, marginBottom: 20 }}>
          Home / Cart{" "}
        </h5>
      </div>

      {booksReserved.map((bookReserved: any, index: number) => (
        <CartCard
          key={index}
          bookReserved={bookReserved}
          finishAction={() => getCart()}
        />
      ))}
      {booksReserved.length === 0 && (
        <div style={{ fontSize: 30, textAlign: "center", marginTop: 100 }}>
          No books found
        </div>
      )}

      <Footer />
    </div>
  );
}
