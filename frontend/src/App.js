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
import { Persional } from "./Profile/Persionalinfo/Persional";
import { Userorder } from "./Profile/Order/Userorder";
import { User } from "./Dashboard/User";
import { Admin } from "./Dashboard/Admin";
import { Featured } from "./Dashboard/Featured";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import ResetPassword from "./ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="dashboard" element={<Privateroute />}>
                    <Route path="" element={<Admin />} />
                    <Route path="products" element={<Dashboard />} />
                    <Route path="order" element={<Order />} />
                    <Route path="user" element={<User />} />
                    <Route path="feature" element={<Featured />} />
                  </Route>
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<Productdetails />} />
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/order/confirm" element={<ConfirmOrder />} />
                  <Route path="/profile" element={<Persional />} />
                  <Route path="/userorder" element={<Userorder />} />
                  <Route path="/paymentsuccess" element={<PaymentSuccess />} />
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
