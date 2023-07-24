import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AdminSlice from "./AdminSlice/Adminslice";
import ShipingSlice from "./ShipingSlice/ShipingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Admin: AdminSlice,
  Shipping: ShipingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// let stores = createStore(persistedReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
