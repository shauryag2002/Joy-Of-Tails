import React, { Fragment, useEffect, useState } from "react";
// import { RemoveShoppingCartIcon } from "@mui/icons-material/RemoveShoppingCart";
import { MdRemoveShoppingCart } from "react-icons/md";
import "./Cart.css";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import axios from "axios";
const Cart = () => {
  const [ok, setOk] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      products: [
        {
          name: "product 1",
          img: [
            "https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Frame_10976_1600x.png?v=1685180179",
          ],
          quantity: 1,
          price: 6000,
        },
      ],
    },
  ]);
  const incQuantity = async (cartId, quan, productId) => {
    const jwtToken = localStorage.getItem("token");
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
    // setCartItems(data);
    setOk(true);
  };
  const descQuantity = async (cartId, quan, productId) => {
    const jwtToken = localStorage.getItem("token");
    if (quan >= 2) {
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
      setOk(true);
      // setCartItems(data);
    }
  };
  const [count, setCount] = useState(0);
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

  if (ok) {
    return <Cart />;
  }
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart className="font" />

          <div className="font">No Product in Your Cart</div>
          <Link to="/" className="font">
            View Products
          </Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems[0].products?.map((item) => (
                <div className="cartContainer" key={item._id}>
                  <CartItemCard
                    item={item}
                    //   deleteCartItems={deleteCartItems}
                  />
                  <div className="cartInput">
                    <button
                      onClick={() => {
                        // decreaseQuantity(item.product, item.quantity)
                        descQuantity(
                          cartItems[0]._id,
                          item.quantity,
                          item.productId
                        );
                        setCount(count + 1);
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() => {
                        //     increaseQuantity(
                        //       item.product,
                        //       item.quantity,
                        //       item.stock
                        incQuantity(
                          cartItems[0]._id,
                          item.quantity,
                          item.productId
                        );
                        setCount(count + 1);
                        //     )
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems[0].products.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <Link to={"/shipping"} className="checkOutBtn">
                <button
                // onClick={checkoutHandler}
                >
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
