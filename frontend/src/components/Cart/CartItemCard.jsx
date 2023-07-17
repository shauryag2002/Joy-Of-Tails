import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  console.log(item);
  return (
    <div className="CartItemCard">
      <img src={`/uploads/${item.img[0]}`} alt="ssa" />
      <div>
        <Link to={`/product/${item._id}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
