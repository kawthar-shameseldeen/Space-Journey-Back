import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';


dotenv.config();

const test = express();

test.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

test.use(express.json());


test.use("/api/auth", authRouter); 
test.use("/api/user", userRoutes);

export { test };
