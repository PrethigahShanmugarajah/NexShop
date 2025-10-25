// Server/server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";

/* ---------------- App Config ---------------- */
const app = express();
const port = process.env.PORT || 4000;

/* ---------------- Connect Database ---------------- */
await connectDB();
connectCloudinary();

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cors());

/* ---------------- Routes ---------------- */
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

/* ---------------- Start Server ---------------- */
app.listen(port, () => console.log(`Server is running on port ${port}`));
