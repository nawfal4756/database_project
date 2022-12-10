import { connection } from "./DBConnection";

const INSERT_SESSION =
  "INSERT INTO session (expires, sessionToken, userId) VALUES (?, ?, ?);";
const SELECT_BY_SESSION_TOKEN = "SELECT * FROM session WHERE sessionToken = ?;";
const SELECT_BY_ID = "SELECT * FROM session WHERE id = ?;";
const UPDATE_SESSION = "UPDATE session SET sessionToken = ? WHERE id = ?;";
const DELETE_SESSION = "DELETE FROM session WHERE id = ?;";

export const insertSession = async (sessionToken, userId, expires) => {
  const [rows, fields] = await connection.execute(INSERT_SESSION, [
    expires,
    sessionToken,
    userId,
  ]);
  return rows;
};

export const getSessionBySessionToken = async (sessionToken) => {
  const [rows, fields] = await connection.execute(SELECT_BY_SESSION_TOKEN, [
    sessionToken,
  ]);
  return rows;
};

export const getSessionById = async (id) => {
  const [rows, fields] = await connection.execute(SELECT_BY_ID, [id]);
  return rows;
};

export const updateSessionById = async (sessionToken, id) => {
  const [rows, fields] = await connection.execute(UPDATE_SESSION, [
    sessionToken ? sessionToken : null,
    id ? id : null,
  ]);
  return rows;
};

export const deleteSessionById = async (id) => {
  const [rows, fields] = await connection.execute(DELETE_SESSION, [id]);
  return rows;
};
