import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please Login Again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.body.userId = token_decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    // res.json({
    //   success: false,
    //   message: error.message,
    // });

    // res.json({
    //   success: false,
    //   message: `Auth Middleware Error: ${error.message}`,
    // });

    res.json({
      success: false,
      "message(Auth Middleware Error)": error.message,
    });
  }
};

export default auth;
