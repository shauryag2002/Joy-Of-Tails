import React, { useEffect, useState } from "react";
import "./Order.css";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import axios from "axios";

export const Service = () => {
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState({
    title: "",
    address: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", image);
    formData.append("title", userInfo.title);
    formData.append("address", userInfo.address);
    formData.append("mobile", userInfo.mobile);

    const { data } = await axios.post(
      "http://localhost:4000/api/service",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {}, []);

  return (
    <section className="dashboard-section">
      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div style={{ width: "60%", margin: "5rem auto" }}>
            <form
              className="form-wrapper"
              onSubmit={handleSubmit}
              method="post"
            >
              <div className="form-content">
                <input
                  type="text"
                  name="title"
                  value={userInfo.title}
                  placeholder="product title"
                  style={{ padding: "2rem 2rem" }}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  style={{ padding: "2rem 2rem" }}
                  onChange={handleChange}
                  value={userInfo.address}
                />
              </div>
              <input
                type="number"
                name="mobile"
                placeholder="contact"
                style={{ padding: "2rem 2rem" }}
                value={userInfo.mobile}
                onChange={handleChange}
              />
              <div>
                <input
                  type="file"
                  multiple
                  name="img"
                  placeholder="product image"
                  style={{ height: "6rem" }}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>

              {/* <div className="form-content">
                <input
                  type="text"
                  name="categories"
                  placeholder="product categories"
                  rows={8}
                />
                <input type="text" name="animalType" placeholder="animaltype" />
                <input type="text" name="color" placeholder="product color" />
              </div> */}

              {/* <div>
                <textarea
                  type="text"
                  name="desc"
                  placeholder="product description"
                  rows={8}
                />
              </div> */}
              {/* <div className="form-content">
                <input
                  type="text"
                  name="gramPerQuantity"
                  placeholder="gramperquantity"
                />
                <input type="text" name="foodType" placeholder="food type" />
                <input type="text" name="stock" placeholder="product stock" />
              </div> */}

              <div>
                <button className="modal-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
