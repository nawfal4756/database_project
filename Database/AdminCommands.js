import { connection } from "./DBConnection";

const SELECT_ADMIN_BY_EMAIL = "SELECT * FROM admin WHERE admin_email = ?;";
const INSERT_ADMIN = "INSERT INTO admin (admin_email) VALUES (?);";
const UPDATE_ADMIN =
  "UPDATE admin SET admin_fname = ?, admin_lname = ?, basicForm = true WHERE admin_email = ?;";

export const getAdminByEmail = async (email) => {
  const [rows, fields] = await connection.execute(SELECT_ADMIN_BY_EMAIL, [
    email,
  ]);
  return rows;
};

export const insertAdmin = async (email) => {
  const [rows, fields] = await connection.execute(INSERT_ADMIN, [email]);
  return rows;
};

export const updateAdmin = async (fname, lname, email) => {
  const [rows, fields] = await connection.execute(UPDATE_ADMIN, [
    fname,
    lname ? lname : null,
    email,
  ]);
  return rows;
};
