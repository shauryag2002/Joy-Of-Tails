import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import { ProfileLayout } from "../ProfileLayout";

export const Sidenav = ({ user }) => {
  const [formdata, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState("");
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `http://localhost:4000/api/user/${localStorage.getItem("id")}`,
      {
        username: formdata.username,
        email: formdata.email,
        password: formdata.password,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      setOk(true);
      setOpen(false);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      alert("success");
      window.location.reload();
    }
  };
  return (
    <>
      <Modal
        title="Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <form className="form-wrapper" onSubmit={handleSubmit} method="post">
          <div>
            <input
              type="text"
              name="username"
              placeholder="enter your username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="enter your mail"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="enter your new password or old "
              onChange={handleChange}
              value={formdata.password}
            />
          </div>

          <div>
            <input
              type="file"
              multiple
              name="img"
              placeholder="product image"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />
          </div>

          <div>
            <button className="modal-btn">Submit</button>
          </div>
        </form>
      </Modal>

      <Modal
        title="Form"
        centered
        open={open2}
        onOk={() => setOpen2(false)}
        onCancel={() => setOpen2(false)}
      >
        <form className="form-wrapper" onSubmit={handleSubmit} method="post">
          <div>
            <input
              type="text"
              name="password"
              placeholder="enter your new password"
              onChange={handleChange}
              value={formdata.brand}
            />
          </div>
          <div>
            <button className="modal-btn">Submit</button>
          </div>
        </form>
      </Modal>
      <div className="side-nav">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-account-circle_89831.png"
            alt=""
          />
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
        </div>
        <ul>
          <li>
            <Link className="links" to="/profile">
              Persionla Information
            </Link>
          </li>
          <li>
            <Link className="links" to="/userorder">
              Billing & Payments
            </Link>
          </li>
          <li>
            <Link className="links" to="/userorder">
              Your Orders
            </Link>
          </li>
          <li
            onClick={() => {
              setOpen(true);
            }}
          >
            <Link className="links">Edit Profile</Link>
          </li>
          <li
            onClick={() => {
              setOpen2(true);
            }}
          >
            <Link className="links">Change Password</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
