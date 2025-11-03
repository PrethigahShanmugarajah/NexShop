import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global Variables
const currency = process.env.VITE_CURRENCY;

// Gateway Initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ---------------- PLACING ORDERS USING COD METHOD ---------------- */
export const placeOrder = async (req, res) => {
  try {
    const { items, address } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Token is required" });
    }

    const decoded = jwt.decode(token);
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return res.json({ success: false, message: "Invalid token" });
    }

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const deliveryFee = parseFloat((subtotal * 0.05).toFixed(2));

    const totalAmount = subtotal + deliveryFee;

    const orderData = {
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    const savedOrder = await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const orderResponse = {
      id: savedOrder._id,
      userId: savedOrder.userId,
      items: savedOrder.items.map((item) => ({
        id: item._id || item.id,
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        totalAmount: item.price * item.quantity,
      })),
      totalQuantity: savedOrder.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
      subtotal,
      "deliveryFee(5%)": deliveryFee,
      totalAmount,
      paymentMethod: savedOrder.paymentMethod,
      paymentStatus: savedOrder.payment,
      address: savedOrder.address,
      createdAt: savedOrder.createdAt,
      updatedAt: savedOrder.updatedAt,
    };

    res.json({
      success: true,
      message: "Order Placed Successfully",
      order: orderResponse,
    });
  } catch (error) {
    console.error("Placing Orders Using COD Method error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Placing Orders Using COD Method error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Placing Orders Using COD Method error)": error.message,
    });
  }
};

/* ---------------- PLACING ORDERS USING STRIPE METHOD ---------------- */
export const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { origin } = req.headers;

    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Token is required" });
    }

    const decoded = jwt.decode(token);
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return res.json({ success: false, message: "Invalid token" });
    }

    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCharge = parseFloat((subtotal * 0.05).toFixed(2));
    const totalAmount = subtotal + deliveryCharge;

    const orderData = {
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: process.env.VITE_CURRENCY,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: process.env.VITE_CURRENCY,
        product_data: { name: "Delivery Charges" },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
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

/* ---------------- VERIFY STRIPE ---------------- */
export const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Verify Stripe Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Verify Stripe Error: ${error.message}`,
    // });
    res.json({
      success: false,
      "message(Verify Stripe Error)": error.message,
    });
  }
};

/* ---------------- PLACING ORDERS USING RAZORPAY METHOD ---------------- */
// export const placeOrderRazorpay = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error("Placing Orders Using Razorpay Method error:", error.message);

//     // res.json({
//     //   success: false,
//     //   message: error.message,
//     // });

//     // res.json({
//     //   success: false,
//     //   message: `Placing Orders Using Razorpay Method error: ${error.message}`,
//     // });

//     res.json({
//       success: false,
//       "message(Placing Orders Using Razorpay Method error)": error.message,
//     });
//   }
// };

/* ---------------- ALL ORDERS DATA FOR ADMIN PANEL ---------------- */
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    if (!orders || orders.length === 0) {
      return res.json({
        success: true,
        message: "No orders found",
        totalOrders: 0,
        orders: [],
      });
    }

    const formattedOrders = orders.map((order) => {
      const subTotal = order.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const deliveryFee = subTotal * 0.05;
      const totalAmount = subTotal + deliveryFee;

      return {
        id: order._id,
        userId: order.userId,
        items: order.items.map((item) => ({
          id: item._id || item.id,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          totalAmount: item.quantity * item.price,
          image: item.image,
        })),
        totalQuantity: order.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
        subTotal,
        "deliveryFee(5%)": deliveryFee,
        totalAmount,
        paymentMethod: order.paymentMethod,
        // paymentStatus: order.payment ? "Paid" : "Pending",
        status: order.status,
        address: order.address,
        date: order.date,
      };
    });

    res.json({
      success: true,
      message: "All orders fetched successfully",
      totalOrders: formattedOrders.length,
      orders: formattedOrders,
    });
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
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Token is required" });
    }

    const decoded = jwt.decode(token);
    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return res.json({ success: false, message: "Invalid token" });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    if (!orders || orders.length === 0) {
      return res.json({
        success: true,
        message: "No orders found for this user",
        totalOrders: 0,
        orders: [],
      });
    }

    const formattedOrders = orders.map((order) => {
      const subTotal = order.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const deliveryFee = subTotal * 0.05;
      const totalAmount = subTotal + deliveryFee;

      return {
        id: order._id,
        userId: order.userId,
        items: order.items.map((item) => ({
          id: item._id || item.id,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          totalAmount: item.quantity * item.price,
          image: item.image || [],
        })),
        totalQuantity: order.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
        subTotal: subTotal,
        "deliveryFee(5%)": deliveryFee,
        totalAmount: totalAmount,
        paymentMethod: order.paymentMethod,
        status: order.status,
        address: order.address,
        date: order.date,
        // createdAt: order.createdAt,
        // updatedAt: order.updatedAt,
      };
    });

    res.json({
      success: true,
      message: "User orders fetched successfully",
      totalOrders: formattedOrders.length,
      orders: formattedOrders,
    });
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
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const existingOrder = await orderModel.findById(orderId);

    if (!existingOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    const beforeStatus = existingOrder.status;

    const subTotal = existingOrder.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryFee = subTotal * 0.05;
    const totalAmount = subTotal + deliveryFee;

    existingOrder.status = status;
    await existingOrder.save();

    const orderDetails = {
      orderId: existingOrder._id,
      userId: existingOrder.userId,
      address: existingOrder.address,
      beforeStatus,
      afterStatus: status,
      totalPrice: totalAmount,
    };

    res.json({
      success: true,
      message: "Order status updated successfully",
      orderDetails,
    });
  } catch (error) {
    console.error("Update Order Status From Admin Panel Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Update Order Status From Admin Panel Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Update Order Status From Admin Panel Error)": error.message,
    });
  }
};
