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
  const [products, setAllProducts] = useState();
  const [page, setPage] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [pagenation, setPagination] = useState([]);

  const dispatch = useDispatch();

  const data = useSelector((state) => {
    console.log(state);
    return state.Shipping;
  });
  console.log(data);

  const getAllProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/product`);
    setAllProducts(data.product);
    setPageCount(data.pageCount);
    const paginationPage = [];
    for (let i = 1; i <= data.count; i++) {
      paginationPage.push(i);
    }
    setPagination([...paginationPage]);
  };

  const changePage = async ({ selected }) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product?page=${selected + 1}&limit=${6}`
    );
    setAllProducts(data.product);
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
    if (data.success) {
      alert("Add to cart");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="product-wrapper">
        <div className="filter-section">
          <div className="filter">
            <h2 style={{ fontSize: "2rem", textAlign: "center" }}>Filter</h2>
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

{
  /* <div className="products-items">
  <figure>
    <img src={`/uploads/${product.img[0]}`} alt="" />
  </figure>
  <h2 style={{ textAlign: "center", fontSize: "2.8rem" }}>{product.title}</h2>
  <p
    style={{
      textAlign: "center",
      fontSize: "1.5rem",
      marginTop: "1rem",
      fontWeight: "700",
    }}
  >
    Rs {product.price}
  </p>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}
  ></div>
</div>; */
}
