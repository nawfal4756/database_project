import { connection } from "./DBConnection";

const SELECT_ALL_CAMPUS =
  "SELECT campus_id, concat_ws(' - ', campus_name, campus_city_name) as campus_name FROM campus;";

export const getAllCampus = async () => {
  const [rows, fields] = await connection.execute(SELECT_ALL_CAMPUS);
  return rows;
};
