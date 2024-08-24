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

