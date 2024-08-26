import { Router } from "express";
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  registerIot,
} from "../controllers/userController.js";
import { adminProtect,protect } from "../middlewares/protectedRoute.js";
const router = new Router();
router.get("/all",adminProtect , getAllUsers);
router.get("/:username", adminProtect,getUserByUsername);
router.post("/create", createUser);
router.post("/iot", registerIot);

export default router;