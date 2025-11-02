// Server/controllers/productController.js
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

/* ---------------- ADD PRODUCT ---------------- */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });

        return result.secure_url;
      })
    );

    // console.log(
    //   name,
    //   description,
    //   price,
    //   category,
    //   subCategory,
    //   sizes,
    //   bestSeller
    // );

    // console.log(image);

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrl,
      date: Date.now(),
    };

    // console.log(productData);

    const product = new productModel(productData);
    await product.save();

    const productResponse = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestSeller: product.bestSeller,
      image: product.image,
      date: product.date,
    };

    res.json({
      success: true,
      message: "Product Added",
      product: productResponse,
    });
  } catch (error) {
    console.error("Add Product error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Add Product error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Add Product error)": error.message,
    });
  }
};

/* ---------------- LIST PRODUCT ---------------- */
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});

    // Calculate total counts
    const totalProducts = products.length;
    const totalByCategory = {};
    const totalBySubCategory = {};

    products.forEach((product) => {
      totalByCategory[product.category] =
        (totalByCategory[product.category] || 0) + 1;
      totalBySubCategory[product.subCategory] =
        (totalBySubCategory[product.subCategory] || 0) + 1;
    });

    const productsResponse = products.map((product) => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestSeller: product.bestSeller,
      image: product.image,
      date: product.date,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.json({
      success: true,
      totalProducts,
      totalByCategory,
      totalBySubCategory,
      products: productsResponse,
    });
  } catch (error) {
    console.error("List Product error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `List Product error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(List Product error)": error.message,
    });
  }
};

/* ---------------- REMOVE PRODUCT ---------------- */
export const removeProducts = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const productResponse = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestSeller: product.bestSeller,
      image: product.image,
      date: product.date,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    await productModel.findByIdAndDelete(req.body.id);

    res.json({
      success: true,
      message: "Product successfully removed",
      removedProduct: productResponse,
    });
  } catch (error) {
    console.error("Product Remove Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Product Remove Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Product Remove Error)": error.message,
    });
  }
};

/* ---------------- SINGLE PRODUCT INFO [ID] ---------------- */
export const singleProducts = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const productResponse = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      sizes: product.sizes,
      bestSeller: product.bestSeller,
      image: product.image,
      date: product.date,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    res.json({ success: true, product: productResponse });
  } catch (error) {
    console.error("Single Product Info(Id) Error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Single Product Info(Id) Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Single Product Info(Id) Error)": error.message,
    });
  }
};
