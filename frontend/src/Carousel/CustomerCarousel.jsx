import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import "./CustomerCarousel.css";

export const CustomerCarousel = ({ images, arrows, dots }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel
        responsive={responsive}
        arrows={arrows}
        showDots={dots}
        swipeable={true}
        draggable={true}
        autoPlay={true}
        autoPlaySpeed={6000}
        className="mycarousel"
      >
        {images.map((img) => {
          return (
            <div className="customer-wrapper">
              <figure>
                <img src={img.imgName} alt="" />
              </figure>
              <div className="customer-content">
                <h2 style={{ fontSize: "4rem", lineHeight: "6rem" }}>
                  Views Of Our Happy Customers
                </h2>
                <p>
                  Diam volutpat commodo sed egestas egestas fringilla. Laoreet
                  sit amet cursus sit amet dictum sit amet. Odio facilisis
                  mauris sit amet mas morbi blandit.
                </p>
                <h3>Doe John</h3>
                <h3>Teacher</h3>
              </div>
            </div>
          );
        })}
      </Carousel>
    </>
  );
};
