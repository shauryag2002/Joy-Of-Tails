import React, { useState } from "react";
import { ProfileLayout } from "../ProfileLayout";
import axios from "axios";

export const Userorder = () => {
  const [order, setOrders] = useState([]);
  const [user, setUser] = useState({});

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
    setUser(data);
  };

  const changeStatus = (e, id) => {};

  React.useEffect(() => {
    getOrders();
  }, []);
  return (
    <ProfileLayout>
      <div className="items-wrapper">
        <table style={{ width: "75vw" }} className="user-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Order id</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>quanty</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {user.length > 0 &&
              user.map((prod, index) => {
                console.log(user);
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td style={{ width: "5%" }}>{prod._id}</td>
                    <td style={{ width: "30%" }}>
                      {prod.products.map((e) => {
                        return <p style={{ fontSize: "1rem" }}>{e.name}</p>;
                      })}
                    </td>
                    <td>
                      {prod.products.map((e) => {
                        return <p style={{ fontSize: "1rem" }}>₹{e.price}</p>;
                      })}
                    </td>
                    <td>
                      {" "}
                      {prod.products.map((e) => {
                        return <p style={{ fontSize: "1rem" }}>{e.quantity}</p>;
                      })}
                    </td>

                    <td style={{ width: "20%" }}>{prod.address}</td>
                    <td style={{ border: "none" }}>{prod.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </ProfileLayout>
  );
};
