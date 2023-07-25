import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import { AddShipping } from "../Store/ShipingSlice/ShipingSlice";

export const Products = () => {
  const [products, setAllProducts] = useState([]);
  const [page, setPage] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [pagenation, setPagination] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState(1);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);
  const [filter, setFilter] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => {
    return state.Shipping;
  });

  const getAllProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product?limit=${6}`
    );
    setAllProducts(data.product);
    // setBrand()
    setPageCount(data.pageCount);
    const paginationPage = [];
    for (let i = 1; i <= data.count; i++) {
      paginationPage.push(i);
    }
    setPagination([...paginationPage]);

    setProducts1(data.product);
  };

  const changePage = async ({ selected }) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product?page=${selected + 1}&limit=${6}`
    );
    setAllProducts(data.product);
  };
  // export const Products = () => {

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
    if (data.success) {
      alert("Add to cart");
    }
  };
  const getCategories = async function () {
    const { data } = await axios.get("http://localhost:4000/api/category");
    setCategories(data);
  };
  const filteredProducts = () => {
    console.log(typeof ratings);
    if (ratings === "1") {
      window.location.reload();
    }
    // const filter1 = products.filter((product) => {
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
    console.log(filter1);
    setAllProducts(filter1);
  };

  const brandSearch = (title) => {
    const filter = products.filter((prod) => {
      return prod.brand.toLowerCase().includes(title.toLowerCase());
    });
    setAllProducts(filter);
  };

  useEffect(() => {
    filteredProducts();
  }, [ratings]);
  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);
  return (
    <>
      <div className="product-wrapper">
        <div className="filter-section">
          <div className="filter">
            <h2 style={{ fontSize: "2rem", textAlign: "center" }}>Filter</h2>
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
              <h2 style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>
                Price
              </h2>
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
              <h2
                style={{
                  fontSize: "1.6rem",
                  textAlign: "left",
                  marginTop: "2rem",
                }}
              >
                Categories
              </h2>
              {categories.map((cat, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      fontSize: "1.3rem",
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                    className="top-space"
                  >
                    {cat.name}
                  </div>
                );
              })}
              <div>
                <h2
                  style={{
                    fontSize: "1.6rem",
                    textAlign: "left",
                    marginTop: "2rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  Brand
                </h2>
                <ul className="brand">
                  {products.map((prod) => {
                    return (
                      <li
                        onClick={() => {
                          brandSearch(prod.brand);
                        }}
                      >
                        {prod.brand}
                      </li>
                    );
                  })}
                </ul>
              </div>
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
                      <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>
                        {product.title}
                      </h2>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          marginTop: "2rem",
                        }}
                      >
                        Brand : {product.brand}
                      </p>
                    </Link>
                    <div style={{ textAlign: "center", marginTop: "2rem" }}>
                      <p>
                        <Rating
                          size={20}
                          readonly
                          initialValue={product.ratings}
                        />{" "}
                        || {product.numOfReviews} reviews
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
                      ₹{product.price}
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={changePage}
          pageRangeDisplayed={pageCount}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          activeClassName="active"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
      {/* 
      <button
        onClick={() => {
          dispatch(
            AddShipping({
              city: "love",
              state: "Haryana",
            })
          );
        }}
      >
        Clickf
      </button> */}

      {/* <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {pagenation &&
          pagenation.map((i) => {
            return (
              <span
                style={{ fontSize: "1.8rem", cursor: "pointer" }}
                onClick={() => {
                  changePage(i);
                }}
              >
                {i}
              </span>
            );
          })}
      </div> */}
    </>
  );
};
