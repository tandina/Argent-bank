import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { submitCredentials } from "../api/api";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);

  const dispatchEmail = (event) => dispatch(setEmail(event.target.value));
  const dispatchPassword = (event) => dispatch(setPassword(event.target.value));

  const sumbitCredentials = (event) => {
    event.preventDefault(event);
    submitCredentials(email, password, dispatch, navigate, setErrorMessage); // Passez setErrorMessage en tant que paramètre supplémentaire
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={dispatchEmail}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={dispatchPassword}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" onClick={sumbitCredentials}>
              Sign In
            </button>
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </section>
      </main>
    </>
  );
}
