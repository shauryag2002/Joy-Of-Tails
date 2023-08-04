const serviceModle = require("../models/serviceModle");
const multipleUpload = require("../utils/multer");
const { verifyTokenAndAdmin } = require("../utils/verify");

const router = require("express").Router();

router.post(
  "/",
  verifyTokenAndAdmin,
  multipleUpload.single("img"),
  async (req, res) => {
    const { title, mobile, address } = req.body;
    const info = {
      title,
      mobile,
      address,
      image: req.file.originalname,
    };
    console.log(info);
    try {
      const details = await serviceModle.create(info);
      console.log(details);
      res.send({ details });
    } catch (error) {}
  }
);

router.get("/", async (req, res) => {
  const details = await serviceModle.find({});
  res.status(200).json({ details });
});

module.exports = router;
