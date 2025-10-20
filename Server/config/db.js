// Server/config/db.js
import mysql from "mysql2/promise";

let connection;

const connectDB = async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log("MySQL DB Connected!");
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    process.exit(1);
  }
};

export { connectDB, connection };

// Server/config/db.js
// import mongoose from "mongoose";

// const connectDB = async () => {
//   mongoose.connection.on("connected", () => {
//     console.log("Mongo DB Connected!");
//   });

//   await mongoose.connect(`${process.env.MONGODB_URI}/nexshop`);
// };

// export default connectDB;
