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
    email: "abc@xyz.com",
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
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:4000/api/razorpay/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:4000/api/razorpay/checkout", {
      amount,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Joy Of Tails",
      description: "Joy Of Tails ,A Eccomerce website",
      image:
        "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/4f1405ea-4f7e-4efd-a44f-f405588725ec._CR0%2C0%2C400%2C400_SX200_.png",
      order_id: order.id,
      // callback_url: `http://localhost:4000/api/razorpay/paymentverification`,
      handler: async function (response) {
        const res = await axios.post("http://localhost:4000/api/order", {
          // headers: {
          //   token: localStorage.getItem("token"),
          //   "Content-Type": "application/json",
          // },
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          name: user.name,
          email: shippingInfo.email,
          phoneNo: shippingInfo.phoneNo,
          amount: Number(amount),
          address,
          products: cartItems[0].products,
          userId: cartItems[0].userId,
        });
        console.log(response);
        const redirect = await axios.post(
          "http://localhost:4000/api/razorpay/paymentverification",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        window.location.replace(
          `/paymentsuccess?reference=${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: user.name,
        email: shippingInfo.email,
        contact: `${shippingInfo.phoneNo}`,
        products: cartItems.products,
      },
      notes: {
        address: address,
        name: user.name,
        email: shippingInfo.email,
        phoneNo: shippingInfo.phoneNo,
        amount: shippingInfo.amount,
        products: cartItems.products,
      },
      theme: {
        color: "#FF6347",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
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
                <span>{shippingInfo.phoneNo}</span>
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

            <button
              onClick={() => {
                checkoutHandler(totalPrice);
                // proceedToPayment
              }}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
