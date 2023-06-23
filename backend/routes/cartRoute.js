const Cart = require("../models/CartModel");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../utils/verify");

const router = require("express").Router();
// CREATE A CART
router.post("/", verifyToken, async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send("Please include all fields");
  }
  try {
    // console.log(req.body);
    const oldCart = await Cart.find({ userId: req.body.userId });
    console.log(oldCart[0].products);
    if (oldCart) {
      let cart1 = [];
      oldCart[0].products.forEach((product, i) => {
        if (product.productId === req.body.products[0].productId) {
          product.quantity = req.body.products[0].quantity;
          console.log(product.productId);
        }
        // console.log(product);
      });

      // // oldCart.products.push(req.body.
      // const savedOldCart = await Cart.findOneAndUpdate(
      //   { _id: oldCart._id },
      //   req.body,
      //   {
      //     new: true,
      //   }
      // );
      // for (let i = 0; i < oldCart.products.length; i++) {
      //   const elem = oldCart.products[i];
      //   if(elem)
      // }
      // oldCart.products=[...oldCart.products,req.body.products];
      const savedCart = await oldCart.save();
      return res.status(200).json(savedCart);
    }
    const newCart = new Cart(req.body);
    const savedCart = await newCart.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// UPDATE A CART
router.put("/:cartId", verifyToken, async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cartId, req.body, {
      new: true,
    });
    const savedCart = await cart.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// DELETE A CART
router.delete("/:cartId", verifyToken, async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.cartId);
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET USER'S CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const cart = await Cart.find({ userId: req.params.id });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// GET ALL CART
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const getAllCarts = await Cart.find();
    return res.status(200).json(getAllCarts);
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router
