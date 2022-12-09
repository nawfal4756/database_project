import mysql from "mysql2/promise";
import { getAllUsers } from "../../Database/UserCommands";

export default async function handler(req, res) {
  const response = await getAllUsers();
  if (response) {
    res.status(200).json({ message: "DB Connected", response });
  } else {
    res.status(500).json({ message: "Error Connecting Database" });
  }
}
