import { connection } from "../config/db.js";
import jwt from "jsonwebtoken";

/* ---------------- PLACING ORDERS USING COD METHOD ---------------- */
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user && req.user.id ? req.user.id : req.body.userId;
    const { items, amount, address } = req.body;

    console.log(
      `[placeOrder] request - userId=${userId}, itemsCount=${
        Array.isArray(items) ? items.length : 0
      }, amount=${amount}`
    );

    if (!userId) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.json({ success: false, message: "No items to place order" });
    }

    if (amount === undefined || amount === null) {
      return res.json({ success: false, message: "Order amount is required" });
    }

    const orderData = {
      userId,
      items: JSON.stringify(items),
      address: JSON.stringify(address || {}),
      amount,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      // date: new Date().toISOString(),
      date: new Date(),
    };

    const [result] = await connection.execute(
      `INSERT INTO orders (userId, items, amount, address, status, paymentMethod, payment, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.userId,
        orderData.items,
        orderData.amount,
        orderData.address,
        orderData.status,
        orderData.paymentMethod,
        orderData.payment,
        orderData.date,
      ]
    );

    const [updateUserResult] = await connection.execute(
      `UPDATE users SET cartData = '{}' WHERE id = ?`,
      [userId]
    );

    console.log("[placeOrder] updateUserResult:", updateUserResult);

    let parsedItems = [];
    let parsedAddress = {};
    try {
      parsedItems = JSON.parse(orderData.items);
    } catch (e) {
      parsedItems = [];
    }

    try {
      parsedAddress = JSON.parse(orderData.address);
    } catch (e) {
      parsedAddress = {};
    }

    res.json({
      success: true,
      message: "Order Placed Successfully",
      data: {
        id: result.insertId,
        userId: orderData.userId,
        items: parsedItems,
        address: parsedAddress,
        amount: orderData.amount,
        status: orderData.status,
        paymentMethod: orderData.paymentMethod,
        payment: orderData.payment,
        date: orderData.date,
      },
    });
  } catch (error) {
    console.error("Place Order error:", error.message);
    res.json({
      success: false,
      message: `Place Order error: ${error.message}`,
    });
  }
};

/* ---------------- USER ORDERS DATA FOR USER ---------------- */
export const userOrders = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const [orders] = await connection.execute(
      "SELECT * FROM orders WHERE userId = ? ORDER BY id DESC",
      [userId]
    );

    const parsedOrders = orders.map((order) => ({
      ...order,
      items: JSON.parse(order.items),
      address: JSON.parse(order.address),
    }));

    res.json({ success: true, orders: parsedOrders });
  } catch (error) {
    console.error("User Orders error:", error.message);
    res.json({
      success: false,
      message: `User Orders error: ${error.message}`,
    });
  }
};

// Server/controllers/orderontroller.js
// import orderModel from "../models/orderModel";

/* ---------------- PLACING ORDERS USING COD METHOD ---------------- */
// export const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, amount, address } = req.body;

//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now(),
//     };

//     const newOrder = new orderModel(orderData);

//     await newOrder.save();

//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     res.json({ success: true, message: "Order Placed" });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

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
// export const userOrders = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const orders = await orderModel.find({ userId });

//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Place Order error:", error.message);
//     res.json({
//       success: false,
//       message: `Place Order error: ${error.message}`,
//     });
//   }
// };

/* ---------------- UPDATE ORDER STATUS FROM ADMIN PANEL ---------------- */
export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
