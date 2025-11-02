// Server / controllers / cartController.js;
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";

/* ---------------- ADD PRODUCTS TO USER CART ---------------- */
export const addToCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    const productIds = Object.keys(cartData);
    const products = await productModel.find({ _id: { $in: productIds } });

    let totalProductsCount = 0;
    let subtotalAmount = 0;
    let totalByCategory = {};
    let totalBySubCategory = {};

    const cartResponse = products
      .map((product) => {
        const sizesObj = cartData[product._id];
        return Object.entries(sizesObj).map(([size, quantity]) => {
          const totalAmount = product.price * quantity;

          totalProductsCount += quantity;
          subtotalAmount += totalAmount;

          totalByCategory[product.category] = totalByCategory[
            product.category
          ] || {
            sizes: {},
            quantity: 0,
            amount: 0,
          };

          totalByCategory[product.category].sizes[size] = totalByCategory[
            product.category
          ].sizes[size] || {
            quantity: 0,
            amount: 0,
          };

          totalByCategory[product.category].sizes[size].quantity += quantity;
          totalByCategory[product.category].sizes[size].amount += totalAmount;

          totalByCategory[product.category].quantity += quantity;
          totalByCategory[product.category].amount += totalAmount;

          totalBySubCategory[product.subCategory] = totalBySubCategory[
            product.subCategory
          ] || {
            sizes: {},
            quantity: 0,
            amount: 0,
          };

          totalBySubCategory[product.subCategory].sizes[size] =
            totalBySubCategory[product.subCategory].sizes[size] || {
              quantity: 0,
              amount: 0,
            };

          totalBySubCategory[product.subCategory].sizes[size].quantity +=
            quantity;
          totalBySubCategory[product.subCategory].sizes[size].amount +=
            totalAmount;

          totalBySubCategory[product.subCategory].quantity += quantity;
          totalBySubCategory[product.subCategory].amount += totalAmount;

          return {
            // id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            subCategory: product.subCategory,
            // image: product.image,
            bestSeller: product.bestSeller,
            size,
            quantity,
            totalAmount,
          };
        });
      })
      .flat();

    const deliveryFee = +(subtotalAmount * 0.05).toFixed(2);
    const totalAmountWithDelivery = +(subtotalAmount + deliveryFee).toFixed(2);

    totalByCategory.total = {
      quantity: totalProductsCount,
      amount: subtotalAmount,
    };

    totalBySubCategory.total = {
      quantity: totalProductsCount,
      amount: subtotalAmount,
    };

    res.json({
      success: true,
      message: "Added to Cart",
      totalProducts: {
        quantity: totalProductsCount,
        subtotal: subtotalAmount,
        "deliveryFee(5%)": deliveryFee,
        total: totalAmountWithDelivery,
      },
      totalByCategory,
      totalBySubCategory,
      cart: cartResponse,
    });
  } catch (error) {
    console.error("Add Product to User Cart error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Add Product to User Cart error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Add Product to User Cart error)": error.message,
    });
  }
};

/* ---------------- UPDATE USER CART ---------------- */
export const updateCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { itemId, size, quantity } = req.body;
    if (!itemId || !size)
      return res.json({ success: false, message: "Missing required fields" });

    const userData = await userModel.findById(userId);
    if (!userData)
      return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    let actionMessage = "";

    if (!cartData[itemId]) {
      return res.json({ success: false, message: "Item not in cart" });
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
        actionMessage = "Product removed from cart successfully";
      } else {
        actionMessage = "Size removed from cart successfully";
      }
    } else {
      const oldQuantity = cartData[itemId][size] || 0;
      cartData[itemId][size] = quantity;
      actionMessage =
        quantity > oldQuantity
          ? "Quantity increased successfully"
          : "Quantity decreased successfully";
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    const productIds = Object.keys(cartData);
    const products = await productModel.find({ _id: { $in: productIds } });

    let totalProductsCount = 0;
    let subtotalAmount = 0;
    let totalByCategory = {};
    let totalBySubCategory = {};

    products.forEach((product) => {
      const sizesObj = cartData[product._id];
      Object.entries(sizesObj).forEach(([size, qty]) => {
        const totalAmount = product.price * qty;
        totalProductsCount += qty;
        subtotalAmount += totalAmount;

        totalByCategory[product.category] = totalByCategory[
          product.category
        ] || { sizes: {}, quantity: 0, amount: 0 };
        totalByCategory[product.category].sizes[size] = {
          quantity: qty,
          price: product.price,
        };
        totalByCategory[product.category].quantity += qty;
        totalByCategory[product.category].amount += totalAmount;

        totalBySubCategory[product.subCategory] = totalBySubCategory[
          product.subCategory
        ] || { sizes: {}, quantity: 0, amount: 0 };
        totalBySubCategory[product.subCategory].sizes[size] = {
          quantity: qty,
          price: product.price,
        };
        totalBySubCategory[product.subCategory].quantity += qty;
        totalBySubCategory[product.subCategory].amount += totalAmount;
      });
    });

    const deliveryFee = +(subtotalAmount * 0.05).toFixed(2);
    const totalAmountWithDelivery = +(subtotalAmount + deliveryFee).toFixed(2);

    totalByCategory.total = {
      quantity: totalProductsCount,
      amount: subtotalAmount,
    };
    totalBySubCategory.total = {
      quantity: totalProductsCount,
      amount: subtotalAmount,
    };

    res.json({
      success: true,
      message: actionMessage,
      totalProducts: {
        quantity: totalProductsCount,
        subtotal: subtotalAmount,
        "deliveryFee(5%)": deliveryFee,
        total: totalAmountWithDelivery,
      },
      totalByCategory,
      totalBySubCategory,
    });
  } catch (error) {
    console.error("Update User Cart error:", error.message);
    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Update User Cart error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Update User Cart error)": error.message,
    });
  }
};

/* ---------------- GET USER CART DATA ---------------- */
export const getUserCart = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id;

    const userData = await userModel.findById(userId);

    if (!userData)
      return res.json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Get User Cart Data error:", error.message);

    console.error("Get User Cart Data error:", error.message);
    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Add Product to Cart error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Get User Cart Data error)": error.message,
    });
  }
};
