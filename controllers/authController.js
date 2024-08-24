import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/generateToken.js";

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const savedUser = await user.save();

   
    const token = generateToken(savedUser);

   
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};