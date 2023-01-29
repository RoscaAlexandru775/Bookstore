import React from "react";
import logo from "../../../assets/logo/bookstore.png";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.css";
import ComingSoonModal from "../comingSoonModal/comingSoon";
import "./footer.css";

const Footer: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  return (
    <>
      <div className="d-flex flex-row m-5">
        <div className="footer-first-column">
          <div className="d-flex flex-row">
            <img className="footer-logo" src={logo} alt="logo" />
            <h2 className="ml-4 mt-4 ">Bookstore</h2>
          </div>
          <p className="footer-description">
            We are a online bookstore website who sells all genres of books from
            around the world. Find your book here now
          </p>
          <h5 className="mt-5">Follow Us</h5>
          <div className="d-flex flex-row">
            <div
              style={{ width: 58, height: 58 }}
              onClick={() => setModalIsOpen(true)}
            >
              <FaFacebookF
                size={30}
                style={{ color: "#143d81", marginTop: 20, opacity: 0.8 }}
              ></FaFacebookF>
            </div>
            <div
              style={{ width: 58, height: 58 }}
              onClick={() => setModalIsOpen(true)}
            >
              <FaYoutube
                size={35}
                style={{ color: "#143d81", marginTop: 20, opacity: 0.8 }}
              ></FaYoutube>
            </div>
            <div
              style={{ width: 58, height: 58 }}
              onClick={() => setModalIsOpen(true)}
            >
              <FaTwitter
                size={30}
                style={{
                  color: "#143d81",
                  marginTop: 20,
                  marginLeft: 15,
                  opacity: 0.8,
                }}
              ></FaTwitter>
            </div>
            <div
              style={{ width: 58, height: 58 }}
              onClick={() => setModalIsOpen(true)}
            >
              <FaLinkedinIn
                size={30}
                style={{
                  color: "#143d81",
                  marginTop: 20,
                  marginLeft: 20,
                  opacity: 0.8,
                }}
              ></FaLinkedinIn>
            </div>
            <div
              style={{ width: 58, height: 58 }}
              onClick={() => setModalIsOpen(true)}
            >
              <FaInstagram
                size={35}
                style={{
                  color: "#143d81",
                  marginTop: 17,
                  marginLeft: 20,
                  opacity: 0.8,
                }}
              ></FaInstagram>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row footer-second-column">
          <div>
            <h4 style={{ color: "black" }}>Quick Links</h4>
            <div className="footer-links-container">
              <ul onClick={() => setModalIsOpen(true)}>About Us</ul>
              <ul onClick={() => setModalIsOpen(true)}>Contact Us</ul>
              <ul onClick={() => setModalIsOpen(true)}>Products</ul>
              <ul onClick={() => setModalIsOpen(true)}>Login</ul>
              <ul onClick={() => setModalIsOpen(true)}>Sign Up</ul>
            </div>
          </div>
          <div style={{ marginLeft: 100 }}>
            <h4>Customer Area</h4>
            <div className="footer-links-container">
              <ul onClick={() => setModalIsOpen(true)}>My Account</ul>
              <ul onClick={() => setModalIsOpen(true)}>Reservation History</ul>
              <ul onClick={() => setModalIsOpen(true)}>Terms</ul>
              <ul onClick={() => setModalIsOpen(true)}>Privacy Policy</ul>
              <ul onClick={() => setModalIsOpen(true)}>FAQ</ul>
            </div>
          </div>
        </div>
        <div className="footer-third-column">
          <h4>Don’t miss the newest books</h4>
          <p style={{ marginTop: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut
          </p>
          <TextField
            placeholder="Type Your email here"
            className="footer-newsletter-input"
            hiddenLabel={true}
            variant="filled"
          ></TextField>
          <button
            className="shadow subscribe-button"
            onClick={() => setModalIsOpen(true)}
          >
            Subscribe
          </button>
        </div>
      </div>
      <hr className="line" />
      <div className="d-flex flex-row footer-second-container">
        <h5 style={{ color: "#143d81", opacity: 0.6 }}>
          BookStore - © 2023 All Rights Reserved
        </h5>
        <h5 className="footer-author-details">Made with ♥ by RAX</h5>
      </div>
      <ComingSoonModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      ></ComingSoonModal>
    </>
  );
};

export default Footer;
