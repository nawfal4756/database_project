import { connection } from "./DBConnection";

const SELECT_STUDENT_BY_EMAIL =
  "SELECT * FROM student WHERE student_email = ?;";
const INSERT_STUDENT = "INSERT INTO student (student_email) VALUES (?);";
const UPDATE_STUDENT =
  "UPDATE student SET student_fname = ?, student_lname = ?, student_degree_level = ?, basicForm = true WHERE student_email = ?;";

export const getStudentByEmail = async (email) => {
  const [rows, fields] = await connection.execute(SELECT_STUDENT_BY_EMAIL, [
    email,
  ]);
  return rows;
};

export const insertStudent = async (email) => {
  const [rows, fields] = await connection.execute(INSERT_STUDENT, [email]);
  return rows;
};

export const updateStudent = async (fname, lname, degree, email) => {
  const [rows, fields] = await connection.execute(UPDATE_STUDENT, [
    fname,
    lname ? lname : null,
    degree,
    email,
  ]);
  return rows;
};
