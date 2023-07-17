import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [ok, setOK] = useState(false);

  const [allProducts, setAllProducts] = useState([]);

  const [image, setImage] = useState("");
  const [formdata, setFormData] = useState({
    title: "",
    desc: "",
    categories: "",
    color: "",
    stock: "",
    price: "",
  });

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:4000/api/product");
    setAllProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      console.log(image[i]);
      formData.append("img", image[i]);
    }
    formData.append("title", formdata.title);
    formData.append("desc", formdata.desc);
    formData.append("price", formdata.price);
    formData.append("categories", formdata.categories);
    formData.append("color", formdata.color);
    formData.append("stock", formdata.stock);

    const { data } = await axios.post(
      "http://localhost:4000/api/product",
      formData,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    setFormData({
      title: "",
      desc: "",
      categories: "",
      color: "",
      stock: "",
      price: "",
    });
    setOpen(false);
    if (data.success) {
      setOK(true);
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/product/${id}`,
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    if (data.success) {
      setOK(true);
    }
  };

  if (ok) {
    return <Dashboard />;
  }
  return (
    <section className="dashboard-section">
      <Modal
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
              name="title"
              placeholder="product title"
              onChange={handleChange}
              value={formdata.title}
            />
          </div>
          <div>
            <input
              type="text"
              name="desc"
              placeholder="product descripton"
              onChange={handleChange}
              value={formdata.desc}
            />
          </div>
          <div>
            <input
              type="text"
              name="categories"
              placeholder="product categories"
              onChange={handleChange}
              value={formdata.categories}
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
      </Modal>

      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => {
                setOpen(true);
              }}
              style={{
                borderRadius: "4px",
                padding: "0.8rem 2rem",
                border: "none",
                outline: "none",
                textAlign: "end",
                margin: "0.8rem 4rem",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </div>
          <div className="items-wrapper">
            {allProducts.length > 0 ? (
              allProducts.map((products) => {
                return (
                  <div className="items">
                    <img src={`/uploads/${products.img[0]}`} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        padding: "0 7rem",
                      }}
                    >
                      <h2 style={{ fontSize: "2rem" }}>
                        Titile :{products.title}
                      </h2>
                      <p style={{ fontSize: "1.5rem" }}>
                        Price {products.price}
                      </p>
                      <p
                        style={{
                          fontSize: "1.3rem",
                        }}
                      >
                        {products.desc}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "center",
                        marginTop: "2rem",
                      }}
                    >
                      <Link to={`/edit/${products._id}`}>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(products._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2
                style={{ textAlign: "center", fontSize: "4rem", color: "gray" }}
              >
                No Products Availabe
              </h2>
            )}
          </div>
          {allProducts.length > 0 && (
            <div style={{ width: "70%", margin: " 2rem auto" }}>
              <p style={{ fontSize: "1.6rem" }}>Page 1 out of 30</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
