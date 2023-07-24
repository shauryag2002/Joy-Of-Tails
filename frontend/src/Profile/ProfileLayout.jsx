import React, { useEffect, useState } from "react";
import { Sidenav } from "./Sidenav/Sidenav";
import "./ProfileLayout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProfileLayout = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const getUser = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/user/find/${localStorage.getItem("id")}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(data);
    setUser({ ...data });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="top-header">
        <h2>{user.username && user.username}</h2>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Signout
        </button>
      </div>
      <div className="profile-wrapper">
        <Sidenav user={user} />
        <main>{children}</main>
      </div>
    </>
  );
};
