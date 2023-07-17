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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/create" element={<Order />} />
                  <Route path="/cart" element={<Cart />} />
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
