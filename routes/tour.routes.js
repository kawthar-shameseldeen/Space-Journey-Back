import { Router } from "express";
import { createTour, getAllTours, getTourByName, displayTour, updateTour, deleteTour } from "../controllers/tourController.js";

const router=new Router();
router.post("/tour",createTour);
router.get("/tour",getAllTours);