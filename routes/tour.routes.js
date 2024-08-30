import { Router } from "express";
import { createTour, getAllPositions, getPosition, displayTour, updateTour, deleteTour } from "../controllers/tourController.js";

const router=new Router();
router.post("/tour",createTour);
router.get("/tour",getAllPositions);
router.get('/tour/:id',getPosition);
