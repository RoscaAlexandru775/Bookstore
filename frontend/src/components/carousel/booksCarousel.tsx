import React, { useCallback, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axiosInstance from "../../config/axiosInstance";
import TrendingBookCard from "../cards/trendingBookCard/trendingBookCard";
import CarouselControls from "./carouselControls";
import UseToastContext from "../../hooks/useToastContext";
import { IBook } from "../../models/book";

const BooksCarousel: React.FC<{ title: String }> = ({ title }) => {
  const [trendingBooks, setTrendingBooks] = useState<[IBook[]]>([[]]);
  const addToast = UseToastContext();

  const getTrendingsBooks = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/book/get-top-rated-books`);

      if (response.status === 200) {
        let aux = response.data;
        let chunks = Math.ceil(aux.length / 3);
        let chunksArr: [IBook[]] = [[]];
        for (let i = 0, j = 0; i < chunks; i++, j += 3) {
          chunksArr.push(aux.slice(j, j + 3));
        }
        chunksArr.shift();
        setTrendingBooks(chunksArr);
      }
    } catch (err: any) {
      addToast({
        title: "Error",
        message: "Couldn't trendings books",
        isError: true,
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getTrendingsBooks();
    })();
  }, [getTrendingsBooks]);
  return (
    <>
      {trendingBooks.length > 1 && (
        <div
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginTop: 80,
            marginBottom: 100,
          }}
        >
          <h3 style={{ marginBottom: -50, fontWeight: "bold" }}>{title}</h3>
          <Carousel
            indicators={false}
            interval={null}
            nextIcon={<CarouselControls direction="right"></CarouselControls>}
            prevIcon={<CarouselControls direction="left"></CarouselControls>}
          >
            {trendingBooks.map((subArray, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex flex-row mt-5 justify-content-evenly">
                  {subArray.map((book: IBook, index) => (
                    <TrendingBookCard
                      key={index}
                      book={book}
                    ></TrendingBookCard>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};
export default BooksCarousel;
