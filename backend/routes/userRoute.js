const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../utils/verify");
const sendEmail = require("../utils/sendEmail");
const router = require("express").Router();
// UPDATE A USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { ...others } = req.body;
  const { oldpassword, newpassword } = req.body;
  try {
    if (oldpassword) {
      const userExist = await User.findById(req.params.id).select("+password");
      const isMatch = await userExist.comparePassword(oldpassword);
      if (isMatch) {
        await User.findByIdAndUpdate(
          req.params.id,
          { password: await bcrypt.hash(newpassword, 10) },
          {
            new: true,
          }
        );
        return res.json({ success: true, message: "password updated" });
      } else {
        return res.json({
          success: false,
          message: "old password is incorrect",
        });
      }
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...others },
      {
        new: true,
      }
    );

    const savedUser = await user.save();
    return res.status(200).json({ success: true, savedUser });
  } catch (err) {
    return res.status(500).json({ err });
  }
});
//DELETE A USER
router.delete("/:id", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json(err);
  }
});
//GET A USER
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  const AllUsers = await User.find();
  console.log(AllUsers);
  return res.status(200).json({ success: true, AllUsers });
});
// GET USERS STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.route("/password/forgot").post(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ error: "User not found", message: false });
  }

  // Get ResetPassword Token

  try {
    if (user) {
      const resetToken = user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;

      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      await sendEmail({
        email: user.email,
        subject: `onlineBazaar Password Recovery`,
        message,
      });
      return res.status(200).json({
        message: `Email sent to ${user.email} successfully`,
      });
    }
  } catch (error) {
    console.log(error);

    await user.save({ validateBeforeSave: false });

    return res.status(500).json({ error });
  }
});

router.route("/password/reset/:token").put(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(500)
      .json({ message: "Reset Password Token is invalid or has been expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(500).json({ message: "Password does not password" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return res.status(200).json({ ...user._doc, accessToken });
});

router.route("/isadmin").get(async (req, res) => {
  const user = await User.findById(req.headers.id);
  if (!user) {
    return res.json({ success: false, message: "user not found" });
  }
  return res.json({ success: true, user });
});

module.exports = router;
