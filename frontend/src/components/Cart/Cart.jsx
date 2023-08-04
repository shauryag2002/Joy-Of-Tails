import React, { Fragment, useEffect, useState } from "react";
// import { RemoveShoppingCartIcon } from "@mui/icons-material/RemoveShoppingCart";
import { MdRemoveShoppingCart } from "react-icons/md";
import "./Cart.css";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkCart } from "../../Store/CartSlice/cartslice";

const Cart = () => {
  const [ok, setOk] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [cartItems2, setCartItems2] = useState({});

  const incQuantity = async (cartId, quan, productId) => {
    console.log(count);
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
  const CartItemFun = async () => {
    const id = localStorage.getItem("id");
    const jwtToken = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:4000/api/cart/find/${id}`, {
      headers: {
        token: jwtToken,
        "Content-Type": "application/json",
      },
    });
    if (res.data.success) {
      if (res.data.cart) {
        setCartItems([...res.data.cart.products]);
        setCartItems2({ ...res.data.cart });
        localStorage.setItem("cartLength", res.data.cart.products.length);
      }
    }
  };

  useEffect(() => {
    CartItemFun();
  }, []);

  // if (ok) {
  //   return <Cart />;
  // }
  const deleteCartItems = async (cartId, pid) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/cart/${cartId}/${pid}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
    // setCartItems(data);
    CartItemFun();
  };
  return (
    <Fragment>
      {cartItems?.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart className="font" />

          <div className="font">No Product in Your Cart</div>
          <Link to="/products/all" className="font">
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

            {cartItems.length > 0 &&
              cartItems?.map((item) => (
                <div className="cartContainer" key={item._id}>
                  <CartItemCard
                    item={item}
                    deleteCartItems={deleteCartItems}
                    cartId={cartItems2._id}
                  />

                  <div className="cartInput">
                    <button
                      onClick={() => {
                        // decreaseQuantity(item.product, item.quantity)
                        descQuantity(
                          cartItems._id,
                          item.quantity,
                          item.productId
                        );
                        setCount(item.quantity + 1);
                      }}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() => {
                        incQuantity(cartItems._id, item.Stock, item.productId);
                        setCount(item.quantity);
                        // setCount(count + 1);
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
                <p>{`₹${cartItems?.reduce(
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
