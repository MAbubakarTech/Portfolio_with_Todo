import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Enter both Email and Password!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email and Password!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Email and Password!" });
    }

    if (!process.env.JWT_SECRET) {
      return res
        .status(500)
        .json({ message: "JWT Configuration missing on server." });
    }
    

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login Successfully",
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internel server error", error: error.message });
  }
};
