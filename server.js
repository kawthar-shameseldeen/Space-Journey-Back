import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import planetRoutes from "./routes/planet.routes.js";

dotenv.config();