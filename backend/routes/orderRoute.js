const Order = require("../models/OrderModel");
const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("../utils/verify");

const router = require("express").Router();
// CREATE
router.post("/", verifyToken, async (req, res, next) => {
  if (!req.body.userId || !req.body.amount || !req.body.address) {
    return res
      .status(400)
      .json({ message: "Please include all required information" });
  }
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    const updateOrder = await order.save();
    return res.status(200).json(updateOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET ALL ORDERS --ADMIN
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const getOrders = await Order.find();
    return res.status(200).json(getOrders);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET USERS ORDER
router.get("/all/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const allUserOrders = await Order.find({ userId: req.params.id });
    return res.status(200).json(allUserOrders);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
