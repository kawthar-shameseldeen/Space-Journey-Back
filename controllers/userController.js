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
  
export const getUserByUsername = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        "-password +iot"
      ); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  };