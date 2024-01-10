import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Authorization failed" });
      } else {
        const user = await userModel.findOne({ _id: decoded.id });
        if (user.isAdmin) {
          req.adminId = decoded.id;
          next();
        } else {
          res
            .status(401)
            .send({ success: false, message: "Authorization failed" });
        }
      }
    });
  } catch (err) {
    res.status(401).send({ success: false, message: "Authorization failed" });
  }
};
