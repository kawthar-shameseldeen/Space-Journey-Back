import express from "express";
import { databaseConnection } from "./database/connection.js";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";