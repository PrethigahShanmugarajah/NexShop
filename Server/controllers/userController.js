// Server/controllers/userController.js
import validator from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/* ---------------- USER LOGIN ---------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = createToken(user.id);

    res.json({
      success: true,
      message: "User Successfully Login",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login user error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- USER REGISTER ---------------- */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check all fields
    if (!name || !email || !password || !confirmPassword) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Check password match
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Checking User Already Exists or Not
    const exists = await userModel.findByEmail(email);
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validating Email Format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid Email",
      });
    }

    // Validating Strong Password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await userModel.create({
      name,
      email,
      password: hashedPassword,
      cartData: {},
    });

    const token = createToken(result.insertId);

    res.json({
      success: true,
      message: "User Successfully Registered",
      token,
      user: {
        id: result.insertId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Register user error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- ADMIN LOGIN ---------------- */
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

/* ---------------- USER LOGIN ---------------- */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (isMatch) {
//       const token = createToken(user._id);
//       res.json({
//         success: true,
//         message: "Login Successful",
//         token,
//         user: {
//           id: user._id,
//           userName: user.userName,
//           email: user.email,
//         },
//       });
//     } else {
//       res.json({ success: false, message: "Invalid Credentials" });
//     }
//   } catch (error) {
//     console.error("Register user error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

/* ---------------- USER REGISTER ---------------- */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, confirmPassoword } = req.body;

//     // Checking User Already Exists or Not
//     const exists = await userModel.findOne({ email });

//     if (exists) {
//       return res.json({ success: false, message: "User already exists" });
//     }

//     // Validating Email Format
//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid Email",
//       });
//     }

//     // Validating  Strong Password
//     if (password.length < 8) {
//       return res.json({
//         success: false,
//         message: "Please enter a strong Password",
//       });
//     }

//     // Hashing User Password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     const user = await newUser.save();

//     const token = createToken(user._id);

//     res.json({ success: true, token, message: "User Sussfly Register" });
//   } catch (error) {
//     console.error("Register Stattus user error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// } ;

/* ---------------- ADMIN LOGIN ---------------- */
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (
//       email === process.env.ADMIN_EMAIL &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       const token = jwt.sign(email + password, process.env.JWT_SECRET);
//       res.json({ success: true, token });
//     } else {
//       res.json({ success: false, message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Register user error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };
