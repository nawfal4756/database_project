import { connection } from "./DBConnection";

const SELECT_ALL_COURSE = "SELECT * FROM course;";

export const getAllCourses = async () => {
  const [rows, fields] = await connection.execute(SELECT_ALL_COURSE);
  return rows;
};
