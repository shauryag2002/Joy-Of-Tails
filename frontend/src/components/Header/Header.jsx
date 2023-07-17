import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { motion } from "framer-motion";
import compLogo from "../../Asset/Logo.svg";
import { BsHeadphones } from "react-icons/bs";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  AiFillMail,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import "./Header.css";
import { checkIsAdmin } from "../../Store/AdminSlice/Adminslice";
import { useDispatch } from "react-redux";

export const Header = () => {
  const [menu, setMenu] = useState(true);
  const [ok, setOk] = useState(false);
  const dispatch = useDispatch();
  const handleClick = () => {
    setMenu(!menu);
  };

  const { isAdmin, isUser } = useSelector((state) => {
    return state.Admin;
  });

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
            <Link to="/">
              <img src={compLogo} alt="" />
            </Link>
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
              {isAdmin && (
                <li>
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
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
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  {isUser && (
                    <li>
                      <NavLink
                        to="/register"
                        onClick={() => {
                          localStorage.clear();
                          dispatch(false);
                        }}
                      >
                        logout
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <NavLink to="/cart">
              <AiOutlineShoppingCart className="icons" />
            </NavLink>
          </div>
        </div>
        <div className="menu">
          <NavLink to="/cart">
            <AiOutlineShoppingCart />
          </NavLink>
          <div>
            <AiOutlineMenu onClick={handleClick} />
          </div>
        </div>
        <div
          className={
            menu ? "right-nav-section-mobile" : "right-nav-section-mobile show"
          }
        >
          <div className="menu">
            <AiOutlineClose onClick={handleClick} />
          </div>
          <div className="nav-icons">
            <ul
              style={{
                display: "flex",
                gap: "1.2rem",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <li
                onClick={() => {
                  setMenu(true);
                }}
              >
                <NavLink to="/">Home</NavLink>
              </li>
              <li
                onClick={() => {
                  setMenu(true);
                }}
              >
                Service
              </li>
              <li
                onClick={() => {
                  setMenu(true);
                }}
              >
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  onClick={() => {
                    setMenu(true);
                  }}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  onClick={() => {
                    setMenu(true);
                  }}
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};
