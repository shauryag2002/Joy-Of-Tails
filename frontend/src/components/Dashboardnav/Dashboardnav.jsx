import React from "react";
import { NavLink } from "react-router-dom";

export const Dashboardnav = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/dashboard">Home</NavLink>
        </li>
        <li>
          <NavLink to="/order">Order</NavLink>
        </li>
      </ul>
    </div>
  );
};
