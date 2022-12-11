import { connection } from "./DBConnection";

const INSERT_DOCUMENT =
  "INSERT INTO document (course_code, document_name, document_type, document_anonymous, document_student, document_teacher, campus_id, document_uploader_email, document_uploader_type, document_date_semester, document_date_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

export const insertDocument = async (
  course_code,
  document_name,
  document_type,
  document_anonymous,
  document_student,
  document_teacher,
  campus_id,
  document_uploader_email,
  document_uploader_type,
  document_date_semester,
  document_date_year
) => {
  const [rows, fields] = await connection.execute(INSERT_DOCUMENT, [
    course_code,
    document_name,
    document_type,
    document_anonymous === "true" ? true : false,
    document_student ? (document_student === "true" ? true : false) : null,
    document_teacher ? (document_teacher === "true" ? true : false) : null,
    campus_id,
    document_uploader_email,
    document_uploader_type,
    document_date_semester,
    document_date_year,
  ]);
  return rows;
};
