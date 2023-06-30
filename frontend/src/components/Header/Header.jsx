import React from "react";
import { animate, motion } from "framer-motion";
import compLogo from "../../Asset/Logo.svg";
import { BsHeadphones } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {
  AiFillMail,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="contact-wrapper">
        <div>
          <motion.p
            style={{ fontWeight: "bolder" }}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            Get 15% Off When You Spend $800 W. Code: GIFTNEW
          </motion.p>
        </div>
        <motion.div
          className="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 4 }}
        >
          <div className="contact-icons">
            <BsHeadphones className="icons" />
            <a href="">(+00)1234-5678</a>
          </div>
          <div className="contact-icons">
            <AiFillMail className="icons" />
            <a href="">support@example.com</a>
          </div>
          <div className="contact-icons">
            <button>Book Now</button>
          </div>
        </motion.div>
      </div>
      <nav className="nav-bar">
        <div className="left-nav-section">
          <figure>
            <img src={compLogo} alt="" />
          </figure>
        </div>
        <div className="middle-nav-section">
          <form className="nav-bar-search">
            <input
              type="search"
              name=""
              placeholder="search anything for your pets"
            />
            <div className="search">
              <AiOutlineSearch />
            </div>
          </form>
        </div>
        <div className="right-nav-section">
          <div className="nav-icons">
            <ul style={{ display: "flex", gap: "1.2rem" }}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>Service</li>
              <li>Products</li>
            </ul>
            <div className="account">
              <AiOutlineUser className="icons" />
              <div className="sub-menu-account">
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <li>Login</li>
                  <li>Register</li>
                </ul>
              </div>
            </div>
            <AiOutlineShoppingCart className="icons" />
          </div>
        </div>
      </nav>
    </header>
  );
};
