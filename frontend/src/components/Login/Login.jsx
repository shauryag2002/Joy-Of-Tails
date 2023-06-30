import React, { useState } from "react";
import DogLogo from "../../images/dogLogoCropped.jpg";
import GoogleLogo from "../../images/Google Logo.png";

import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./Login.css";
const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/auth/login", user);
      if (res.data.error) {
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
                  No Account ?{" "}
                  <Link to={"/register"} className="linkColorNone">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
            <div className="loginText">Sign in</div>
            <div className="loginWithGoogle">
              <div className="loginWithGoogleLink">
                <img
                  src={GoogleLogo}
                  alt="Google Logo"
                  className="loginWithGoogleLink"
                />
              </div>
              <div className="loginWithGoogleText">Sign in with Google</div>
            </div>
            {/* {error && <div className="wrongCreds">Wrong Credentials</div>} */}
            <div className="emailPass">
              <div className="email emailPassWrapper">
                <label htmlFor="email " className="emailCss labelTextWrapper">
                  Enter your username or email address
                </label>
                <div className="emailInput">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Username or email address"
                    className="InputCss"
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
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
            </div>
            <div className="forgetAndRemember">
              <div className="forgetPass">Forgot Password</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button className="loginButton">
                <div onClick={handleLogin}>Login</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
