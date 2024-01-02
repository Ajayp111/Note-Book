const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = process.env.JWT_SECRET;;



// ROUTE 1: Create a User using: POST "/api/auth/createuser"  . No Login Required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async function (req, res) {
  let success = false;

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  // check whether the user with this email already exists
  try {

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "Sorry! A user with same email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass

    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(200).json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }

});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login"  . No Login Required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
], async function (req, res) {
  let success = false;

  // If there are errors, return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  // check whether the user with this email already exists
  try {

    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ success, error: "Please login using correct credentials." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ success, error: "Please login using correct credentials." });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.status(200).json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error.");
  }

});

// ROUTE 3: Get loggedIn User details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchUser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error.");
  }

});


module.exports = router;