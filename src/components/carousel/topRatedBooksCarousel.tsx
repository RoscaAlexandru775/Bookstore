import React, { useCallback, useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

import CarouselControls from "./carouselControls";
import { IBook } from "../../models/book";
import axiosInstance from "../../config/axiosInstance";
import RatedBook from "../cards/ratedCard/ratedCard";

const TopRatedBooksCarousel:React.FC = () => {
  const [topRatedBooks, setTopRatedBooks] = useState<[IBook[]]>([[]]);
  const [loading, setLoading] = useState(true);

  const getTrendingsBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/book/get-top-rated-books?numberOfBooks=10`
      );
      console.log(response.data);
      if (response.status === 200) {
        let aux = response.data;
        let chunks = Math.ceil(aux.length / 6);
        let chunksArr: [IBook[]] = [[]];
        for (let i = 0, j = 0; i < chunks; i++, j += 6) {
          chunksArr.push(aux.slice(j, j + 6));
        }
        chunksArr.shift();
        setTopRatedBooks(chunksArr);
      }
    } catch (err: any) {}
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      await getTrendingsBooks();
    })();
  }, [getTrendingsBooks]);

  return (
    <div
      style={{
        marginLeft: 50,
        marginRight: 50,
        marginTop: 80,
        marginBottom: 100,
      }}
    >
      <h3 style={{ marginBottom: -20, fontWeight: "bold" }}>
        10 Top Rated Books
      </h3>
      <Carousel
        indicators={false}
        interval={null}
        nextIcon={
          <div style={{ marginTop: -150 }}>
            <CarouselControls direction="right"></CarouselControls>
          </div>
        }
        prevIcon={
          <div style={{ marginTop: -150 }}>
            <CarouselControls direction="left"></CarouselControls>
          </div>
        }
      >
        {topRatedBooks.map((subArray, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex flex-row mt-5 justify-content-evenly">
              {subArray.map((book: IBook, index) => (
                <RatedBook key={index} book={book}></RatedBook>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
export default TopRatedBooksCarousel;