import React, { useCallback, useEffect, useState } from "react";
import Footer from "../../components/shared/footer/footer";
import Navbar from "../../components/shared/navbar/navbar";
import PresentationCarousel from "../../components/carousel/presentationCarousel";
import ComingSoonModal from "../../components/shared/comingSoonModal/comingSoon";
import ReviewedBook from "../../components/cards/reviewedBook/reviewedBook";
import axiosInstance from "../../config/axiosInstance";
import { IBook } from "../../models/book";
import "./Presentation.css";
import BooksCarousel from "../../components/carousel/booksCarousel";
import CategoriesCarousel from "../../components/carousel/categoriesCarousel";
import TopRatedBooksCarousel from "../../components/carousel/topRatedBooksCarousel";
import NewsCard from "../../components/cards/newsCard/newsCard";
import TestimonialsCard from "../../components/cards/testimonialCard/testimonialCard";
import InfoCard from "../../components/cards/infoCard/infoCard";

const Presentation: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trendingBooks, setTrendingBooks] = useState<IBook[]>([]);

  const getTrendingsBooks = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/book/get-newest-books?numberOfBooks=5`
      );
      if (response.status === 200) {
        setTrendingBooks(response.data);
      }
    } catch (err: any) {}
  }, []);

  useEffect(() => {
    (async () => {
      await getTrendingsBooks();
    })();
  }, [getTrendingsBooks]);

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <PresentationCarousel />
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Trending this week</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod <br></br>tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <div className="d-flex flex-row justify-content-evenly reviewed-books-container">
        {trendingBooks.map((book: IBook) => (
          <ReviewedBook key={book.id} book={book}></ReviewedBook>
        ))}
      </div>
      <BooksCarousel title="Trending Books"></BooksCarousel>
      <CategoriesCarousel></CategoriesCarousel>
      <TopRatedBooksCarousel></TopRatedBooksCarousel>
      <div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <h2>Latest news</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod <br></br>tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <NewsCard></NewsCard>
      </div>
      <div>
        <div style={{ textAlign: "center", marginTop: 80 }}>
          <h2>Testimonials</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod <br></br>tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <TestimonialsCard></TestimonialsCard>
      </div>
      <InfoCard backgroundColor="#143d81" textColor="white" />
      <ComingSoonModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      ></ComingSoonModal>
      <Footer />
    </div>
  );
};

export default Presentation;
