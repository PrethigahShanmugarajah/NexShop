// Server/models/orderModel.js
import db from "../config/db.js";

const orderModel = {
  async create(orderData) {
    const {
      userId,
      items,
      amount,
      address,
      status = "Order Placed",
      paymentMethod,
      payment = false,
      date,
    } = orderData;

    const [result] = await db.query(
      `INSERT INTO orders 
        (userId, items, amount, address, status, paymentMethod, payment, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        JSON.stringify(items),
        amount,
        JSON.stringify(address),
        status,
        paymentMethod,
        payment ? 1 : 0,
        date,
      ]
    );

    return { id: result.insertId, ...orderData };
  },

  async findAll() {
    const [rows] = await db.query("SELECT * FROM orders ORDER BY id DESC");
    return rows.map((row) => ({
      ...row,
      items: JSON.parse(row.items || "[]"),
      address: JSON.parse(row.address || "{}"),
      payment: !!row.payment,
    }));
  },

  async findByUserId(userId) {
    const [rows] = await db.query("SELECT * FROM orders WHERE userId = ?", [
      userId,
    ]);
    return rows.map((row) => ({
      ...row,
      items: JSON.parse(row.items || "[]"),
      address: JSON.parse(row.address || "{}"),
      payment: !!row.payment,
    }));
  },

  async deleteById(id) {
    const [result] = await db.query("DELETE FROM orders WHERE id = ?", [id]);
    return result;
  },
};

export default orderModel;

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
