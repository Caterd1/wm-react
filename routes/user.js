const express = require("express");
const router = express.Router();

const User = require("../models/User");

//   Find user by credentials
router.get("/", async (req, res) => {
  //   get username and password
  const username = req.query.username;
  const password = req.query.password;
  let user;
  //   if username and password are sent from client
  if (username && password) {
    user = await User.findOne({ username: username, password: password });
    // if username is taken
  } else if (username) {
    user = await User.findOne({ username: username, password: password });
  }

  //   if user is not existing
  if (!user) {
    user = null;
  }
  // send user back to client
  res.json(user);
});

// Create new user
router.post("/", async (req, res) => {
  const newUser = req.body;
  // const userToSave = new User({
  //   username: newUser.username,
  //   password: newUser.password,
  //   firstName: newUser.firstName,
  //   lastName: newUser.lastName,
  //   email: newUser.email
  // });
  const userToSave = new User({ ...req.body });

  const user = await userToSave.save();
  res.json(user);
});

// Find user by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json(user);
});

// update user
router.put("/", async (req, res) => {
  const newUser = req.body;
  await User.findByIdAndUpdate(newUser._id, newUser);
  res.json(newUser);
});

module.exports = router;
