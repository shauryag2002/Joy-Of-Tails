const Featured = require("../models/FeaturedModel");
const mongoose = require("mongoose");
const { verifyTokenAndAdmin } = require("../utils/verify");

const router = require("express").Router();
// GET FEATURE IMAGES
router.get("/", async (req, res, next) => {
  try {
    const feature = await Featured.find();
    return res.status(200).json(feature);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// CREATE FEATURE IMAGES
router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  if (!req.body.img || !req.body.name) {
    return res.status(500).json({ message: "Please enter a name and image " });
  }
  try {
    const feature = await new Featured(req.body);
    await feature.save();
    return res.status(200).json(feature);
  } catch (err) {
    return res.status(500).json(err);
  }
});
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
router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const feature = await Featured.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Feature deleted Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
