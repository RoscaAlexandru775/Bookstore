import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useData, useActions } from "../../../contexts/mainContext";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/bookstore.png";
import { BiSearch } from "react-icons/bi";
import { BsBasket2 } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const state = useData();
  const { logout } = useActions();
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
        <h3 style={{ marginLeft: -60, marginTop: 15 }}>BookStore</h3>

        {!state.name || state.name === "" ? null : (
          <button
            className="navbar-button-menu"
            onMouseEnter={() => setIsOpenDropdown(true)}
          >
            Menu <IoMdArrowDropdown />
          </button>
        )}

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
        {!state.name || state.name === "" ? (
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
        ) : (
          <>
            <div
              style={{ marginLeft: 40, marginTop: 25 }}
              onClick={() => {
                navigate("/cart");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  marginLeft: 20,
                  marginTop: 20,
                  backgroundColor: "#143d81",
                  borderRadius: 50,
                  width: 25,
                  height: 25,
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                }}
              >
                {state.reservedBooksNumber}
              </div>
              <BsBasket2 size={30} />
            </div>

            <div
              className="d-flex flex-row"
              style={{
                borderRadius: 5,
                border: "2px solid #143d81",
                paddingTop: 12,
                paddingInline: 30,
                marginLeft: 50,
                marginTop: 10,
                marginBottom: 50,
              }}
            >
              <CgProfile color="#143d81" size={25}></CgProfile>
              <p
                style={{
                  color: "#143d81",
                  fontSize: 20,
                  marginTop: -4,
                  marginLeft: 10,
                }}
              >
                {state.name}
              </p>
            </div>
            <div style={{ marginLeft: 30, marginTop: 22 }}>
              <FiLogOut
                onClick={() => {
                  logout();
                  localStorage.clear();
                  navigate(`/`);
                }}
                color="#143d81"
                size={30}
              />
            </div>
          </>
        )}
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
              marginLeft: "-57vw",
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
          </div>
        </div>
      )}
    </div>
  );
}
