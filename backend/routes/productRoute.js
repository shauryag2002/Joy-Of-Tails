const router = require("express").Router();
const Product = require("../models/ProductModel");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verify");
// CREATE A PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  if (
    !req.body.title ||
    !req.body.desc ||
    !req.body.img ||
    !req.body.price ||
    !req.body.color
  ) {
    return res.status(400).send("Please include all fields");
  }
  try {
    const Create = new Product(req.body);
    await Create.save();
    return res.status(200).json(Create);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// UPDATE A PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const updateProduct = await product.save();
    return res.status(200).json(updateProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// DELETE A PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const productDelete = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET A PRODUCT
router.get("/find/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    if (req.query.limit) {
      const product = await Product.find()
        .limit(req.query.limit)
        .sort({ createdAt: -1 });
      return res.status(200).json(product);
    } else {
      const product = await Product.find();
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET PRODUCTS BY CATEGORY
router.get("/category/:name", async (req, res, next) => {
  try {
    if (req.query.limit) {
      const product = await Product.find({ categories: req.params.name })
        .limit(req.query.limit)
        .sort({ createdAt: -1 });
      return res.status(200).json(product);
    } else {
      const product = await Product.find({ categories: req.params.name });
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
//REVIEW A PRODUCT
router.post(
  "/review/:id/:pid",
  verifyTokenAndAuthorization,
  async (req, res, next) => {
    try {
      // console.log(req.body.rating);
      const review1 = await Product.findById(req.params.pid);
      // console.log(review1);
      let isReview;
      let avg = 0;
      review1.reviews.forEach((rev, i) => {
        if (rev.user.toString() == req.params.id) {
          isReview = true;
          rev.rating = req.body.rating;
          rev.comment = req.body.comment;
        }
        avg = avg + rev.rating;
      });
      if (req.body.review) {
        review1.reviews.push(req.body);
        review1.numOfReviews++;
        review1.rating = avg / review1.numOfReviews;
        await review1.save();
        return res.status(200).json(review1);
      } else {
        review1.reviews.push(req.body);
        review1.rating = avg / review1.numOfReviews;
        await review1.save();
        return res.status(200).json(review1);
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
module.exports = router;
