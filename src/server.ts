import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import config from './config/config';
import cookieParser from 'cookie-parser';
import userRouter from "./routes/userRoutes";
import chatRouter from './routes/chatRoutes'
import messageRouter from './routes/messageRoute'
import { initSocket } from "./config/socket";
import http from "http"; 


const app = express();

const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect(config.mongo.url as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


// Server check
app.use("/api/ping", (req, res) => {res.status(200).json({message: 'pong'})})

app.use("/api/v1", userRouter)
app.use("/api/v2", chatRouter)
app.use("/api/v3", messageRouter)

// 404 Handler 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


// Initialize Socket.IO
initSocket(server);

// Start Server
server.listen(config.server.port, () => {
  console.log(`🚀 Server running on port ${config.server.port}`);
});