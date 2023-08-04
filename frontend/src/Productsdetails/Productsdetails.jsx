import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Link, NavLink, useParams } from "react-router-dom";
import { Modal } from "antd";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";

export const Productdetails = () => {
  const [image, setImage] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(true);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);

  const params = useParams();

  const getAllProducts = async () => {
    const { data } = await axios.get(`/api/product`);
    setAllProducts(data.product);
  };

  const getProducts = async () => {
    const { data } = await axios.get(`/api/product/find/${params.id}`);
    setImage(data.product.img);
    setProducts(data.product);
    if (data.success) {
      getAllProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:4000/api/product/review/${localStorage.getItem("id")}/${
        params.id
      }`,
      {
        user: localStorage.getItem("id"),
        rating,
        comment,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      setOpen(false);
    }
  };

  // if (allProducts.length > 0) {
  //   const filterData = allProducts.filter((product) => {
  //     console.log(product.brand.toLowerCase());
  //     return (
  //       product?.brand.toLowerCase() === products?.brand.toLowerCase() &&
  //       product.title !== products.title
  //     );
  //   });
  //   setFilterProducts(filterData);
  // }

  const addCart = async (product) => {
    const { data } = await axios.post(
      "/api/cart",
      {
        userId: localStorage.getItem("id"),
        products: [
          {
            productId: product._id,
            quantity: count,
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

  const incQuantity = async (cartId, quan, productId) => {
    const jwtToken = localStorage.getItem("token");
    if (quan > count) {
      setCount(count + 1);
      const res = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          token: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          products: [{ productId: productId, quantity: quan + 1 }],
        }),
      });
      const data = await res.json();
    } else {
      alert("quantity is enough");
    }
    // setCartItems(data);
    // setOk(true);
  };

  const descQuantity = async (cartId, quan, productId) => {
    const jwtToken = localStorage.getItem("token");
    if (count > 1) {
      setCount(count - 1);
      const res = await fetch(`http://localhost:4000/api/cart/${cartId}`, {
        method: "PUT",
        headers: {
          token: jwtToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("id"),
          products: [{ productId: productId, quantity: quan - 1 }],
        }),
      });
      const data = await res.json();

      // setCartItems(data);
    }
  };
  const handleRating = (number) => {
    setRating(number);
  };

  useEffect(() => {
    getProducts();
  }, [allProducts]);

  return (
    <>
      <Modal
        title="Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <form className="form-wrapper" onSubmit={handleSubmit} method="post">
          <Rating size={20} initialValue={rating} onClick={handleRating} />
          <div>
            <textarea
              name="comment"
              placeholder="comment"
              value={comment}
              rows={5}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <div>
            <button className="modal-btn">Submit Review</button>
          </div>
        </form>
      </Modal>
      <div className="product-details-section">
        <div className="left">
          <div className="left-container">
            <div className="img-preview">
              <img src={`/uploads/${image[index]}`} alt="" />
            </div>
            <div className="arr-img">
              {image.length > 0 &&
                image.map((img, index) => {
                  return (
                    <div
                      className="img-item"
                      onClick={() => {
                        setIndex(index);
                      }}
                    >
                      <img src={`/uploads/${img}`} alt="" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-wrapper">
            <h2 style={{ fontSize: "2rem" }}>{products && products.title}</h2>
            <p style={{ fontSize: "1rem" }}>
              <Rating size={20} initialValue={products.ratings} readonly /> ||{" "}
              {products.numOfReviews} customer reviews
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "550",
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
              }}
            >
              <span style={{ color: "red", fontSize: "2rem" }}>
                (-{products.discount}) %
              </span>
              <span style={{ color: "green" }}>₹ {products.sellingPrice}</span>
              <span>
                MRP : <del>{products.price}</del>
              </span>
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "550" }}>
              Brand :{" "}
              <span style={{ fontWeight: "400" }}>{products.brand}</span>
            </p>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "550",
                textTransform: "capitalize",
              }}
            >
              Diet Type :{" "}
              <span style={{ fontWeight: "400" }}>{products.foodType}</span>
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "550" }}>
              Quantity :{" "}
              <span style={{ fontWeight: "400" }}>
                {products.gramPerQuantity}
              </span>
            </p>
            <p style={{ fontSize: "1.3rem", fontWeight: "550" }}>
              Categories :
              <span style={{ fontWeight: "500" }}>{products.categories}</span>
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                color: "gray",
                lineHeight: "2.2rem",
              }}
            >
              {products.desc}
            </p>

            <p style={{ fontSize: "1.2rem" }}>Avilabe - in Stock</p>
            <div className="btn-container">
              <div>
                <div className="cartInput" style={{ marginLeft: "2rem" }}>
                  <button
                    onClick={() => {
                      descQuantity(
                        products._id,
                        products.Stock,
                        products.productId
                      );
                    }}
                  >
                    -
                  </button>
                  <input type="number" value={count} readOnly />
                  <button
                    onClick={() => {
                      console.log(products);
                      incQuantity(
                        products._id,
                        products.Stock,
                        products.productId
                      );
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn"
                  onClick={() => {
                    addCart(products);
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  submit review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
        Related Products
      </h2> */}
      <div className="product-section product-section-second">
        {allProducts.length > 0 &&
          allProducts.map((product) => {
            if (
              product.brand.toLowerCase() === products.brand.toLowerCase() &&
              product.title.toLowerCase() !== products.title.toLowerCase()
            ) {
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
            }
          })}
      </div>
    </>
  );
};
