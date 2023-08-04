import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDownCircle } from "react-icons/ai";
import { Rating } from "react-simple-star-rating";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactPaginate from "react-paginate";
import { AddShipping } from "../Store/ShipingSlice/ShipingSlice";

export const Products = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [products, setAllProducts] = useState([]);
  const [page, setPage] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [pagenation, setPagination] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(10000000);
  const [brand, setBrand] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isProduct, setIsProduct] = useState(true);
  const [filterProduct, setFilterProduct] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const data = useSelector((state) => {
    return state.Shipping;
  });

  const getAllProducts = async () => {
    const { data } = await axios.get(`/api/product?limit=${12}`);
    if (params.name === "all") {
      setAllProducts(data.product);
    } else {
      setAllProducts(data.product);
      setIsProduct(false);
      const filter = data.product.filter((prod) => {
        if (prod.categories.toLowerCase().includes(params.name.toLowerCase()))
          return prod;
        if (prod.brand.toLowerCase().includes(params.name.toLowerCase()))
          return prod;
      });
      setIsFilter(true);
      setFilterProduct([...filter]);
    }
    const newdata = [...new Set(data.product.map((item) => item.brand))];
    setBrand(newdata);
    const newCategory = [
      ...new Set(data.product.map((item) => item.categories)),
    ];
    setCategories(newCategory);
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
      `/api/product?page=${selected + 1}&limit=${12}`
    );
    setAllProducts(data.product);
  };
  // export const Products = () => {

  const addCart = async (product) => {
    const { data } = await axios.post(
      "/api/cart",
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
    const { data } = await axios.get("/api/category");
    setCategories(data);
  };
  const filteredProducts = () => {
    const filter1 = products.filter((product) => {
      const filter1 = products1.filter((product) => {
        return product.ratings >= ratings;
      });
      setAllProducts(filter1);
    });
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

  const brandSearch = (title) => {
    const filter = products.filter((prod) => {
      return prod.brand.toLowerCase().includes(title.toLowerCase());
    });
    setFilterProduct([...filter]);
    setIsFilter(true);
    setIsProduct(false);
  };

  const categorySearch = (title) => {
    const filter = products.filter((prod) => {
      return prod.categories.toLowerCase().includes(title.toLowerCase());
    });
    setFilterProduct([...filter]);
    setIsFilter(true);
    setIsProduct(false);
  };

  useEffect(() => {
    filteredProducts();
  }, [ratings]);
  useEffect(() => {
    getAllProducts();
    // getCategories();
  }, []);

  return (
    <>
      <div className="product-wrapper">
        <div className="filter-section">
          <div className={filterShow ? `show` : "filter-show"}>
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                fontSize: "1.4rem",
              }}
            >
              Filter
              <AiFillDownCircle
                className="show-icon"
                onClick={() => {
                  setFilterShow(!filterShow);
                }}
              />
            </h2>
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
              <button
                onClick={rangeFilter}
                style={{
                  marginLeft: "10px",
                  padding: "0.1rem 1rem",
                  backgroundColor: "tomato",
                  border: "none",
                  cursor: "pointer",
                }}
              >
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
              <div
                style={{
                  fontSize: "1.3rem",
                  textTransform: "capitalize",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
                className="top-space"
              >
                {categories.map((cat, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => {
                        categorySearch(cat);
                      }}
                    >
                      {cat}
                    </p>
                  );
                })}
              </div>
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
                <p
                  onClick={() => {
                    setIsFilter(false);
                    setIsProduct(true);
                  }}
                >
                  All
                </p>

                <ul className="brand">
                  {brand.length > 0 &&
                    brand.map((prod) => {
                      return (
                        <li
                          onClick={() => {
                            brandSearch(prod);
                          }}
                        >
                          {prod}
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
          {isProduct &&
            products.length > 0 &&
            products.map((product) => {
              return (
                <div className="products-section">
                  <div className="products-items">
                    <Link to={`/productsdetails/${product._id}`}>
                      <figure>
                        <img
                          src={`/uploads/${product.img[0]}`}
                          style={{ width: "100%" }}
                        />
                      </figure>
                      <h2>{product.title}</h2>
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
            })}

          {isFilter &&
            filterProduct.length > 0 &&
            filterProduct.map((product) => {
              return (
                <div className="products-section">
                  <div className="products-items">
                    <Link to={`/productsdetails/${product._id}`}>
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
            })}
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
