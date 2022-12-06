import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "fms",
    });
    if (connection) {
      res.status(200).json({ message: "Database Connected" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Connecting Database" });
    return;
  }
}
