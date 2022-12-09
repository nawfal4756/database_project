import mysql from "mysql2/promise";

export const connection = mysql.createPool({
  connectionLimit: 50,
  host: "localhost",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "fms",
});
