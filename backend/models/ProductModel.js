const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Enter product title"],
      unique: true,
    },
    desc: { type: String, required: [true, "Enter product description"] },
    img: [{ type: String, required: [true, "enter product Image"] }],
    categories: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: [true, "Enter product price"] },
    ratings: {
      type: Number,
      default: 0,
    },
    Stock: {
      type: Number,
      required: [true, "Please Enter product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
