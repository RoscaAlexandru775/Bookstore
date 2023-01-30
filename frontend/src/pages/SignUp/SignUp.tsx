import React, { LegacyRef, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/bookstore.png";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "../../utils/auth";
import axiosInstance from "../../config/axiosInstance";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const firstNameRef: LegacyRef<HTMLInputElement> = useRef(null);
  const errRef: LegacyRef<HTMLInputElement> = useRef(null);

  const [firstName, setFirstName] = useState<string>("");
  const [validFirstName, setValidFirstName] = useState<Boolean>(false);
  const [firstNameFocus, setFirstNameFocus] = useState<Boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [validLastName, setValidLastName] = useState<Boolean>(false);
  const [lastNameFocus, setLastNameFocus] = useState<Boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<Boolean>(false);
  const [emailFocus, setEmailFocus] = useState<Boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<Boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<Boolean>(false);

  const [matchPassword, setMatchPassword] = useState<string>("");
  const [validMatch, setValidMatch] = useState<Boolean>(false);
  const [matchFocus, setMatchFocus] = useState<Boolean>(false);

  const [errMsg, setErrMsg] = useState<string>("");

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(NAME_REGEX.test(firstName));
    setValidLastName(NAME_REGEX.test(lastName));
    setValidEmail(EMAIL_REGEX.test(email));
  }, [firstName, lastName, email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v1 = NAME_REGEX.test(firstName);
    const v2 = NAME_REGEX.test(lastName);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PASSWORD_REGEX.test(password);
    const v5 = password === matchPassword;
    if (!v1 || !v2 || !v3 || !v4 || !v5) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const name = `${firstName} ${lastName}`;
      const response = await axiosInstance.post(
        "/user/register",
        JSON.stringify({ name, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Email already exists");
      }
      errRef.current?.focus();
    }
  };
  return (
    <div className="signup-container">
      <div className="background" />
      <div className="card">
        <img className="logo" alt="logo" src={logo} />
        <h2>Create Account</h2>
        <form onSubmit={handlesubmit} className="form">
          <input
            type="text"
            placeholder="First Name"
            id="firstName"
            autoComplete="off"
            value={firstName}
            required
            aria-invalid={validFirstName ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            onFocus={() => {
              setFirstNameFocus(true);
            }}
            onBlur={() => {
              setFirstNameFocus(false);
            }}
          />
          <p
            id="uidnote"
            className={
              firstNameFocus && firstName && !validFirstName
                ? "instructions"
                : "offscreen"
            }
          >
            Must begin with a capital letter.
            <br />
          </p>
          <input
            type="text"
            placeholder="Last Name"
            id="lastName"
            autoComplete="off"
            value={lastName}
            required
            aria-invalid={validLastName ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            onFocus={() => {
              setLastNameFocus(true);
            }}
            onBlur={() => {
              setLastNameFocus(false);
            }}
          />
          <p
            id="uidnote"
            className={
              lastNameFocus && lastName && !validLastName
                ? "instructions"
                : "offscreen"
            }
          >
            Must begin with a capital letter.
            <br />
          </p>
          <input
            type="email"
            placeholder="Email"
            id="email"
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
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores,
            <br />
            hyphens allowed.
          </p>
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm_password"
            autoComplete="off"
            value={matchPassword}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="uidnote"
            onChange={(e: any) => {
              setMatchPassword(e.target.value);
            }}
            onFocus={() => {
              setMatchFocus(true);
            }}
            onBlur={() => {
              setMatchFocus(false);
            }}
          />

          <p
            id="uidnote"
            className={
              matchFocus && matchPassword && !validMatch
                ? "instructions"
                : "offscreen"
            }
          >
            Must match the first password input field.
          </p>

          <button
            type="submit"
            disabled={
              !!(
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                !validMatch
              )
            }
            className="button"
          >
            Sign Up
          </button>
        </form>
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <footer>
          Existing users? <a href="login">Sign In</a>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
