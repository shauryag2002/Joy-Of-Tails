import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor } from "./Store/Store";
import reportWebVitals from "./reportWebVitals";
import store from "./Store/Store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
