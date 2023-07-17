import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Privateroute = () => {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const isAdmin = async () => {
    const res = await fetch("/api/user/isadmin", {
      headers: {
        id: localStorage.getItem("id"),
      },
    });
    const data = await res.json();
    if (data.success) {
      if (data.user.isAdmin) {
        setOk(true);
      } else {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    isAdmin();
  }, []);
  if (ok) {
    return <Outlet />;
  }
};
