import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import planetRoutes from "./routes/planet.routes.js";
import authRouter from "./routes/auth.routes.js";
import tourRouter from "./routes/tour.routes.js"
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api", planetRoutes);
app.use("/api", authRouter);
app.use('/api',tourRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("New WebSocket connection established");

    ws.on("message", (message) => {
        console.log("Received message:", message);
        ws.send(`Server received: ${message}`);
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed");
    });
});

const PORT = process.env.SERVER_PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    databaseConnection();

 
});
