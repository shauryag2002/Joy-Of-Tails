import "./Dashboard.css";
import React, { useState } from "react";
import { Modal } from "antd";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="dashboard-section">
      <Modal
        title="Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        // width={1000}
      >
        <form className="form-wrapper">
          <div>
            <input type="text" name="" id="" placeholder="product title" />
          </div>
          <div>
            <input type="text" name="" id="" placeholder="product descripton" />
          </div>
          <div>
            <input type="text" name="" id="" placeholder="product category" />
          </div>

          <div>
            <input type="text" name="" id="" placeholder="product color" />
          </div>
          <div>
            <input type="text" name="" id="" placeholder="product stock" />
          </div>
          <div>
            <input type="file" name="" id="" placeholder="product image" />
          </div>
        </form>
      </Modal>

      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => {
                setOpen(true);
              }}
              style={{
                borderRadius: "4px",
                padding: "0.8rem 2rem",
                border: "none",
                outline: "none",
                textAlign: "end",
                margin: "0.8rem 4rem",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </div>
          <div className="items-wrapper">
            <div className="items">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt=""
              />
              <div>
                <h2>Product1</h2>
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
