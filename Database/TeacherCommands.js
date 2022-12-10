import { connection } from "./DBConnection";

const SELECT_TEACHER_BY_EMAIL =
  "SELECT * FROM teacher WHERE teacher_email = ?;";
const INSERT_TEACHER = "INSERT INTO teacher (teacher_email) VALUES (?);";
const UPDATE_TEACHER =
  "UPDATE teacher SET teacher_fname = ?, teacher_lname = ?, basicForm = true WHERE teacher_email = ?;";

export const getTeacherByEmail = async (email) => {
  const [rows, fields] = await connection.execute(SELECT_TEACHER_BY_EMAIL, [
    email,
  ]);
  return rows;
};

export const insertTeacher = async (email) => {
  const [rows, fields] = await connection.execute(INSERT_TEACHER, [email]);
  return rows;
};

export const updateTeacher = async (fname, lname, email) => {
  const [rows, fields] = await connection.execute(UPDATE_TEACHER, [
    fname,
    lname ? lname : null,
    email,
  ]);
  return rows;
};
