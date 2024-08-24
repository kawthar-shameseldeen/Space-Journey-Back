import { User } from "../models/userModel.js";
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = new User(userData);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password +iot"); // Include iot, exclude password
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error });
    }
  };