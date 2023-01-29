import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineArrowRight } from "react-icons/ai";
import { ImBooks } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import book1 from "../../assets/books/book1.png";
import book2 from "../../assets/books/book2.png";
import book3 from "../../assets/books/book3.png";

const PresentationCarousel: React.FC = () => {
  return (
    <div style={{ display: "block" }}>
      <Carousel>
        <Carousel.Item interval={10000}>
          <div
            style={{
              width: "99.1vw",
              height: 700,
              backgroundColor: "#430D54",
              opacity: 0.8,
            }}
          ></div>
          <Carousel.Caption>
            <div
              style={{
                marginBottom: "10%",
                marginRight: "70%",
                textAlign: "left",
              }}
            >
              <h2>Find over 2 milion books in our library</h2>
              <p style={{ opacity: 0.8, marginTop: 20, fontSize: 16 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
              <button
                className="shadow"
                style={{
                  marginTop: 20,
                  backgroundColor: "#8D28AD",
                  color: "white",
                  padding: 12,
                  borderRadius: 5,
                  border: "none",
                  fontSize: 20,
                }}
              >
                Go to Collections{" "}
                <AiOutlineArrowRight
                  size={25}
                  style={{ marginLeft: 40, marginBottom: 4 }}
                />
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          <div
            style={{ width: "99.1vw", height: 700, backgroundColor: "#451355" }}
          ></div>
          <Carousel.Caption>
            <div
              style={{
                marginRight: "70%",
                marginBottom: "10%",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 550,
                  height: 550,
                  backgroundColor: "#004867",
                  borderRadius: 600,
                  marginLeft: -380,
                  marginBottom: -800,
                }}
              ></div>
              <h2>Welcome to Clevr Online Book Store</h2>
              <p style={{ opacity: 0.8, marginTop: 20, fontSize: 16 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <ImBooks size={20} style={{ marginTop: 5 }} />
                    <p style={{ marginLeft: 20, fontSize: 20 }}>68+k</p>
                  </div>
                  <p style={{ opacity: 0.6, fontSize: 13, marginTop: -15 }}>
                    Book Collections
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 25,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <FaUsers size={20} style={{ marginTop: 5 }} />
                    <p style={{ marginLeft: 15, fontSize: 20 }}>25,634</p>
                  </div>
                  <p style={{ opacity: 0.6, fontSize: 13, marginTop: -15 }}>
                    Customers
                  </p>
                </div>
              </div>
              <button
                className="shadow"
                style={{
                  marginTop: 20,
                  backgroundColor: "#D9176C",
                  color: "white",
                  padding: 12,
                  borderRadius: 5,
                  border: "none",
                  fontSize: 20,
                }}
              >
                Go to Collections{" "}
                <AiOutlineArrowRight
                  size={25}
                  style={{ marginLeft: 40, marginBottom: 4 }}
                />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                marginTop: "-40%",
              }}
            >
              <div style={{ marginLeft: 500 }}>
                <div
                  style={{
                    backgroundColor: "#FF7A00",
                    position: "absolute",
                    color: "white",
                    padding: 15,
                    marginTop: 30,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    fontSize: 20,
                  }}
                >
                  Best Seller
                </div>
                <img
                  style={{ width: 350, height: 500, borderRadius: 20 }}
                  src={book1}
                  alt="book1"
                ></img>
              </div>
              <div style={{ marginLeft: 70 }}>
                <div
                  style={{
                    backgroundColor: "#FF7A00",
                    position: "absolute",
                    color: "white",
                    padding: 15,
                    marginTop: 30,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    fontSize: 20,
                  }}
                >
                  Best Seller
                </div>
                <img
                  style={{ width: 350, height: 500, borderRadius: 20 }}
                  src={book2}
                  alt="book2"
                ></img>
              </div>
              <div style={{ marginLeft: 70 }}>
                <div
                  style={{
                    backgroundColor: "#FF7A00",
                    position: "absolute",
                    color: "white",
                    padding: 15,
                    marginTop: 30,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    fontSize: 20,
                  }}
                >
                  Best Seller
                </div>
                <img
                  style={{ width: 350, height: 500, borderRadius: 20 }}
                  src={book3}
                  alt="book3"
                ></img>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default PresentationCarousel;
