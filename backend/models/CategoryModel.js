const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a category name"],
  },
  banner: {
    type: String,
    required: [true, "Please enter a Image URL"],
  },
});
module.exports = mongoose.model("Category", categorySchema);
