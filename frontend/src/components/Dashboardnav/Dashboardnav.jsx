import React from "react";
import { NavLink, Link } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineBorderColor,
} from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { GrServices } from "react-icons/gr";

export const Dashboardnav = () => {
  return (
    <div>
      <ul>
        <Link to="/dashboard">
          <li>
            <TbLayoutDashboard />
            Dashboard
          </li>
        </Link>
        <li>
          <MdOutlineProductionQuantityLimits />
          <NavLink to="/dashboard/products">All Products</NavLink>
        </li>
        <li>
          <GrServices />
          <NavLink to="/dashboard/service">Our Sevices</NavLink>
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
