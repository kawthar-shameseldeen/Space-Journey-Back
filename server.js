import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import planetRoutes from "./routes/planet.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api", planetRoutes);


const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", (ws, req) => {
    console.log("New WebSocket connection established");
  
    ws.on("message", (message) => {
      console.log("Received message:", message);
  
      ws.send(`Server received: ${message}`);
    });
  
    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
  