import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  // placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

/* ---------------- ADMIN FEATURES ---------------- */
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

/* ---------------- PAYMENT FEATURES ---------------- */
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
// orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

/* ---------------- USER FEATURES ---------------- */
orderRouter.post("/userorders", authUser, userOrders);

/* ---------------- VERIFY PAYMENT ---------------- */
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
