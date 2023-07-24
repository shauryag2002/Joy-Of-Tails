import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";

export const Productdetails = () => {
  const [image, setImage] = useState([]);
  const [error, setError] = useState(true);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const params = useParams();

  const getAllProducts = async () => {
    const { data } = await axios.get(`http://localhost:4000/api/product`);
    setAllProducts(data.product);
  };

  const getProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product/find/${params.id}`
    );
    setImage(data.product.img);
    setProducts(data.product);
    if (data.success) {
      getAllProducts();
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
    getProducts();
  }, [allProducts]);

  return (
    <>
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
                  <button onClick={() => {}}>-</button>
                  <input type="number" value={1} readOnly />
                  <button onClick={() => {}}>+</button>
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    addCart(products);
                  }}
                >
                  Add to Cart
                </button>
              </div>
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* <h2 style={{ textAlign: "center", fontSize: "2rem" }}>
        Related Products
      </h2> */}
      <div className="product-section- product-section-second">
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
                      <h2 style={{ textAlign: "justify", fontSize: "1.5rem" }}>
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
            }
          })}
      </div>
    </>
  );
};
