import React from "react";
import "./Home.css";
import { PiDogFill } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { MyCarousel } from "../Carousel/Carousel";
import banner2 from "../Asset/banner2.jpg";
import { IoMdMailOpen } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import dog from "../Asset/dog.webp";
import cat from "../Asset/cat.webp";
import girl from "../Asset/girl.webp";
import { Link, NavLink } from "react-router-dom";
import { CustomerCarousel } from "../Carousel/CustomerCarousel";

const images = [
  {
    key: "1",
    imgName: banner2,
  },
  {
    key: "2",
    imgName: banner2,
  },
  {
    key: "3",
    imgName: banner2,
  },
];

const customerImages = [
  {
    key: "1",
    imgName:
      "https://images.businessnewsdaily.com/app/uploads/2022/04/04082415/Customer_Service_Getty_nortonrsx.jpg",
  },
  {
    key: "2",
    imgName:
      "https://images.businessnewsdaily.com/app/uploads/2022/04/04082415/Customer_Service_Getty_nortonrsx.jpg",
  },
  {
    key: "3",
    imgName:
      "https://images.businessnewsdaily.com/app/uploads/2022/04/04082415/Customer_Service_Getty_nortonrsx.jpg",
  },
];
export const Home = () => {
  return (
    <>
      <section className="category-section">
        <ul>
          <li>
            <PiDogFill />
            Dogs
            <div className="sub-menu">
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    fontSize: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                    fontSize: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1.2rem",
                    gap: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <FaCat /> Cats
            <div className="sub-menu">
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    fontSize: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                    fontSize: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
              <div>
                <h2>Food</h2>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1.2rem",
                    gap: "1.2rem",
                  }}
                >
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                  <li>Cateogry1</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section
        style={{
          width: "95%",
          margin: "auto",
        }}
      >
        <MyCarousel
          images={images}
          desktop={1}
          dots={true}
          arrow={false}
          mobile={1}
        />
      </section>
      <section>
        <div className="food-section">
          <div className="dog-wrapper">
            <h2>Dogs</h2>
            <figure className="dog">
              <img src={dog} alt="" />
            </figure>
          </div>
          <div className="cat-wrapper">
            <h2>Cats</h2>
            <figure className="cat">
              <img src={cat} alt="" />
            </figure>
          </div>
        </div>
      </section>
      <section>
        <div className="service-section">
          <figure>
            <img src={girl} alt="girl" />
          </figure>
          <div className="service-content">
            <h2>Our Passion Is </h2>
            <h2>Providing Superior</h2>
            <h2>Pet Care</h2>
            <p>
              Nulla semper accumsan magna et ultrices. Aenean at varius purus.
              Nulla egestas semper tellus. Morbi mauris elit, semper eu semin.
            </p>
            <div className="servicelist">
              <h3>24/7 support</h3>
              <h3>Personalized care</h3>
              <h3>Pet Taxi Facility</h3>
              <h3>Quick Delivery</h3>
              <h3>Money Back Guarantee</h3>
              <h3>Lowest Price</h3>
            </div>
            <div className="contact-wrappers">
              <div className="common-contact">
                <a href="">
                  <IoMdMailOpen
                    style={{
                      fontSize: "3rem",
                    }}
                  />
                </a>
                <div>
                  <p>Email us anytime</p>
                  <a href="tomail:info@gmail.com">info@gmail.com</a>
                </div>
              </div>
              <div className="common-contact">
                <a href="">
                  <BsTelephoneFill style={{ fontSize: "3rem" }} />
                </a>
                <div>
                  <p>Contact us anytime</p>
                  <a>+11111111111</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="icon-wrapper">
          <div>
            <div className="items"></div>
            <h2
              style={{
                textAlign: "center",
                fontSize: "4rem",
                marginTop: "1rem",
              }}
            >
              Dogs
            </h2>
          </div>
          <div>
            <div className="items cat"></div>
            <h2
              style={{
                textAlign: "center",
                fontSize: "4rem",
                marginTop: "1rem",
              }}
            >
              Cat
            </h2>
          </div>
        </div>
      </section>
      <section>
        <div className="product">
          <div className="product-items">
            <figure>
              <img src={dog} style={{ width: "100%" }} />
            </figure>
            <button>Add to Cart</button>
          </div>
          <div className="product-items">
            <figure>
              <img src={dog} style={{ width: "100%" }} />
            </figure>
            <button>Add to Cart</button>
          </div>{" "}
          <div className="product-items">
            <figure>
              <img src={dog} style={{ width: "100%" }} />
            </figure>
            <button>Add to Cart</button>
          </div>{" "}
          <div className="product-items">
            <figure>
              <img src={dog} style={{ width: "100%" }} />
            </figure>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>
      <section>
        <div className="sleeping-dog"></div>
      </section>
      <section>
        <CustomerCarousel images={customerImages} dots={true} arrows={false} />
      </section>
      <section>
        <div className="discount">
          <div className="discount-item">
            <h2>20%</h2>
            <h3>
              <span>Offer</span>
            </h3>
          </div>

          <div className="discount-content">
            <h2>Get Enticing Discounts</h2>
            <button>Shop Now</button>
          </div>
        </div>
      </section>
      <section className="our-service">
        <h2>Our Services</h2>
        <div className="ourservice-section">
          <div className="service-items">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <figure>
                <img src="https://www.hartz.com/wp-content/uploads/2022/03/dog-benefits-health-1.jpg" />
              </figure>
              <h2
                style={{
                  fontSize: "3.5rem",
                  textAlign: "center",
                  fontWeight: "900",
                  marginTop: "1.5rem",
                  fontFamily: "Fredoka",
                }}
              >
                Dog's Grooming
              </h2>
            </div>
          </div>
          <div className="service-items">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <figure>
                <img src="https://www.hartz.com/wp-content/uploads/2022/03/dog-benefits-health-1.jpg" />
              </figure>
              <h2
                style={{
                  fontSize: "3.5rem",
                  textAlign: "center",
                  fontWeight: "900",
                  marginTop: "1.5rem",
                  fontFamily: "Fredoka",
                }}
              >
                Broading
              </h2>
            </div>
          </div>
          <div className="service-items">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <figure>
                <img src="https://www.hartz.com/wp-content/uploads/2022/03/dog-benefits-health-1.jpg" />
              </figure>
              <h2
                style={{
                  fontSize: "3.5rem",
                  textAlign: "center",
                  fontWeight: "900",
                  marginTop: "1.5rem",
                  fontFamily: "Fredoka",
                }}
              >
                Training
              </h2>
            </div>
          </div>
          <div className="service-items">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <figure>
                <img src="https://www.hartz.com/wp-content/uploads/2022/03/dog-benefits-health-1.jpg" />
              </figure>
              <h2
                style={{
                  fontSize: "3.5rem",
                  textAlign: "center",
                  fontWeight: "900",
                  marginTop: "1.5rem",
                  fontFamily: "Fredoka",
                }}
              >
                Veterinary Care
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// https://pettie.wpengine.com/wp-content/uploads/2023/05/Pty-Dog-Image-1-overlay.png
