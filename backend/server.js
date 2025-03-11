import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./config/db.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = 5000

connectMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error("❌ Failed to connect to MongoDB", error);
});
