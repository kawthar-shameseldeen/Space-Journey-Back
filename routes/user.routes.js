import { Router } from "express";
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  registerIot,
} from "../controllers/userControlller.js";
const router = new Router();
router.get("/all", getAllUsers);
router.get("/:username", getUserByUsername);
router.post("/create", createUser);
router.post("/iot", registerIot);
