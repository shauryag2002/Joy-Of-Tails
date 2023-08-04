const router = require("express").Router();
const Product = require("../models/ProductModel");
const multipleUpload = require("../utils/multer");
const fs = require("fs");
const path = require("path");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verify");
// CREATE A PRODUCT
router.post(
  "/",
  verifyTokenAndAdmin,
  multipleUpload.array("img"),
  async (req, res, next) => {
    let url = [];
    const files = req.files;
    for (const file of files) {
      const { originalname } = file;
      url.push(originalname);
    }
    // const { title, desc, price, color, categories, brand } = req.body;

    if (
      !req.body.title ||
      !req.body.desc ||
      !req.body.price ||
      !req.body.categories
    ) {
      return res.status(400).send("Please include all fields");
    }
    // try {
    //   const Create = await Product.create({
    // const { title, desc, img, price, color, categories } = req.body;
    // if (!req.body.title || !req.body.price || !req.body.categories) {
    //   return res.status(400).send("Please include all fields");
    // }
    const { title, desc, img, price, color, categories } = req.body;
    if (!req.body.title || !req.body.price || !req.body.categories) {
      return res.status(400).send("Please include all fields");
    }
    try {
      const Create = new Product({
        ...req.body,
        img: url,
      });
      await Create.save();
      return res.status(200).json({ Create, success: true });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

// UPDATE A PRODUCT
router.put(
  "/:id",
  verifyTokenAndAdmin,
  multipleUpload.array("img"),
  async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      const updateProduct = await product.save();
      return res.status(200).json(updateProduct);
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
);
// DELETE A PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const products = await Product.findById(req.params.id);
    products.img.forEach((e) => {
      fs.unlink(path.join(__dirname, `../public/uploads/${e}`), (err) => {
        console.log(err);
      });
    });
    const productDelete = await Product.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET A PRODUCT
router.get("/find/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({ success: true, product });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL PRODUCTS
router.get("/", async (req, res, next) => {
  try {
    if (req.query.limit) {
      const product = await Product.find()
        .sort({ createdAt: -1 })
        .limit(Number(req.query.limit))
        .skip(Number(req.query.page - 1) * Number(req.query.limit));
      const count = await Product.find().countDocuments();

      return res.status(200).json({
        product,
        count,
        pageCount: count / Number(req.query.limit),
      });
    } else {
      const product = await Product.find().sort({ createdAt: -1 });
      const count = await Product.find().countDocuments();
      return res.status(200).json({ product, count, pageCount: count / 6 });
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
      console.log(review1);
      let isReview;
      let total = 0;
      review1.reviews.forEach((rev, i) => {
        if (rev.user.toString() == req.params.id) {
          isReview = true;
          rev.rating = req.body.rating;
          rev.comment = req.body.comment;
        }
        total += rev.rating;
      });
      if (review1.reviews.length > 0) {
        review1.reviews.push(req.body);
        review1.numOfReviews++;
        review1.ratings = (total * 5) / (review1.numOfReviews * 5);
        await review1.save();
        return res.status(200).json({ success: true, review1 });
      } else {
        review1.reviews.push(req.body);
        review1.ratings = rating / 5;
        await review1.save();
        return res.status(200).json({ success: true, review1 });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);
module.exports = router;
