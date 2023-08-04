import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import axios from "axios";
import { ProfileLayout } from "../ProfileLayout";

export const Sidenav = ({ user }) => {
  const [userInfo, setUserInfo] = useState({});
  const [formdata, setFormData] = useState({
    name: user.username,
    email: user.email,
  });

  const getUserInfo = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/user/find/${localStorage.getItem("id")}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data) {
      setUserInfo({ ...data });
      setFormData({
        ...formdata,
        username: data.username,
        email: data.email,
      });
    }
  };

  const [formdatatwo, setFormDatatwo] = useState({
    oldpassword: "",
    newpassword: "",
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

  const handlePassword = (e) => {
    setFormDatatwo({
      ...formdatatwo,
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(
      `http://localhost:4000/api/user/${localStorage.getItem("id")}`,
      {
        oldpassword: formdatatwo.oldpassword,
        newpassword: formdatatwo.newpassword,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      alert("update successfully");
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
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
        <form
          className="form-wrapper"
          onSubmit={handlePasswordSubmit}
          method="post"
        >
          <div>
            <input
              type="text"
              name="oldpassword"
              placeholder="enter your old password"
              onChange={handlePassword}
              value={formdatatwo.oldpassword}
            />
          </div>
          <div>
            <input
              type="text"
              name="newpassword"
              placeholder="enter your new password"
              onChange={handlePassword}
              value={formdatatwo.newpassword}
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
              Persional Info
            </Link>
          </li>
          {/* <li>
            <Link className="links" to="/userorder">
              Billing & Payments
            </Link>
          </li> */}
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
