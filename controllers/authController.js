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