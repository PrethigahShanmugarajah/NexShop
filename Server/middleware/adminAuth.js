import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized. Please login again",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res.json({
        success: false,
        message: "Not authorized. Admin access only",
      });
    }

    next();
  } catch (error) {
    console.error("Admin Auth error:", error.message);

    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Admin Auth error:: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Admin Auth error:)": error.message,
    });
  }
};

export default adminAuth;
