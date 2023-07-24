import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export const Admin = () => {
  const data = [
    {
      name: "Sales",
      value: 50000,
    },
    {
      name: "Orders",
      value: 10000,
    },
    {
      name: "Total Revenue",
      value: 50000,
    },
    {
      name: "products",
      value: 50000,
    },
    {
      name: "customers",
      value: 25000,
    },
  ];
  return (
    <section className="dashboard-section">
      {/* <Modal
        title="Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <form className="form-wrapper" onSubmit={handleSubmit} method="post">
          <div>
            <input
              type="text"
              name="brand"
              placeholder="product brand"
              onChange={handleChange}
              value={formdata.brand}
            />
          </div>
          <div>
            <input
              type="text"
              name="title"
              placeholder="product title"
              onChange={handleChange}
              value={formdata.title}
            />
          </div>
          <div>
            <input
              type="text"
              name="categories"
              placeholder="product categories"
              onChange={handleChange}
              value={formdata.categories}
              rows={8}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="desc"
              placeholder="product description"
              onChange={handleChange}
              value={formdata.desc}
              rows={8}
            />
          </div>

          <div>
            <input
              type="text"
              name="color"
              placeholder="product color"
              onChange={handleChange}
              value={formdata.color}
            />
          </div>
          <div>
            <input
              type="text"
              name="animalType"
              placeholder="animaltype"
              onChange={handleChange}
              value={formdata.animaltype}
            />
          </div>
          <div>
            <input
              type="text"
              name="gramPerQuantity"
              placeholder="gramperquantity"
              onChange={handleChange}
              value={formdata.gramperquantity}
            />
          </div>

          <div>
            <input
              type="text"
              name="foodType"
              placeholder="food type"
              onChange={handleChange}
              value={formdata.foodtype}
            />
          </div>

          <div>
            <input
              type="text"
              name="stock"
              placeholder="product stock"
              onChange={handleChange}
              value={formdata.stock}
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              placeholder="product price"
              onChange={handleChange}
              value={formdata.price}
            />
          </div>
          <div>
            <input
              type="file"
              multiple
              name="img"
              placeholder="product image"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
          </div>

          <div>
            <button>Submit</button>
          </div>
        </form>
      </Modal> */}

      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div className="detail-box">
            <div className="items">
              <MdOutlineProductionQuantityLimits className="icon" />
              <h2>6 Products</h2>
            </div>
            <div className="items">
              <MdOutlineProductionQuantityLimits className="icon" />
              <h2>6 Customer</h2>
            </div>
            <div className="items">
              <MdOutlineProductionQuantityLimits className="icon" />
              <h2>6 Orders</h2>
            </div>
            <div className="items">
              <MdOutlineProductionQuantityLimits className="icon" />
              <h2>6 Products</h2>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <BarChart
              width={700}
              height={400}
              data={data}
              barSize={40}
              margin={{ top: 2, right: 5, left: 5, bottom: 8 }}
            >
              <Tooltip />
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
                fontSize={15}
              />
              <YAxis fontSize={15} />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="value"
                fill="#8884d8"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </div>
        </div>
      </div>
    </section>
  );
};
