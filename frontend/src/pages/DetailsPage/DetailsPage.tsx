import React, { useCallback, useEffect, useState } from "react";
import StarRating from "../../components/shared/starRating/starRating";
import BooksCarousel from "../../components/carousel/booksCarousel";
import Footer from "../../components/shared/footer/footer";
import Navbar from "../../components/shared/navbar/navbar";
import axiosInstance from "../../config/axiosInstance";
import { toTitleCase } from "../../utils/string";
import { useLocation } from "react-router-dom";
import { BsBasket2 } from "react-icons/bs";
import { IBook } from "../../models/book";
import "./DetailsPage.css";

const DetailsPage: React.FC = () => {
  const location = useLocation();

  const [trendingBooks, setTrendingBooks] = useState<IBook[]>([]);
  const [book, setBook] = useState<IBook>(location.state.book as IBook);
  // const book = {
  //   id: 1,
  //   name: "The Alchemist",
  //   description:
  //     "The Alchemist is a novel by Paulo Coelho that was first published in 1988.",
  //   rating: 4,
  //   author: "Paulo Coelho",
  //   bookGenre: "Adventure",
  //   image: "https://i.imgur.com/1Q1ZQ2r.jpg",
  // };

  const [loading, setLoading] = useState(true);
  const [reviews] = useState([]);

  const reserveBook = async (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    try {
      const response = await axiosInstance.post(
        `borrowed-book/reserve-book/${book.id}`
      );
      if (response.status === 200) {
        // dispatch({ type: ADD_TO_CART });
        // addToast({
        //   title: "Book reserved successfully",
        //   message: "The book was reserved. Check resrevation page.",
        // });
      }
    } catch (err: any) {
      //   addToast({
      //     title: "Couldn't reserve the book",
      //     message: `Error while trying to reserve the book. ${err.response.data.message}. Please try again later.`,
      //     isError: true,
      //   });
    }
  };

  const getTrendingsBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/book/get-newest-books?numberOfBooks=5`
      );
      if (response.status === 200) {
        setTrendingBooks(response.data);
      }
    } catch (err: any) {
      //   addToast({
      //     title: "Error",
      //     message: "Couldn't get trending books",
      //     isError: true,
      //   });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await getTrendingsBooks();
    })();
  }, [getTrendingsBooks]);

  return (
    <div className="details">
      <Navbar />
      <div
        className="d-flex flex-row"
        style={{ backgroundColor: "#93b8f5", paddingTop: 20, width: "99.1vw" }}
      >
        <h5 style={{ color: "#143d81", marginLeft: 100 }}>Home / Books / </h5>
        <p
          style={{
            marginLeft: 5,
            marginTop: 1,
            fontSize: 16,
            color: "#143d81",
            marginBottom: 20,
          }}
        >
          {toTitleCase(book.bookGenre)} / {toTitleCase(book.name)}
        </p>
      </div>
      <div
        className="d-flex flex-row mt-5"
        style={{ marginLeft: 100, marginTop: 30 }}
      >
        <div style={{ width: 530, position: "relative" }}>
          <div className="d-flex flex-row">
            <div
              className="d-flex flex-row"
              style={{
                border: "1px solid rgb(255, 215, 130)",
                borderRadius: 8,
                paddingRight: 10,
                paddingTop: 5,
                paddingLeft: 15,
              }}
            >
              <StarRating rating={book.rating} />
              <h5 style={{ marginLeft: 10, color: "#FF7A00", marginTop: 2 }}>
                {book.rating.toPrecision(3)}
              </h5>
            </div>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.5)",
                borderRadius: 8,
                paddingTop: 5,
                paddingLeft: 15,
                paddingRight: 10,
                marginLeft: 20,
              }}
            >
              <h5 style={{ color: "#4D4D4D", marginTop: 2 }}>
                {reviews.length} reviews
              </h5>
            </div>
          </div>
          <h3 style={{ marginTop: 20 }}>{toTitleCase(book.name)}</h3>
          <div className="d-flex flex-row" style={{ marginTop: 20 }}>
            <h5 style={{ marginTop: 10 }}>{book.author}</h5>
          </div>
          <p style={{ marginTop: 20 }}>{book.description}</p>
          <div
            className="d-flex flex-row"
            style={{ position: "absolute", bottom: 0 }}
          >
            <button
              onClick={reserveBook}
              className="shadow"
              style={{
                backgroundColor: "#143d81",
                color: "white",
                padding: 15,
                paddingInline: 30,
                borderRadius: 10,
                border: "none",
                fontSize: 20,
              }}
            >
              <BsBasket2
                size={25}
                style={{ marginLeft: 10, marginRight: 10 }}
              />{" "}
              Reserve
            </button>
          </div>
        </div>
        <img
          style={{ width: 400, height: 600, borderRadius: 20, marginLeft: 100 }}
          src={book.image}
          alt=""
        />
        <img
          style={{ width: 400, height: 600, borderRadius: 20, marginLeft: 100 }}
          src={book.image}
          alt=""
        />
      </div>
      <div
        style={{
          position: "relative",
          marginRight: 100,
          marginTop: 100,
          marginBottom: 250,
        }}
      >
        <div style={{ marginLeft: 100, marginTop: 50 }}>
          <h3 style={{ fontWeight: "bold", marginBottom: 30 }}>Details</h3>
          <div className="d-flex flex-row">
            <div
              style={{
                backgroundColor: "#4D4D4D",
                paddingLeft: 40,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                width: "25vw",
              }}
            >
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Book title
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Author
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                ISBN
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Edition Language
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Book Format
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Date Published
              </h5>
              <h5 style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
                Publisher
              </h5>
            </div>
            <div
              style={{
                paddingLeft: 50,
                backgroundColor: "#FCF8FD",
                width: "60vw",
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                {toTitleCase(book.name)}
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                {book.author}
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                121341381648 (ISBN13: 121341381648)
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                English
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                Paperback, 450 Pages
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                August 10th 2019
              </h5>
              <h5 style={{ color: "#4D4D4D", marginTop: 40, marginBottom: 40 }}>
                Wepress Inc.
              </h5>
            </div>
          </div>
        </div>
      </div>
      <BooksCarousel title="Related Items"></BooksCarousel>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default DetailsPage;
