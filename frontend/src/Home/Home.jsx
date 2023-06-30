import React from "react";
import "./Home.css";
import { PiDogFill } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { MyCarousel } from "../Carousel/Carousel";
import banner1 from "../Asset/banner1.webp";
import banner2 from "../Asset/banner2.jpg";
import { CategoryCarousel } from "../Carousel/CategoryCarousel";

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

const dogProducts = [
  {
    key: "1",
    imgName: banner1,
  },
  {
    key: "2",
    imgName: banner2,
  },
  {
    key: "3",
    imgName: banner1,
  },
  {
    key: "4",
    imgName: banner2,
  },
  {
    key: "5",
    imgName: banner1,
  },
  {
    key: "6",
    imgName: banner2,
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
      <section style={{ backgroundColor: "rgb(242, 215, 10" }}>
        <MyCarousel images={images} desktop={1} dots={true} arrow={false} />
      </section>
      <section>
        <div className="dog-product">
          <div className="left">
            <h2>Dogs & More</h2>
          </div>
          <CategoryCarousel
            images={dogProducts}
            desktop={5}
            dots={false}
            arrow={true}
          />
        </div>

        <div className="cat-product">
          <div className="left">
            <h2>Cats & More</h2>
          </div>
          <CategoryCarousel
            images={dogProducts}
            desktop={5}
            dots={false}
            arrow={true}
            countslide={1}
          />
        </div>
      </section>
    </>
  );
};
