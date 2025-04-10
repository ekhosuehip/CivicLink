import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import config from './config/config';
import userRouter from "./routes/userRoutes";


const app = express();

// Connect to MongoDB
mongoose.connect(config.mongo.url as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Server check
app.use("/api/ping", (req, res) => {res.status(200).json({message: 'pong'})})

app.use("/api/v1", userRouter)

// 404 Handler 
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


// Start Server
app.listen(config.server.port, () => console.log(`Server started on port ${config.server.port}`));