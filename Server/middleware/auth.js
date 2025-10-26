import jwt from "jsonwebtoken";
import { connection } from "../config/db.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  console.log("[auth] incoming token header:", token);

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Please login again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("[auth] token decoded:", decoded);

    const [rows] = await connection.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

// // Server/middleware/auth.js
// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   const { token } = req.headers;

//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized Login Again" });
//   }

//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser;
