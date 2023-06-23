const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const cartRoute = require("./routes/cartRoute");
const stripeRoute = require("./routes/stripe");
const categoryRoute = require("./routes/categoryRoute");
const featureCatRoute = require("./routes/featuredCatRoute");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRoute);
app.use("/api/featured", featureCatRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/checkout", stripeRoute);
app.listen(process.env.PORT, () => {
  console.log(
    `listening on port ${process.env.PORT}(http://localhost:${process.env.PORT})`
  );
});
