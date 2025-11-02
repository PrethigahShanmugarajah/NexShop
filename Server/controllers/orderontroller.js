// Server / controllers / orderontroller.js;
import orderModel from "../models/orderModel.js";

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
    console.error("Placing Orders Using Cod Method error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Placing Orders Using Cod Method error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Placing Orders Using Cod Method error)": error.message,
    });
  }
};

/* ---------------- PLACING ORDERS USING STRIPE METHOD ---------------- */
export const placeOrderStripe = async (req, res) => {
  try {
  } catch (error) {
    console.error("Placing Orders Using Stripe Method error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Placing Orders Using Stripe Method error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Placing Orders Using Stripe Method error)": error.message,
    });
  }
};

/* ---------------- PLACING ORDERS USING RAZORPAY METHOD ---------------- */
export const placeOrderRazorpay = async (req, res) => {
  try {
  } catch (error) {
    console.error("Placing Orders Using Razorpay Method error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Placing Orders Using Razorpay Method error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Placing Orders Using Razorpay Method error)": error.message,
    });
  }
};

/* ---------------- ALL ORDERS DATA FOR ADMIN PANEL ---------------- */
export const allOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error("All Orders Data for Admin Panel Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `All Orders Data for Admin Panel Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(All Orders Data for Admin Panel Error)": error.message,
    });
  }
};

/* ---------------- USER ORDERS DATA FOR USER ---------------- */
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("User Orders Data for User Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `User Orders Data for User Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(User Orders Data for User Error)": error.message,
    });
  }
};

/* ---------------- UPDATE ORDER STATUS FROM ADMIN PANEL ---------------- */
export const updateStatus = async (req, res) => {
  try {
  } catch (error) {
    console.error("Update Order Satus From Admin Panel Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Update Order Satus From Admin Panel Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Update Order Satus From Admin Panel Error)": error.message,
    });
  }
};
