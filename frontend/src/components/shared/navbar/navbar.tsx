import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/bookstore.png";
import { BiSearch } from "react-icons/bi";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchString, setSearchString] = useState<string>("");

  const searchBooks = async () => {
    if (searchString === "") return;
    navigate("/books", { state: { searchString } });
    setSearchString("");
  };
  return (
    <div onMouseLeave={() => setIsOpenDropdown(false)}>
      <div className="d-flex flex-row search mt-5 justify-content-evenly">
        <img
          style={{
            width: 84,
            height: 84,
            borderRadius: 10,
            marginLeft: 50,
            marginTop: -10,
          }}
          src={logo}
          alt="logo"
        ></img>
        <h3 style={{ marginLeft: -70, marginTop: 15 }}>BookStore</h3>

        <button
          className="navbar-button-menu"
          onMouseEnter={() => setIsOpenDropdown(true)}
        >
          Menu <IoMdArrowDropdown />
        </button>
        <div className="d-flex">
          <input
            type="text"
            placeholder="Find books here"
            value={searchString}
            onChange={(event) => setSearchString(event.target.value)}
          ></input>
          <BiSearch
            onClick={() => {
              searchBooks();
            }}
            size={25}
            style={{
              color: "#A4A4A4",
              position: "absolute",
              marginLeft: "38vw",
              marginTop: 32,
            }}
          ></BiSearch>
        </div>

        <>
          <button
            className="navbar-button-signin"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Sign in
          </button>
          <button
            className="navbar-button-create"
            onClick={() => {
              navigate(`/register`);
            }}
          >
            Create account
          </button>
        </>
      </div>
      {isOpenDropdown && (
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{
            backgroundColor: "#143d81",
            width: "100%",
            height: 60,
            marginBottom: 50,
          }}
        >
          <IoMdArrowDropup
            color="#143d81"
            size={30}
            style={{
              position: "absolute",
              marginLeft: "-47vw",
              marginTop: -63,
            }}
          ></IoMdArrowDropup>

          <div className="d-flex flex-row">
            <div
              className="navbar-item"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </div>
            <div onClick={() => navigate("/books")} className="navbar-item">
              Books
            </div>
            <div
              onClick={() => navigate("/reservation-history")}
              className="navbar-item"
            >
              Reservation History
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
