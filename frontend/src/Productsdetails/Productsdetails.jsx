import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import "./index.css";
import axios from "axios";
export const Productdetails = () => {
  const [image, setImage] = useState([]);
  const [products, setAllProducts] = useState([]);

  const [index, setIndex] = useState(0);

  const params = useParams();
  const getAllProducts = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product/find/${params.id}`
    );
    console.log(data);
    setImage(data.img);
    setAllProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="product-details-section">
        <div className="left">
          <div className="left-container">
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
            <div className="img-preview">
              <img src={`/uploads/${image[index]}`} alt="" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="right-wrapper">
            <h2 style={{ fontSize: "2rem" }}>{products && products.title}</h2>
            <p style={{ fontSize: "1rem" }}>
              <Rating size={20} /> || {products.numOfReviews} customer reviews
            </p>
            <p style={{ fontSize: "1rem" }}>MRP {products.price}</p>
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
          </div>
        </div>
      </div>
    </>
  );
};
