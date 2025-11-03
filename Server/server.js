import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

/* ---------------- App Config ---------------- */
const app = express();
const port = process.env.PORT || 4000;

/* ---------------- Connect Database ---------------- */
connectDB();
connectCloudinary();

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.set("json spaces", 2);
}

/* ---------------- Routes ---------------- */
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

/* ---------------- Start Server ---------------- */
app.listen(port, () => console.log(`Server is running on port ${port}`));
