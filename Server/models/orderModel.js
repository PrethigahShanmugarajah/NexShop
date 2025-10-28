// Server/models/orderModel.js
import db from "../config/db.js";

/* ---------------- ADD NEW ORDER ---------------- */
export const createOrder = async (orderData) => {
  const { userId, items, amount, address, paymentMethod, payment, date } =
    orderData;

  const status = "Order Placed";

  const [result] = await db.query(
    `INSERT INTO orders (userId, items, amount, address, status, paymentMethod, payment, date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      JSON.stringify(items),
      amount,
      JSON.stringify(address),
      status,
      paymentMethod,
      payment,
      date,
    ]
  );

  return result.insertId;
};

/* ---------------- GET ALL ORDERS ---------------- */
export const getAllOrders = async () => {
  const [rows] = await db.query("SELECT * FROM orders ORDER BY date DESC");
  return rows.map((row) => ({
    ...row,
    items: JSON.parse(row.items),
    address: JSON.parse(row.address),
  }));
};

/* ---------------- GET ORDERS BY USER ---------------- */
export const getOrdersByUser = async (userId) => {
  const [rows] = await db.query("SELECT * FROM orders WHERE userId = ?", [
    userId,
  ]);
  return rows.map((row) => ({
    ...row,
    items: JSON.parse(row.items),
    address: JSON.parse(row.address),
  }));
};

/* ---------------- UPDATE ORDER STATUS ---------------- */
export const updateOrderStatus = async (orderId, status) => {
  await db.query("UPDATE orders SET status = ? WHERE id = ?", [
    status,
    orderId,
  ]);
};

/* ---------------- DELETE ORDER ---------------- */
export const deleteOrder = async (orderId) => {
  await db.query("DELETE FROM orders WHERE id = ?", [orderId]);
};

// Server/models/orderModel.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   status: { type: String, required: true, default: "Order Placed" },
//   paymentMethod: { type: String, required: true },
//   payment: { type: Boolean, required: true, default: false },
//   date: { type: Number, required: true },
// });

// const orderModel =
//   mongoose.models.order || mongoose.model("order", orderSchema);

// export default orderModel;
