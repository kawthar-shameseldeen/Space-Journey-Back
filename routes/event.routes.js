import express from "express";
import {
  getAllEvents,
  addEventToUser,
  getMyEvent,
} from "../controllers/eventControlelr.js";
import { adminProtect, protect } from "../middlewares/protectedRoute.js";
const router = express.Router();
router.get("/events", getAllEvents);
router.post("/events", addEventToUser);
router.get("/events/:username", getMyEvent);
export default router;
