import React from "react";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";

export const Order = () => {
  return (
    <section className="dashboard-section">
      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div className="items-wrapper">
            <div className="items">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
              <div>
                <h2>Order1</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Incidu
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
          <div style={{ width: "70%", margin: " 2rem auto" }}>
            <p style={{ fontSize: "1.6rem" }}>Page 1 out of 30</p>
          </div>
        </div>
      </div>
    </section>
  );
};
