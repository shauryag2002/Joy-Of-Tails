import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DogLogo from "../../images/dogLogoCropped.jpg";
import GoogleLogo from "../../images/Google Logo.png";

import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./register.css";
const Register = () => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        alert("register successful");
        navigate("/login");
      } else {
        alert(data.message);
      }
      if (data.error) {
        setError(res.data.error);
      }
      const userInfo = await res.data;
      console.log(userInfo);
      localStorage.setItem("token", userInfo.accessToken);
      localStorage.setItem("id", userInfo._id);
      Cookies.set("token", userInfo.accessToken, { expires: 5 });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      {/* <div className="MainLogo">onlineBazaar</div> */}
      <div className="mainWrapper">
        <div className="loginImage">
          <img src={DogLogo} alt="Login" className="LoginMainImage" />
        </div>

        <div className="loginForm">
          <div className="loginDetails">
            <div className="topWrapper">
              <div className="welcomeText">Welcome to Joy Of Tails</div>
              <div className="signup">
                <div className="signupText">
                  No Account ?
                  <Link to={"/login"} className="linkColorNone">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
            <div className="loginText">Sign up</div>
            {error && <div className="wrongCreds">Wrong Credentials</div>}
            <div className="emailPass">
              <div className="email emailPassWrapper">
                <label htmlFor="email " className="emailCss labelTextWrapper">
                  Enter your username
                </label>
                <div className="emailInput">
                  <input
                    type="text"
                    name="username"
                    id="email"
                    placeholder="Username"
                    className="InputCss"
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="email emailPassWrapper">
                <label htmlFor="email " className="emailCss labelTextWrapper">
                  Enter your email
                </label>
                <div className="emailInput">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter your email"
                    className="InputCss"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="password emailPassWrapper">
                <label htmlFor="password" className="passCss labelTextWrapper">
                  Enter your Password
                </label>
                <div className="passInput">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="InputCss"
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="password emailPassWrapper">
                <label htmlFor="password" className="passCss labelTextWrapper">
                  Enter confirm your Password
                </label>
                <div className="passInput">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Confirm Password"
                    className="InputCss"
                    onChange={(e) => {
                      setUser({ ...user, confirmpassword: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button className="loginButton">
                <div onClick={handleLogin}>Register</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
