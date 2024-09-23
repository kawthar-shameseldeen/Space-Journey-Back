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
import eventRoutes from "./routes/event.routes.js";
import { test } from './app.test.js';
dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // This allows requests from any origin. Change to a specific origin if needed.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods.
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers.
}));

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", planetRoutes);
app.use("/api", authRouter);
app.use("/api", tourRouter);
app.use("/api", eventRoutes);


const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = [];


let simulatedDeviceData = {
  deviceName: "ESP8266",
  pinStatus: {
    D0: "connected",
    D1: "connected",
    D2: "connected",
    D3: "connected",
    D4: "connected",
  }
};

function sendSimulatedData() {
  clients.forEach((client) => {
    if (client.readyState === wss.OPEN) {
      client.send(JSON.stringify(simulatedDeviceData));
    }
  });
}


setInterval(sendSimulatedData, 5000); 


wss.on('connection', async (ws) => {
  console.log("New WebSocket connection established");

  clients.push(ws);

  ws.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log("Received message from client:", parsedMessage);

    
      if (parsedMessage.userId) {
        const user = await User.findById(parsedMessage.userId).select("iotDevices");
        if (!user) {
          console.error("User not found");
          ws.send(JSON.stringify({ message: "User not found" }));
          return;
        }

        const iotStatuses = user.iotDevices.map(device => ({
          deviceName: device.deviceName,
          status: device.status,
        }));
        ws.send(JSON.stringify({ iotStatuses }));
      }

      if (parsedMessage.planetName) {
        console.log(`Planet hovered: ${parsedMessage.planetName}`);
        clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            console.log(`Sending Planet hovered: ${parsedMessage.planetName}`);
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

app.get('/api/device/status', (req, res) => {
  res.json(simulatedDeviceData);
});

// Start the server
const PORT = process.env.SERVER_PORT;
server.listen(80, () => {
  console.log(`Server running on port ${PORT}`);
  databaseConnection();
});

export { wss };
