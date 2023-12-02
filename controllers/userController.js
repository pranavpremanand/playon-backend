import jwt from "jsonwebtoken";
import { loginValidations, signupValidations } from "../middlewares/validations.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

// signup
export const doSignup = async (req, res) => {
  try {
    signupValidations(req, res);
    let { email, password } = req.body;
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      res.status(200).json({ success: false, message: "Email already exists" });
    } else {
      password = await bcrypt.hash(password, 10);
      const newUser = userModel({ ...req.body, password });
      newUser.save().then((data) => {
        const accessToken = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        res.status(201).json({
          success: true,
          message: "User created successfully",
          data,
          accessToken,
        });
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// login
export const doLogin = async (req, res) => {
  try {
    loginValidations(req, res);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).json({
        error: "Invalid credentials",
        message: "The provided email is incorrect.",
      });
    } else {
      bcrypt
        .compare(password, user.password)
        .then(() => {
          const accessToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
          );
          res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
            accessToken,
          });
        })
        .catch((err) => {
          res.status(401).json({
            error: "Invalid credentials",
            message: "The provided password is incorrect.",
          });
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
