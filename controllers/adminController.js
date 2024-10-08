import { loginValidations } from "../middlewares/validations.js";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// login
export const adminLogin = async (req, res) => {
  try {
    loginValidations(req, res);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(200).json({
        success: false,
        message: "The provided email is incorrect.",
      });
    } else {
      if (user.isAdmin) {
        bcrypt.compare(password, user.password).then((status) => {
          if (status) {
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
          } else {
            res.status(200).json({
              success: false,
              message: "The provided password is incorrect.",
            });
          }
        });
      } else {
        res.status(401).json({
          error: "Invalid credentials",
          message: "You are not admin",
        });
      }
    }
  } catch (err) {
    res.status(500).json({message:err.message});
  }
};
