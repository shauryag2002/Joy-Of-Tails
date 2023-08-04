const Featured = require("../models/FeaturedModel");
const mongoose = require("mongoose");
const multipleUpload = require("../utils/multer");
const { verifyTokenAndAdmin } = require("../utils/verify");
const fs = require("fs");
const path = require("path");

const router = require("express").Router();
// GET FEATURE IMAGES
router.get("/", async (req, res, next) => {
  try {
    const feature = await Featured.findOne({});
    return res.status(200).json(feature);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// CREATE FEATURE IMAGES
router.post(
  "/",
  verifyTokenAndAdmin,
  multipleUpload.array("img"),
  async (req, res, next) => {
    console.log(req.files);
    // if (!req.body.img || !req.body.name) {
    //   return res
    //     .status(500)
    //     .json({ message: "Please enter a name and image " });
    // }
    let url = [];
    const files = req.files;
    for (file of files) {
      url.push(file.originalname);
    }
    try {
      const match = await Featured.findOne({ isAdmin: req.body.isAdmin });
      if (match) {
        const feature = await Featured.updateOne(
          {
            isAdmin: req.body.isAdmin,
          },
          { $set: { img: url } },
          {
            new: true,
          }
        );
        // await feature.save();
        return res.status(200).json({ success: true, feature });
      } else {
        await Featured.create({
          img: url,
          isAdmin: req.body.isAdmin,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err });
    }
  }
);
// UPDATE FEATURE IMAGES
router.put("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const feature = await Featured.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await feature.save();
    res.status(200).json(feature);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// DELETE FEATURE IMAGES
router.delete("/delete", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const featureData = await Featured.findOne();

    for (item of featureData.img) {
      console.log(item);
      fs.unlink(path.join(__dirname, `../public/uploads/${item}`), (err) => {
        console.log(err);
      });
    }
    const feature = await Featured.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "Feature deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
