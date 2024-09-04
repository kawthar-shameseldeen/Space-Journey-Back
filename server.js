import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import userRoutes from "./routes/user.routes.js";
import planetRoutes from "./routes/planet.routes.js";
import authRouter from "./routes/auth.routes.js";
import tourRouter from "./routes/tour.routes.js";
import cors from "cors";
import { Tour } from "./models/tourModel.js"; 

dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api", planetRoutes);
app.use("/api", authRouter);
app.use("/api", tourRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });


const clients = [];

wss.on('connection', (ws) => {
    console.log("New WebSocket connection established");

    clients.push(ws);

    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        console.log("Received message from client:", parsedMessage);

        if (parsedMessage.planetName) {
          console.log(`Planet hovered: ${parsedMessage.planetName}`);

         
          clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify({ planetName: parsedMessage.planetName }));
            }
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    });

    ws.on('close', () => {
      console.log("WebSocket connection closed");
    
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
});

const PORT = process.env.SERVER_PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  databaseConnection();
});

export { wss };
