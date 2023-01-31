import React, { LegacyRef, useEffect, useRef, useState } from "react";
import {
  EMAIL_REGEX,
  getUserNameFromToken,
  getUserRoleFromToken,
  getUserIdFromToken,
  PASSWORD_REGEX,
} from "../../utils/auth";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../config/axiosInstance";
import logo from "../../assets/logo/bookstore.png";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../contexts/mainContext";

import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUserData } = useActions();

  const emailRef: LegacyRef<HTMLInputElement> = useRef(null);
  const errRef: LegacyRef<HTMLInputElement> = useRef(null);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<Boolean>(false);
  const [emailFocus, setEmailFocus] = useState<Boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<Boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<Boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidEmail(EMAIL_REGEX.test(email));
  }, [password, email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/user/login",
        JSON.stringify({ email, password })
      );

      const token = response.data.jwt;
      if (response.status === 200) {
        localStorage.setItem("authToken", token);

        setUserData(
          getUserNameFromToken(token),
          getUserRoleFromToken(token),
          parseInt(getUserIdFromToken(token))
        );

        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <div className="login-container">
      <div className="background" />
      <div className="card">
        <img className="logo" alt="logo" src={logo} />
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            placeholder="Email"
            id="email"
            ref={emailRef}
            autoComplete="off"
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onFocus={() => {
              setEmailFocus(true);
            }}
            onBlur={() => {
              setEmailFocus(false);
            }}
          />
          <p
            id="uidnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 5 }} />
            Must contain @ symbol
            <br />
            and email domain.
            <br />
          </p>
          <input
            type="password"
            placeholder="Password"
            id="password"
            autoComplete="off"
            value={password}
            required
            aria-invalid={validPassword ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => {
              setPasswordFocus(true);
            }}
            onBlur={() => {
              setPasswordFocus(false);
            }}
          />
          <p
            id="uidnote"
            className={
              passwordFocus && password && !validPassword
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 5 }} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores,
            <br />
            hyphens allowed.
          </p>
          <button
            disabled={!validEmail || !validPassword}
            className="button"
            type="submit"
          >
            Login
          </button>
        </form>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <footer>
          Don't have an account? <a href="register">Sign Up</a>
        </footer>
      </div>
    </div>
  );
};
export default Login;
