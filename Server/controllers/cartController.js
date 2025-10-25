import { connection as db } from "../config/db.js";

/* ---------------- ADD PRODUCTS TO USER CART ---------------- */
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const [rows] = await db.query("SELECT cartData FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = {};
    if (rows[0].cartData) {
      try {
        cartData = JSON.parse(rows[0].cartData);
      } catch (err) {
        cartData = {};
      }
    }

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    const updatedCart = JSON.stringify(cartData);

    await db.query("UPDATE users SET cartData = ? WHERE id = ?", [
      updatedCart,
      userId,
    ]);

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- UPDATE USER CART ---------------- */
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const [rows] = await db.query("SELECT cartData FROM users WHERE id = ?", [
      userId,
    ]);
    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = {};
    if (rows[0].cartData) {
      try {
        cartData = JSON.parse(rows[0].cartData);
      } catch {
        cartData = {};
      }
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;

      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    const updatedCart = JSON.stringify(cartData);
    await db.query("UPDATE users SET cartData = ? WHERE id = ?", [
      updatedCart,
      userId,
    ]);

    res.json({ success: true, message: "Cart Updated Successfully", cartData });
  } catch (error) {
    console.error("Update Cart error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- GET USER CART DATA ---------------- */
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const [rows] = await db.query("SELECT cartData FROM users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = {};
    if (rows[0].cartData) {
      try {
        cartData = JSON.parse(rows[0].cartData);
      } catch {
        cartData = {};
      }
    }

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get User Cart error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Server/controllers/cartController.js
// import userModel from "../models/userModel.js";

/* ---------------- ADD PRODUCTS TO USER CART ---------------- */
// export const addToCart = async (req, res) => {
//   try {
//     const { userId, itemId, size } = req.body;

//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;

//     if (cartData[itemId]) {
//       if (cartData[itemId][size]) {
//         cartData[itemId][size] += 1;
//       } else {
//         cartData[itemId][size] = 1;
//       }
//     } else {
//       cartData[itemId] = {};
//       cartData[itemId][size] = 1;
//     }

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Added to Cart" });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- UPDATE USER CART ---------------- */
// export const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;

//     const userData = await userModel.findById(userId);

//     let cartData = await userData.cartData;

//     cartData[itemId][size] = quantity;

//     await userModel.findByIdAndUpdate(userId, { cartData });

//     res.json({ success: true, message: "Cart Updated" });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- GET USER CART DATA ---------------- */
// export const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const userData = await userModel.findById(userId);

//     let cartData = await userData.cartData;

//     res.json({ success: true, cartData });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
