// const userModel = require("../models/UserModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
router.post("/register", async function (req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(401).json({ message: "Please enter all fields" });

  const register = new User(req.body);
  try {
    const savedUser = await register.save();
    res.status(201).json(register);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.post("/login", async (req, res) => {
  let login = await User.findOne({ username: req.body.username }).select(
    "+password"
  );
  if (!login) {
    login = await User.findOne({ email: req.body.username }).select(
      "+password"
    );
  }
  if (!login) {
    return res.status(500).json({ error: "Wrong credentials" });
  }
  try {
    if (login) {
      const { password, ...others } = login._doc;
      login
        .comparePassword(req.body.password)
        .then(function (isMatch) {
          if (isMatch) {
            // return res.status(200).send("Login successful");
            const accessToken = jwt.sign(
              {
                id: others._id,
                isAdmin: others.isAdmin,
              },
              process.env.JWT_SECRET,
              { expiresIn: "3d" }
            );
            return res.status(200).json({ ...others, accessToken });
          } else {
            return res.status(401).send("Invalid username or password");
          }
        })
        .catch(function (err) {
          return res.status(500).send("Error comparing passwords");
        });
      // if (login._doc.comparePassword(password)) {
      //   const accessToken = jwt.sign(
      //     {
      //       id: others._id,
      //       isAdmin: others.isAdmin,
      //     },
      //     process.env.JWT_SECRET,
      //     { expiresIn: "3d" }
      //   );
      //   return res.status(200).json({ ...others, accessToken });
      // } else {
      //   return res.status(200).json({ error: "Wrong credentials" });
      // }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
module.exports = router;
