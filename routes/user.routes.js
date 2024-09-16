import { Router } from "express";
import {
  getAllUsers,
  getUserByUsername,
  createUser,
  registerIot,
  getUserNotifications,

} from "../controllers/userController.js";
import { adminProtect,protect } from "../middlewares/protectedRoute.js";
const router = new Router();
router.get("/all",adminProtect , getAllUsers);
router.get("/:username", adminProtect,getUserByUsername);
router.get("/notification/:id", getUserNotifications);
router.post("/create", createUser);
router.post("/iot", registerIot);


export default router;