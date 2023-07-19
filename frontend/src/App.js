import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Home } from "./Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Dashboard } from "./Dashboard/Dashboard";
import { Order } from "./Dashboard/Order";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";
import { Privateroute } from "./Privateroute/Privateroute";
import { Products } from "./products/Products";
import { Error } from "./404/404";
import Register from "./components/Register/Register";
import { Productdetails } from "./Productsdetails/Productsdetails";
import { Edit } from "./Edit/Edit";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="admin" element={<Privateroute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="order" element={<Order />} />
                    {/* <Route path="user" element={<User />} /> */}
                  </Route>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<Productdetails />} />
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/order/confirm" element={<ConfirmOrder />} />

                  <Route path="*" element={<Error />} />
                </Routes>

                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
