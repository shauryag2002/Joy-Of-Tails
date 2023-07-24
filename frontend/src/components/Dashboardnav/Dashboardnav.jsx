import React from "react";
import { NavLink, Link } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineBorderColor,
} from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

export const Dashboardnav = () => {
  return (
    <div>
      <ul>
        <li>
          <TbLayoutDashboard />
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <MdOutlineProductionQuantityLimits />
          <NavLink to="/dashboard/products">All Products</NavLink>
        </li>
        <li>
          <MdOutlineBorderColor />
          <NavLink to="/dashboard/order">All Order</NavLink>
        </li>
        <li>
          <BiUserCircle />
          <NavLink to="/dashboard/user">All Users</NavLink>
        </li>
        <li>
          <BiUserCircle />
          <NavLink to="/dashboard/feature"> Banner</NavLink>
        </li>
      </ul>
    </div>
  );
};
