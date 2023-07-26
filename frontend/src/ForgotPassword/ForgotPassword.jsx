import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/api/user/password/forgot",
      {
        email,
      }
    );
    console.log(res.data);
  };
  return (
    <div>
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forgot Password</h2>

          <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
            <div className="forgotPasswordEmail">
              {/* <MailOutlineIcon /> */}
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
