Server / controllers / orderontroller.js;
import orderModel from "../models/orderModel";

/* ---------------- PLACING ORDERS USING COD METHOD ---------------- */
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- PLACING ORDERS USING STRIPE METHOD ---------------- */
export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- PLACING ORDERS USING RAZORPAY METHOD ---------------- */
export const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- ALL ORDERS DATA FOR ADMIN PANEL ---------------- */
export const allOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- USER ORDERS DATA FOR USER ---------------- */
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Place Order error:", error.message);
    res.json({
      success: false,
      message: `Place Order error: ${error.message}`,
    });
  }
};

/* ---------------- UPDATE ORDER STATUS FROM ADMIN PANEL ---------------- */
export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
