import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Home } from "./Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Dashboard } from "./Dashboard/Dashboard";
import { Order } from "./Dashboard/Order";
import Login from "./components/Login/Login";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/create" element={<Order />} />
          <Route path="/login" element={<Login />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
