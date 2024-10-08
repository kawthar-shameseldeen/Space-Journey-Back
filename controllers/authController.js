import { User } from "../models/userModel.js";
import Tour from "../models/tourModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/generateToken.js";
export const register = async (req, res) => {
  const { username, email, password, role, iotDeviceName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const defaultIotDevice = {
      deviceName: iotDeviceName || "Space-Journey-Device",
      status: "off",
    };

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
      iotDevices: [defaultIotDevice],
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
        iotDevices: savedUser.iotDevices,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
