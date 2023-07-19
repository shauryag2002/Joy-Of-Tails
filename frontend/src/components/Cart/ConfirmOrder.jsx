import React, { Fragment, useState, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
// import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Typography } from "@material-ui/core";

const ConfirmOrder = ({ history }) => {
  //   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  //   const { user } = useSelector((state) => state.user);
  const [shippingInfo, setShippingInfo] = useState({
    phoneNo: 9876543210,
    address: "abc street no. 6",
    city: "delhi",
    state: "delhi",
    country: "delhi",
    pinCode: "110051",
  });
  const [user, setUser] = useState({ name: "abc" });
  const [cartItems, setCartItems] = useState([
    {
      products: [
        {
          name: "product 1",
          img: [
            "https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Frame_10976_1600x.png?v=1685180179",
          ],
          quantity: 100,
          price: 6000,
        },
      ],
    },
  ]);
  useEffect(() => {
    const CartItemFun = async () => {
      const id = localStorage.getItem("id");
      console.log(id);
      const jwtToken = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:4000/api/cart/find/${id}`, {
        headers: {
          token: jwtToken,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setCartItems(res.data);
    };
    CartItemFun();
  }, []);
  const subtotal = cartItems[0].products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    localStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      {/* <MetaData title="Confirm Order" /> */}
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <div>Shipping Info</div>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                {/* <span>{shippingInfo.phoneNo}</span> */}
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <div>Your Cart Items:</div>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems[0].products.map((item) => (
                  <div key={item.product}>
                    <img src={`/uploads/` + item.img[0]} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <div className="orderSummaryHeading">Order Summery</div>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
