import React from "react";
import { Link } from "react-router-dom";

export const Sidenav = ({ user }) => {
  return (
    <>
      <div className="side-nav">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"
            alt=""
          />
          <h2>HEM BHADUR</h2>
          <p>{user.email}</p>
        </div>
        <ul>
          <li>
            <Link className="links" to="/profile">
              Persionla Information
            </Link>
          </li>
          <li>
            <Link className="links" to="/userorder">
              Billing & Payments
            </Link>
          </li>
          <li>
            <Link className="links" to="/userorder">
              Your Orders
            </Link>
          </li>
          <li>
            <Link className="links">Persionla Information</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
