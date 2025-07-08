import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, Email and Password are required" });
    }

    let user = await userModel.findOne({ email });

    if (user)
      return res.status(409).json({ message: "You are already registered" });

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    user = await userModel.create({
      name,
      email,
      password: hash,
    });

    let token = jwt.sign({ name, email }, process.env.JWT_KEY);
    res.cookie("token", token);

    return res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error registering user",
    });
  }
};

export const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "You are not registered" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      let token = jwt.sign({ email, name: user.name }, process.env.JWT_KEY);
      res.cookie("token", token);
      return res.status(200).json({ message: "Login Successfull" });
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error in logging in the user",
    });
  }
};

export const logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error in logging out the user",
    });
  }
};

export const getLoggedinUser = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "Error getting the user",
      });
  }
};
