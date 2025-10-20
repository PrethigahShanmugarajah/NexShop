// Server/middleware/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // const { token } = req.headers;
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    req.admin = { email: decoded.email };

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default adminAuth;

// // Server/middleware/adminAuth.js
// import jwt from "jsonwebtoken";

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     if (!token) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }

//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res.json({
//         success: false,
//         message: "Not Authorized Login Again",
//       });
//     }
//     next();
//   } catch (error) {
//     console.error(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default adminAuth;
