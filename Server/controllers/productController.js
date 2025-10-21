import { v2 as cloudinary } from "cloudinary";
import { connection } from "../config/db.js";

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

    const images = [];
    if (req.files) {
      const imageFields = ["image1", "image2", "image3", "image4"];
      for (const field of imageFields) {
        if (req.files[field] && req.files[field][0]) {
          const file = req.files[field][0];
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "image",
          });
          images.push(result.secure_url);
        }
      }
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes ? JSON.stringify(JSON.parse(sizes)) : JSON.stringify([]),
      bestseller: bestSeller === "true" ? "true" : "false",
      images: JSON.stringify(images),
      date: Date.now(),
    };

    const [result] = await connection.execute(
      `INSERT INTO products (
        name, 
        description, 
        price, 
        category, 
        subCategory, 
        sizes, 
        bestseller, 
        images, 
        date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productData.name,
        productData.description,
        productData.price,
        productData.category,
        productData.subCategory,
        productData.sizes,
        productData.bestseller,
        productData.images,
        productData.date,
      ]
    );

    res.json({
      success: true,
      message: "Product Added",

      id: result.insertId,
      ...productData,
    });
  } catch (error) {
    console.error("Add Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- LIST PRODUCTS ---------------- */
export const listProducts = async (req, res) => {
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM products ORDER BY id DESC"
    );

    const products = rows.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subCategory: product.subCategory,
      sizes: JSON.parse(product.sizes || "[]"),
      bestseller: product.bestseller === "true" ? "true" : "false",
      images: JSON.parse(product.images || "[]"),
      date: new Date(Number(product.date)).toISOString(),
    }));

    res.json({ success: true, products });
  } catch (error) {
    console.error("List Products error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- REMOVE PRODUCT ---------------- */
export const removeProducts = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

    const product = rows[0];

    await connection.execute("DELETE FROM products WHERE id = ?", [id]);

    res.json({
      success: true,
      message: "Product successfully removed",
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        sizes: JSON.parse(product.sizes || "[]"),
        bestseller: product.bestseller === "true" ? "true" : "false",
        images: JSON.parse(product.images || "[]"),
        date: new Date(Number(product.date)).toISOString(),
      },
    });
  } catch (error) {
    console.error("Remove Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- SINGLE PRODUCT INFO [ID] ---------------- */
export const singleProducts = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    const [rows] = await connection.execute(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

    const product = rows[0];

    res.json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subCategory: product.subCategory,
        sizes: JSON.parse(product.sizes || "[]"),
        bestseller: product.bestseller === "true" ? "true" : "false",
        images: JSON.parse(product.images || "[]"),
        date: new Date(Number(product.date)).toISOString(),
      },
    });
  } catch (error) {
    console.error("Single Product error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- ADD PRODUCT ---------------- */
// export const addProduct = async (req, res) => {
//   try {
//     const {
//       name,
//       description,
//       price,
//       category,
//       subCaregory,
//       sizes,
//       bestSeller,
//     } = req.body;

//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image1[0];
//     const image3 = req.files.image3 && req.files.image1[0];
//     const image4 = req.files.image4 && req.files.image1[0];

//     const images = [image1, image2, image3, image4].filter(
//       (item) => item !== undefined
//     );

//     let imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         let result = await cloudinary.uploader.upload(item.path, {
//           resource_type: "image",
//         });

//         return result.secure_url;
//       })
//     );

//     const productData = {
//       name,
//       description,
//       price: Number(price),
//       category,
//       subCaregory,
//       sizes: JSON.parse(sizes),
//       bestSeller: bestSeller === "true" ? true : false,
//       image: imagesUrl,
//       date: Date.now(),
//     };

//     console.log(productData);

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product Added", productData });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- LIST PRODUCT ---------------- */
// export const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- REMOVE PRODUCT ---------------- */
// export const removeProducts = async (req, res) => {
//   try {
//     await productModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Product successfully removed" });
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- SINGLE PRODUCT IMFO[ID] ---------------- */
// export const singleProducts = async (req, res) => {
//   const { productId } = req.body;
//   const product = await productModel.findById(productId);
//   res.json({ success: true, product });
//   try {
//   } catch (error) {
//     console.error("Add Product error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
