import React, { useEffect, useState } from "react";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import axios from "axios";
import "./user.css";

export const User = () => {
  const [user, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const [ok, setOk] = useState(false);

  const getAlluser = async () => {
    const { data } = await axios.get("http://localhost:4000/api/user", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setUsers([...data.AllUsers]);
  };

  useEffect(() => {
    getAlluser();
  }, [show]);

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      const { data } = await axios.delete(
        `http://localhost:4000/api/user/${id}`
      );
      if (data.success) {
        setOk(true);
      }
    }
  };

  const search = () => {
    const filterData = user.filter((item) => {
      if (keyword === "") {
        window.location.reload();
      }
      if (item.username.toLowerCase().includes(keyword.toLowerCase())) {
        return item;
      }
      //   if (item.desc.toLowerCase().includes(keyword.toLowerCase())) {
      //     return item;
      //   }
      //   if (item.categories.toLowerCase().includes(keyword.toLowerCase())) {
      //     return item;
      //   }
      //   if (item.price.toString().toLowerCase().includes(keyword.toLowerCase())) {
      //     return item;
      //   }
    });
    setUsers(filterData);
  };
  if (ok) {
    return <User />;
  }
  return (
    <section className="dashboard-section">
      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <input
            style={{ marginTop: "2rem", marginLeft: "2rem" }}
            type="search"
            name="search"
            placeholder="search users"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            onKeyUp={search}
          />
          <div className="user-wrapper">
            <table style={{ marginTop: "2rem" }}>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>User id</th>
                  <th>Name</th>
                  <th>Eamil</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  user.map((userData, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{userData._id}</td>
                        <td>{userData.username}</td>
                        <td>{userData.email}</td>
                        <button
                          className="btn"
                          onClick={() => {
                            deleteUser(userData._id);
                          }}
                        >
                          Delete
                        </button>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* <div style={{ width: "70%", margin: " 2rem auto" }}>
            <p style={{ fontSize: "1.6rem" }}>Page 1 out of 30</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

// <div className="items">
//   <img src={userData.image} alt="" />
//   <div>
//     <h2
//       style={{
//         fontSize: "2rem",
//         textAlign: "center",
//         textTransform: "capitalize",
//       }}
//     >
//       {userData.username}
//     </h2>
//     {/* <p >
//       Lorem ipsum dolor sit amet consectetur, adipisicing
//       elit. Incidu
//     </p> */}
//   </div>
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       marginTop: "2rem",
//     }}
//   >
//     {/* <button>Edit</button> */}
//     <button
//       onClick={() => {
//         deleteUser(userData._id);
//       }}
//     >
//       Delete
//     </button>
//   </div>
// </div>
