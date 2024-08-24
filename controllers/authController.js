import { Planet } from "../models/planetModel.js";
export const createPlanet = async (req, res) => {
    try {
      const planet = new Planet(req.body);
      await planet.save();
      res.status(201).json(planet);
    } catch (error) {
      res.status(500).json({ message: "Error creating planet", error });
    }
  };
  export const getAllPlanets = async (req, res) => {
    try {
      const planets = await Planet.find();
      res.status(200).json(planets);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving planets", error });
    }
  };
  export const getPlanetByName = async (req, res) => {
    try {
      const planet = await Planet.findOne({ name: req.params.name });
      if (!planet) {
        return res.status(404).json({ message: "Planet not found" });
      }
      res.status(200).json(planet);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving planet", error: error.message });
    }
  };
  
export const displayPlanet = async (req, res) => {
    try {
      const planetId = req.body.planetId;
      const planet = await Planet.findById(planetId);
      if (!planet) {
        return res.status(404).json({ message: "Planet not found" });
      }
  
      res.status(200).json(planet);
    } catch (error) {
      res.status(500).json({ message: "Error displaying planet", error });
    }
  };
  
export const updatePlanet = async (req, res) => {
    try {
      const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!planet) {
        return res.status(404).json({ message: "Planet not found" });
      }
      res.status(200).json(planet);
    } catch (error) {
      res.status(500).json({ message: "Error updating planet", error });
    }
  };
  
export const deletePlanet = async (req, res) => {
    try {
      const planet = await Planet.findByIdAndDelete(req.params.id);
      if (!planet) {
        return res.status(404).json({ message: "Planet not found" });
      }
      res.status(200).json({ message: "Planet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting planet", error });
    }
  };
  
  
export default {
    createPlanet,
    getAllPlanets,
    getPlanetByName,
    displayPlanet,
    updatePlanet,
    deletePlanet,
  };