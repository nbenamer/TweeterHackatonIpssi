import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; 
import authRoutes from "./routes/auth.route.js";
import userRoutes from './routes/user.route.js';
import connectMongoDB from './config/db.js';
import cloudinary from 'cloudinary';

dotenv.config();


// Ca te demande d'installer ce package ( c'est un cloud d'images pour stocker les images de l'appli)
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", userRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});
