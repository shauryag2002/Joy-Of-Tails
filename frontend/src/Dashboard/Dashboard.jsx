import "./Dashboard.css";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import { Dashboardnav } from "../components/Dashboardnav/Dashboardnav";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState([]);

  const [pageCount, setPageCount] = useState("");
  const [keyword, setKeyword] = useState("");
  const [ok, setOK] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isProducts, setIsProducts] = useState(true);
  const [image, setImage] = useState("");
  const [sellingprice, setSelling] = useState(0);
  const [actualsellingprice, setActualSelling] = useState(0);

  const [formdata, setFormData] = useState({
    brand: "",
    title: "",
    desc: "",
    categories: "",
    color: "",
    stock: "",
    price: "",
    foodType: "",
    animalType: "",
    gramPerQuantity: "",
    discount: 0,
    mrp: "",
  });

  const getProducts = async () => {
    const { data } = await axios.get(`/api/product?limit=${12}`);
    setAllProducts([...data.product]);
    setPageCount(data.pageCount);
  };

  useEffect(() => {
    getProducts();
  }, [show]);

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const changePage = async ({ selected }) => {
    const { data } = await axios.get(
      `/api/product?page=${selected + 1} & limit=${12}`
    );
    setAllProducts(data.product);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      console.log(image[i]);
      formData.append("img", image[i]);
    }
    formData.append("title", formdata.title);
    formData.append("Stock", formdata.stock);

    formData.append("brand", formdata.brand);
    formData.append("animalType", formdata.animalType);
    formData.append("foodType", formdata.foodType);
    formData.append("gramPerQuantity", formdata.gramPerQuantity);
    formData.append("desc", formdata.desc);
    formData.append("price", formdata.mrp);
    formData.append("categories", formdata.categories);
    formData.append("color", formdata.color);
    formData.append("sellingPrice", formdata.mrp - sellingprice);
    formData.append("discount", formdata.discount);

    const { data } = await axios.post("/api/product", formData, {
      headers: {
        token: Cookies.get("token"),
      },
    });
    console.log(data);
    setFormData({
      brand: "",
      title: "",
      desc: "",
      categories: "",
      color: "",
      stock: "",
      price: "",
    });
    setOpen(false);
    if (data.success) {
      setOK(true);
      alert("Product created Successfully");
    }
  };

  const deleteProduct = async (id) => {
    const val = window.confirm("Are you Sure");
    if (val) {
      const { data } = await axios.delete(`/api/product/${id}`, {
        headers: {
          token: Cookies.get("token"),
        },
      });
      if (data.success) {
        setOK(true);
      }
    }
  };

  const search = () => {
    const filterData = allProducts.filter((items) => {
      if (keyword === "") {
        setIsFilter(false);
        setIsProducts(true);
        return allProducts;
      }
      if (items.title.toLowerCase().includes(keyword.toLowerCase())) {
        setIsFilter(true);
        setIsProducts(false);
        return items;
      }
      if (items.desc.toLowerCase().includes(keyword.toLowerCase())) {
        setIsFilter(true);
        setIsProducts(false);
        return items;
      }
      if (items.categories.toLowerCase().includes(keyword.toLowerCase())) {
        setIsFilter(true);
        setIsProducts(false);
        return items;
      }
      if (
        items.price.toString().toLowerCase().includes(keyword.toLowerCase())
      ) {
        setIsFilter(true);
        setIsProducts(false);
        return items;
      }
    });
    console.log(filterData);
    setFilterProducts([...filterData]);
  };

  const addMore = () => {
    console.log("first");
    setAdd([...add, { value: "", price: "" }]);
  };

  if (ok) {
    return <Dashboard />;
  }
  return (
    <section className="dashboard-section">
      <Modal
        title="Form"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"70%"}
      >
        <form className="form-wrapper" onSubmit={handleSubmit} method="post">
          <div className="form-content">
            <input
              type="text"
              name="brand"
              placeholder="product brand"
              onChange={handleChange}
              value={formdata.brand}
            />
            <input
              type="text"
              name="title"
              placeholder="product title"
              onChange={handleChange}
              value={formdata.title}
            />
          </div>

          <div className="form-content">
            <input
              type="text"
              name="categories"
              placeholder="product categories"
              onChange={handleChange}
              value={formdata.categories}
              rows={8}
            />
            <input
              type="text"
              name="animalType"
              placeholder="animaltype"
              onChange={handleChange}
              value={formdata.animaltype}
            />
            <input
              type="text"
              name="color"
              placeholder="product color"
              onChange={handleChange}
              value={formdata.color}
            />
          </div>

          <div>
            <textarea
              type="text"
              name="desc"
              placeholder="product description"
              onChange={handleChange}
              value={formdata.desc}
              rows={8}
            />
          </div>
          <div className="form-content">
            <input
              type="text"
              name="gramPerQuantity"
              placeholder="gramperquantity"
              onChange={handleChange}
              value={formdata.gramperquantity}
            />
            {/* <input
                  type="text"
                  name=""
                  id=""
                  style={{ width: "30%" }}
                  placeholder="price"
                /> */}

            <input
              type="text"
              name="foodType"
              placeholder="food type"
              onChange={handleChange}
              value={formdata.foodtype}
            />
            <input
              type="file"
              multiple
              name="img"
              placeholder="product image"
              onChange={(e) => {
                setImage(e.target.files);
              }}
            />

            {/* <button
                  type="button"
                  style={{ width: "30%" }}
                  onClick={addMore}
                >
                  Add More
                </button> */}
          </div>
          {/* {add.length > 0 &&
                add.map((e) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginTop: "0.8rem",
                      }}
                    >
                      <input
                        type="text"
                        name="gramPerQuantity"
                        placeholder="gramperquantity"
                        onChange={handleChange}
                        value={formdata.gramperquantity}
                      />
                      <input
                        type="text"
                        name=""
                        id=""
                        style={{ width: "30%" }}
                        placeholder="price"
                      />
                    </div>
                  );
                })} */}

          <div className="form-content">
            <input
              type="text"
              name="stock"
              placeholder="product stock"
              onChange={handleChange}
              value={formdata.stock}
            />
            <input
              type="text"
              name="mrp"
              placeholder="product price in MRP"
              onChange={handleChange}
              value={formdata.mrp}
            />
          </div>
          <div className="form-content">
            <p style={{ width: "20%" }}>Dicount in %</p>
            <input
              type="text"
              name="discount"
              placeholder="discount in % "
              onChange={handleChange}
              value={formdata.discount}
              onKeyUp={() => {
                setSelling(
                  (Number(formdata.mrp) * Number(formdata.discount)) / 100
                );
              }}
            />
            <p style={{ width: "20%" }}>Seeling Price</p>
            <input
              type="text"
              name="sellingprice"
              placeholder="sellingprice "
              value={formdata.mrp - sellingprice}
            />
          </div>

          <div>
            <button className="modal-btn">Submit</button>
          </div>
        </form>
      </Modal>

      <div className="dashboard-wrapper">
        <div className="left-section">
          <Dashboardnav />
        </div>
        <div className="right-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "1.5rem ",
            }}
          >
            <input
              type="search"
              name=""
              id=""
              placeholder="search by price,name,categories etc"
              onKeyUp={search}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <button
              onClick={() => {
                window.document.body.classList.add("bg-blur");
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
          {/* {allProducts.length < 0 && <h2>No Products</h2>} */}
          <div className="items-wrapper">
            {isProducts && allProducts.length > 0 ? (
              allProducts.map((products) => {
                return (
                  <div className="items">
                    <img src={`/uploads/${products.img[0]}`} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        padding: "0 7rem",
                      }}
                    >
                      <h2>{products.title}</h2>
                      <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                        ₹ {products.price}
                      </p>
                    </div>
                    <div className="btn-container">
                      <Link to={`/edit/${products._id}`}>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(products._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2
                style={{ textAlign: "center", fontSize: "4rem", color: "gray" }}
              >
                {isProducts && "loading....."}
              </h2>
            )}
          </div>
          <div className="items-wrapper">
            {isFilter &&
              filterProducts.map((products) => {
                return (
                  <div className="items">
                    <img src={`/uploads/${products.img[0]}`} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        padding: "0 7rem",
                      }}
                    >
                      <h2>{products.title}</h2>
                      <p style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                        ₹ {products.price}
                      </p>
                    </div>
                    <div className="btn-container">
                      <Link to={`/edit/${products._id}`}>
                        <button>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(products._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            {isProducts && (
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={changePage}
                pageRangeDisplayed={pageCount}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                activeClassName="active"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            )}
            {isFilter && (
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={changePage}
                pageRangeDisplayed={pageCount}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                activeClassName="active"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
