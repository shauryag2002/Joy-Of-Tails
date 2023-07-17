import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

export const Edit = () => {
  const parms = useParams();
  const [open, setOpen] = useState(false);
  const [ok, setOK] = useState(false);
  const [Products, setProductsdet] = useState([]);

  const [image, setImage] = useState("");
  const [formdata, setFormData] = useState({
    title: "",
    desc: "",
    categories: "",
    color: "",
    stock: "",
    price: "",
  });

  const getProductsDetails = async () => {
    const { data } = await axios.get(
      `http://localhost:4000/api/product/find/${parms.id}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDatas = new FormData();
    for (let i = 0; i < image.length; i++) {
      formDatas.append("img", image[i]);
    }
    formDatas.append("title", formdata.title);
    formDatas.append("desc", formdata.desc);
    formDatas.append("price", formdata.price);
    formDatas.append("categories", formdata.categories);
    formDatas.append("color", formdata.color);
    formDatas.append("stock", formdata.stock);

    const { data } = await axios.put(
      `http://localhost:4000/api/product/${parms.id}`,
      formDatas,
      {
        headers: {
          token: Cookies.get("token") && Cookies.get("token"),
        },
      }
    );
    // setFormData({
    //   title: "",
    //   desc: "",
    //   categories: "",
    //   color: "",
    //   stock: "",
    //   price: "",
    // });
    setOpen(false);
    if (data.success) {
      setOK(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    getProductsDetails();
  });

  return (
    <>
      <form
        className="form-wrapper"
        onSubmit={handleSubmit}
        method="post"
        style={{
          width: "50%",
          margin: "4rem auto",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <input
            type="text"
            name="title"
            placeholder="product title"
            onChange={handleChange}
            value={formdata.title}
          />
        </div>
        <div>
          <input
            type="text"
            name="desc"
            placeholder="product descripton"
            onChange={handleChange}
            value={formdata.desc}
          />
        </div>
        <div>
          <input
            type="text"
            name="categories"
            placeholder="product categories"
            onChange={handleChange}
            value={formdata.categories}
          />
        </div>

        <div>
          <input
            type="text"
            name="color"
            placeholder="product color"
            onChange={handleChange}
            value={formdata.color}
          />
        </div>
        <div>
          <input
            type="text"
            name="stock"
            placeholder="product stock"
            onChange={handleChange}
            value={formdata.stock}
          />
        </div>
        <div>
          <input
            type="text"
            name="price"
            placeholder="product price"
            onChange={handleChange}
            value={formdata.price}
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
