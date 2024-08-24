import { Router } from "express";
import {
    createPlanet,
    getAllPlanets,
    getPlanetByName,
    displayPlanet,
    updatePlanet,
    deletePlanet,
  } from "../controllers/palanetController.js";
  
const router = new Router();
router.post("/planets", createPlanet);
router.get("/planets", getAllPlanets);
router.get('/planets/:name', getPlanetByName);
router.post("/planets/display", displayPlanet);
router.put("/planets/:id", updatePlanet);
router.delete("/planets/:id", deletePlanet);
export default router;
