// Server/models/productModel.js
import { connection } from "../config/db.js";

/* ---------------- Product Model ---------------- */
const productModel = {
  create: async (productData) => {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = productData;
    const [result] = await connection.execute(
      `INSERT INTO products 
      (name, description, price, image, category, subCategory, sizes, bestseller, date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description,
        price,
        JSON.stringify(image),
        category,
        subCategory,
        JSON.stringify(sizes),
        bestseller ? 1 : 0,
        date,
      ]
    );
    return result;
  },

  findAll: async () => {
    const [rows] = await connection.execute(`SELECT * FROM products`);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await connection.execute(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  update: async (id, productData) => {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller,
      date,
    } = productData;
    const [result] = await connection.execute(
      `UPDATE products SET name=?, description=?, price=?, image=?, category=?, subCategory=?, sizes=?, bestseller=?, date=? WHERE id=?`,
      [
        name,
        description,
        price,
        JSON.stringify(image),
        category,
        subCategory,
        JSON.stringify(sizes),
        bestseller ? 1 : 0,
        date,
        id,
      ]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await connection.execute(
      `DELETE FROM products WHERE id=?`,
      [id]
    );
    return result;
  },
};

export default productModel;

// // Server/models/productModel.js
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: Array, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String, required: true },
//   sizes: { type: Array, required: true },
//   bestseller: { type: Boolean },
//   date: { type: Number, required: true },
// });

// const productModel =
//   mongoose.models.product || mongoose.model("product", productSchema);

// export default productModel;
