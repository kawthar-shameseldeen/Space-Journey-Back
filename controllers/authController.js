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