import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export const Products = () => {
  const [products, setAllProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);
  const [filter, setFilter] = useState([]);
  const getAllProducts = async () => {
    const { data } = await axios.get("http://localhost:4000/api/product");
    setAllProducts(data);
    setProducts1(data);
  };

  const addCart = async (product) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/cart",
      {
        userId: localStorage.getItem("id"),
        products: [
          {
            productId: product._id,
            quantity: 1,
            img: product.img,
            name: product.title,
            price: product.price,
          },
        ],
      },
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    console.log(data);
  };
  const getCategories = async function () {
    const { data } = await axios.get("http://localhost:4000/api/category/");
    console.log(data);
    setCategories(data);
  };
  const filteredProducts = () => {
    const filter1 = products1.filter((product) => {
      return product.ratings >= ratings;
    });
    setAllProducts(filter1);
  };
  const rangeFilter = () => {
    const filter1 = products1.filter((product) => {
      if (max == 0 && min == 0) return product;
      return (
        product.price >= min &&
        product.price <= max &&
        product.ratings >= ratings
      );
    });
    setAllProducts(filter1);
  };
  useEffect(() => {
    filteredProducts();
  }, [ratings]);
  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);
  console.log(products);
  return (
    <>
      <div className="product-wrapper">
        <div className="filter-section">
          <div className="filter">
            <h2 style={{ fontSize: "2rem", textAlign: "center" }}>Filter</h2>
            <hr />
            <div className="ratings top-space">
              <h2 style={{ fontSize: "1.6rem", textAlign: "left" }}>Rating</h2>
              <input
                type="range"
                min={1}
                max={5}
                onChange={(e) => {
                  setRatings(e.target.value);
                }}
                defaultValue={1}
                className="ratings-input top-space"
              />
            </div>
            <div className="price top-space">
              <h2 style={{ fontSize: "1.6rem", textAlign: "left" }}>Price</h2>
              <input
                type="number"
                min={0}
                placeholder="₹ MIN"
                onChange={(e) => {
                  setMin(e.target.value);
                }}
                className="number-input"
              />
              <input
                type="number"
                placeholder="₹ MAX"
                onChange={(e) => {
                  setMax(e.target.value);
                }}
                className="number-input inp"
              />
              <button onClick={rangeFilter} style={{ marginLeft: "10px" }}>
                GO
              </button>
            </div>
            <div className="categories top-space">
              <h2 style={{ fontSize: "1.6rem", textAlign: "left" }}>
                Categories
              </h2>
              {categories.map((cat, i) => {
                return (
                  <div
                    key={i}
                    style={{ fontSize: "14px" }}
                    className="top-space"
                  >
                    {cat.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={
            products && products.length > 0
              ? "product-section"
              : "product-section-two"
          }
        >
          {products && products.length > 0 ? (
            products.map((product) => {
              return (
                <div className="products-section">
                  <div className="products-items">
                    <Link to={`/products/${product._id}`}>
                      <figure>
                        <img
                          src={`/uploads/${product.img[0]}`}
                          style={{ width: "100%" }}
                        />
                      </figure>
                      <h2 style={{ textAlign: "center", fontSize: "2.8rem" }}>
                        {product.title}
                      </h2>
                    </Link>
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                      <p>
                        <Rating size={20} /> || 109 reviews
                      </p>
                    </div>

                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "1.5rem",
                        marginTop: "1rem",
                        fontWeight: "700",
                        color: "#044B9A",
                      }}
                    >
                      Rs {product.price}
                    </p>
                    <button
                      onClick={() => {
                        addCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "5rem",
                color: "gray",
                marginTop: "2rem",
              }}
            >
              No Products Avilable
            </p>
          )}
        </div>
      </div>
    </>
  );
};
