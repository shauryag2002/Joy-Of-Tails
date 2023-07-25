import React, { useEffect, useState } from "react";
import "./Order.css";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import axios from "axios";

export const Order = () => {
  const [order, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await axios.get("http://localhost:4000/api/order", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    const filteredOrders = data.filter((ord) => {
      if (ord.status == "Complete") {
      } else {
        return ord;
      }
    });
    setOrders(filteredOrders);
  };

  const changeStatus = async (e, orderId) => {
    const res = await axios.put(
      "http://localhost:4000/api/order/" + orderId,
      {
        status: e.target.value,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
          "content-type": "application/json",
        },
      }
    );
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section className="dashboard-section">
      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          {order.length < 0 && <h2>Loading</h2>}

          <div className="items-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Order id</th>
                  <th>Product Name</th>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.length > 0 &&
                  order.map((order, index) => {
                    return (
                      <tr>
                        <td>{index}</td>
                        <td>{order._id}</td>
                        <td>{order.products.length}</td>
                        <td>{order.address}</td>
                        <td>₹ {order.amount}</td>
                        <td>{order.status}</td>
                        <td>{order.createdAt}</td>
                        <td>
                          <select
                            name="status"
                            id="status"
                            onChange={(e) => {
                              changeStatus(e, order._id);
                            }}
                            value={order.status}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Complete">Complete</option>
                            <option value="Reject">Reject</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <div style={{ width: "70%", margin: " 2rem auto" }}>
            <p style={{ fontSize: "1.6rem" }}>Page 1 out of 30</p>
          </div>
        </div>
      </div>
    </section>
  );
};
