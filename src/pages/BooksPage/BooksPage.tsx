import React, { useEffect, useState, useCallback } from "react";
import BooksCarousel from "../../components/carousel/booksCarousel";
import ComingSoonModal from "../../components/shared/comingSoonModal/comingSoon";
import CategoriesFilter from "../../components/filters/categoriesFilter";
import Pagination from "../../components/shared/pagination/pagination";
import Navbar from "../../components/shared/navbar/navbar";
import InfoCard from "../../components/cards/infoCard/infoCard";
import Footer from "../../components/shared/footer/footer";
import SliderFilter from "../../components/filters/sliderFilter";
import Book from "../../components/cards/book/book";
import axiosInstance from "../../config/axiosInstance";
import { useLocation } from "react-router-dom";
import { IBook } from "../../models/book";
import "./BooksPage.css";

const BooksPage: React.FC = () => {
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trendingBooks, setTrendingBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [books, setBooks] = useState<[IBook[]]>([[]]);
  const [totalPages, setTotalPages] = useState(0);
  const [resetFilter, setResetFilter] = useState(false);

  const [ratingFilterValues, setRatingFilterValues] = React.useState<number[]>([
    0, 5,
  ]);
  const [reviewsFilterValues, setReviewsFilterValues] = React.useState<
    number[]
  >([0, 1000]);
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);

  const handleChangeRating = (newValue: number | number[]) => {
    setRatingFilterValues(newValue as number[]);
  };
  const handleChangeReviews = (newValue: number | number[]) => {
    setReviewsFilterValues(newValue as number[]);
  };
  const handleCategoryChange = (category: string, selected: boolean) => {
    if (category === "All Genres") {
      if (selected) {
        setSelectedCategory([]);
      }
    } else {
      if (
        selectedCategory.find((element) => element === category.toUpperCase())
      ) {
        setSelectedCategory(
          selectedCategory.filter((c) => c !== category.toUpperCase())
        );
      } else {
        setSelectedCategory([...selectedCategory, category.toUpperCase()]);
      }
    }
  };
  const handlePageChange = (event: { selected: number }) => {
    setPage(event.selected);
  };

  const optionsRating = {
    name: "Rating",
    max: 5,
    step: 0.1,
    value: ratingFilterValues,
    onChange: handleChangeRating,
    marginLeft: 173,
    reset: resetFilter,
  };
  const optionsReviews = {
    name: "Reviews",
    max: 1000,
    step: 1,
    value: reviewsFilterValues,
    onChange: handleChangeReviews,
    marginLeft: 153,
    reset: resetFilter,
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
    } catch (err: any) {}
    setLoading(false);
  }, []);

  const getBooks = async () => {
    setLoading(true);
    setBooks([[]]);
    try {
      const response = await axiosInstance.get(
        `/book/get-filtered-books?page=${page}&categories=${selectedCategory}&lowerRating=${ratingFilterValues[0]}&upperRating=${ratingFilterValues[1]}&lowerNumberOfRatings=${reviewsFilterValues[0]}&upperNumberOfRatings=${reviewsFilterValues[1]}`
      );
      if (response.status === 200) {
        let aux = response.data.content;
        let chunks = Math.ceil(aux.length / 3);
        let chunksArr: [IBook[]] = [[]];
        for (let i = 0, j = 0; i < chunks; i++, j += 3) {
          chunksArr.push(aux.slice(j, j + 3));
        }
        chunksArr.shift();
        setBooks(chunksArr);
        setTotalPages(response.data.totalPages);
      }
    } catch (err: any) {}
    setLoading(false);
  };
  const getSearchBooks = async () => {
    setLoading(true);
    setBooks([[]]);
    try {
      const response = await axiosInstance.get(
        `/book/search-books?searchQuery=${location.state?.searchString}`
      );
      if (response.status === 200) {
        let aux = response.data;
        let chunks = Math.ceil(aux.length / 3);
        let chunksArr: [IBook[]] = [[]];
        for (let i = 0, j = 0; i < chunks; i++, j += 3) {
          chunksArr.push(aux.slice(j, j + 3));
        }
        chunksArr.shift();
        setBooks(chunksArr);
      }
    } catch (err: any) {}
    setLoading(false);
  };

  useEffect(() => {
    const get = async () => {
      if (location.state?.searchString && location.state?.searchString !== "") {
        await getSearchBooks();
      } else {
        await getBooks();
      }
    };
    get();
  }, [page, location.state?.searchString]);

  return (
    <div style={{ width: "100%" }}>
      <Navbar></Navbar>
      <div
        className="d-flex flex-row"
        style={{ backgroundColor: "#83aff7", paddingTop: 20, width: "99.1vw" }}
      >
        <h5 style={{ color: "#143d81", marginLeft: 100, marginBottom: 20 }}>
          Home / Books{" "}
        </h5>
      </div>
      <div
        className="d-flex flex-row"
        style={{ marginLeft: 100, marginTop: 50, marginBottom: 50 }}
      >
        <div
          style={{
            borderRight: "2px solid rgb(240,228,244)",
            width: 350,
            padding: 20,
          }}
        >
          <h1 style={{ fontWeight: "bold" }}>Filter</h1>
          <CategoriesFilter
            reset={resetFilter}
            handleCategoryChange={handleCategoryChange}
          ></CategoriesFilter>
          <SliderFilter props={optionsRating}></SliderFilter>
          <SliderFilter props={optionsReviews}></SliderFilter>
          <button
            onClick={getBooks}
            style={{
              marginTop: 20,
              border: "none",
              backgroundColor: "#143d81",
              color: "white",
              borderRadius: 5,
              width: 280,
              padding: 15,
            }}
          >
            Refine Search
          </button>
          <button
            onClick={() => {
              setPage(0);
              setTotalPages(0);
              setSelectedCategory([]);
              handleChangeRating([0, 5]);
              handleChangeReviews([0, 1000]);
              setResetFilter(!resetFilter);
              location.state.searchString = "";
            }}
            style={{
              marginTop: 20,
              border: "none",
              backgroundColor: "#143d81",
              color: "white",
              borderRadius: 5,
              width: 280,
              padding: 15,
            }}
          >
            Reset Filter
          </button>
        </div>
        <div>
          <div style={{ marginLeft: 80, marginBottom: 50 }}>
            <h1 style={{ fontWeight: "bold" }}>Books</h1>
            <p style={{ opacity: 0.6, fontWeight: 600 }}>
              Over 475+ books available here, find it now!
            </p>
          </div>

          {books.map((subArray, index) => (
            <div key={index} className="d-flex flex-row mt-5">
              {subArray.map((book, index) => (
                <Book key={index} book={book} />
              ))}
            </div>
          ))}

          <div style={{ marginTop: 50, width: 1300 }}>
            <Pagination
              pageCount={totalPages}
              handlePageChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      </div>

      <BooksCarousel title="Maybe you like it"></BooksCarousel>
      <InfoCard backgroundColor="#93b8f5" textColor="#143d81" />
      <Footer></Footer>
      <ComingSoonModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      ></ComingSoonModal>
    </div>
  );
};

export default BooksPage;
