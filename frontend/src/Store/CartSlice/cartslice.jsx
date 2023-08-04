import { createSlice } from "@reduxjs/toolkit";
import { steps } from "framer-motion";
import { useEffect } from "react";
// let isAdmin;
// let isUser;

// if (localStorage.getItem("isAdmin")) {
//   isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
// }
// if (localStorage.getItem("token")) {
//   isUser = localStorage.getItem("token");
// }

const cartSlice = createSlice({
  name: "cart",
  initialState: "",
  reducers: {
    checkCart(state, action) {
      return action.payload;
    },
  },
});

export const { checkCart } = cartSlice.actions;

export default cartSlice.reducer;
