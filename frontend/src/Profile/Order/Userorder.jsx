import React, { useState } from "react";
import { ProfileLayout } from "../ProfileLayout";
import axios from "axios";

export const Userorder = () => {
  const [order, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/order/all/${localStorage.getItem("id")}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setOrders(data);
  };

  const changeStatus = (e, id) => {};

  React.useEffect(() => {
    getOrders();
  }, []);
  return (
    <ProfileLayout>
      <div className="items-wrapper">
        <table style={{ width: "65vw" }}>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Order id</th>
              <th>Product Name</th>
              <th>Address</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>4654654454</td>
              <td>peddi</td>
              <td>nodia</td>
              <td>1200</td>
              <td>completed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ProfileLayout>
  );
};
