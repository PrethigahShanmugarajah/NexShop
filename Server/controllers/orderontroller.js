// Server / controllers / orderontroller.js;
import orderModel from "../models/orderModel.js";

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
//     console.error("Placing Orders Using Cod Method error:", error.message);

//     // res.json({
//     //   success: false,
//     //   message: error.message,
//     // });

//     // res.json({
//     //   success: false,
//     //   message: `Placing Orders Using Cod Method error: ${error.message}`,
//     // });

//     res.json({
//       success: false,
//       "message(Placing Orders Using Cod Method error)": error.message,
//     });
//   }
// };

/* ---------------- PLACING ORDERS USING COD METHOD ---------------- */
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

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
        totalAmount: item.quantity * item.price,
      })),
      totalQuantity: savedOrder.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
      totalAmount: savedOrder.amount,
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
    console.error("Placing Orders Using Cod Method error:", error.message);
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
