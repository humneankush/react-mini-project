const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");







// register route
router.post("/register", async (req, res) => {
    try {
        // to find related user email from DB
      const e =await User.findOne({ email: req.body.email })
  
      if (e) {
        res
          .status(400)
          .json("user already exist please use different email");
      } else {
        const salt = await bcrypt.genSalt(10);
  
        const hashPassword = await bcrypt.hash(req.body.password, salt);
  
        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
        });
  
        const user = await newUser.save();
        const { password, ...info } = user._doc;
        res.status(200).json(info);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// login route

// login route
router.post("/login", async (req, res) => {
    try {
      const usr =await User.findOne({ email: req.body.email })
      if (!usr) {
        res.status(300).json("user not exist ");
      } else {
        const validatePassword = await bcrypt.compare(
          req.body.password,
          usr.password
        );
  
        if (!validatePassword) {
          res.status(400).json("check your password");
        } else {
          const { password, ...info } = usr._doc;
  
          res.status(200).json({ ...info });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router
