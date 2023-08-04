import React, { useEffect, useState } from "react";
import "./Order.css";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import axios from "axios";
import Modal from "antd/es/modal/Modal";

export const Featured = () => {
  const [feature, setFeature] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const getFeatured = async () => {
    const { data } = await axios.get("http://localhost:4000/api/featured");
    if (data) {
      setFeature([...data.img]);
    }
  };
  useEffect(() => {
    getFeatured();
  }, []);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const files = image;
    const formData = new FormData();
    for (const file of files) {
      formData.append("img", file);
    }
    const { data } = await axios.post(
      "http://localhost:4000/api/featured",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      window.location.reload();
    }
  };

  const deleteFeatured = async () => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      const { data } = await axios.delete(
        "http://localhost:4000/api/featured/delete",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data.success) {
        window.location.reload();
      }
    }
  };

  return (
    <section className="dashboard-section">
      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>

        <div className="right-section">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={() => {
                setOpen(true);
              }}
              style={{
                background: "tomato",
                border: "none",
                padding: "1rem 2rem",
                cursor: "pointer",
                fontSize: "1.4rem",
              }}
            >
              Create
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "5rem",
            }}
          >
            {feature.length > 0 ? (
              feature.map((img) => {
                return (
                  <div>
                    <img
                      src={`/uploads/${img}`}
                      alt=""
                      width={"100%"}
                      height={250}
                    />
                  </div>
                );
              })
            ) : (
              <h2 style={{ fontSize: "4rem", color: "gray" }}>
                No Featured Image{" "}
              </h2>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            {feature.length > 0 && (
              <button
                style={{
                  background: "tomato",
                  border: "none",
                  padding: "1rem 2rem",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                }}
                onClick={() => {
                  deleteFeatured();
                }}
              >
                Delte
              </button>
            )}
          </div>
          <Modal
            title="Form"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          >
            <form
              className="form-wrapper"
              onSubmit={handleSubmit}
              method="post"
            >
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
                <button>Submit</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </section>
  );
};
