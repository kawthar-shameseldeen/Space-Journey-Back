import { Router } from "express";
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  registerIot,
} from "../controllers/userController.js";
const router = new Router();
router.get("/all", getAllUsers);
router.get("/:username", getUserByUsername);
router.post("/create", createUser);
router.post("/iot", registerIot);

export default router;