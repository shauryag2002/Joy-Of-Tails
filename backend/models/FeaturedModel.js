const mongoose = require("mongoose");
const featuredSchema = new mongoose.Schema({
  img: {
    type: String,
    required: [true, "Enter Featured Image"],
  },
  name: String,
});
const Featured = mongoose.model("Featured", featuredSchema);
module.exports = Featured;
