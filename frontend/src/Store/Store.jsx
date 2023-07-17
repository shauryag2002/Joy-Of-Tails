import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice/Adminslice";

const store = configureStore({
  reducer: {
    Admin: AdminSlice,
  },
});

export default store;
