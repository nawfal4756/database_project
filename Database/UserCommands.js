import { connection } from "./DBConnection";

const SELECT_ALL_USER = "SELECT * FROM user;";
const SELECT_USER_BY_EMAIL = "SELECT * FROM user WHERE email = ?;";
const SELECT_USER_BY_ID = "SELECT * FROM user WHERE id = ?;";
const INSERT_USER =
  "INSERT INTO user (name, email, emailVerified, image) VALUES (?, ?, ?, ?);";
const UPDATE_USER =
  "UPDATE user SET name = ?, email = ?, emailVerified = ?, image = ? WHERE id = ?;";
const DELETE_USER = "DELETE FROM user WHERE id = ?;";

export const getAllUsers = async () => {
  const [rows, fields] = await connection.execute(SELECT_ALL_USER);
  return rows;
};

export const getUserByEmail = async (user) => {
  const [rows, fields] = await connection.execute(SELECT_USER_BY_EMAIL, [
    user.email,
  ]);
  return rows;
};

export const getUserByEmailWE = async (email) => {
  const [rows, fields] = await connection.execute(SELECT_USER_BY_EMAIL, [
    email,
  ]);
  return rows;
};

export const getUserById = async (id) => {
  const [rows, fields] = await connection.execute(SELECT_USER_BY_ID, [id]);
  return rows;
};

export const insertUser = async (user) => {
  const [rows, fields] = await connection.execute(INSERT_USER, [
    user.name,
    user.email,
    user.emailVerified,
    user.image,
  ]);
  return rows;
};

export const updateUserById = async (updatedUser) => {
  const id = parseInt(updatedUser.id);
  const [rows, fields] = await connection.execute(UPDATE_USER, [
    updatedUser.name,
    updatedUser.email,
    updatedUser.emailVerified,
    updatedUser.image,
    id,
  ]);
  return rows;
};

export const deleteUserById = async (id) => {
  return await connection.execute(DELETE_USER, [id]);
};
