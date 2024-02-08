import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../middleware/generateToken.js";

// @desc Auth user and get token
// @route POST api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } else {
    res.status(401);
    throw new Error("Invalid emailor password");
  }
});

// @desc Auth user and get token
// @route POST api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, bio } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// chcreat a route to check if user already exits upon regidstration
const userExist = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // If user exists, return exists as true, otherwise return false
  res.json({ exists: !!user });
});

// @desc Auth user and get token
// @route POST api/users/logout
// @access public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresDate: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully" });
};

export { authUser, registerUser, logoutUser, userExist };
