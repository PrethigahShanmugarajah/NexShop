// Server/models/userModel.js
import { connection } from "../config/db.js";

/* ---------------- User Model ---------------- */
const userModel = {
  create: async (userData) => {
    const { name, email, password, cartData } = userData;
    const [result] = await connection.execute(
      `INSERT INTO users (name, email, password, cartData) VALUES (?, ?, ?, ?)`,
      [name, email, password, JSON.stringify(cartData || {})]
    );
    return result;
  },

  findAll: async () => {
    const [rows] = await connection.execute(`SELECT * FROM users`);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  findByEmail: async (email) => {
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  update: async (id, userData) => {
    const { name, email, password, cartData } = userData;
    const [result] = await connection.execute(
      `UPDATE users SET name=?, email=?, password=?, cartData=? WHERE id=?`,
      [name, email, password, JSON.stringify(cartData || {}), id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await connection.execute(`DELETE FROM users WHERE id=?`, [
      id,
    ]);
    return result;
  },
};

export default userModel;

// // Server/models/userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     cartData: { type: Object, default: {} },
//   },
//   { minimize: false }
// );

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// export default userModel;
