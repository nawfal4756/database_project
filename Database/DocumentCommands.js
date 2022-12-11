import { connection } from "./DBConnection";

const INSERT_DOCUMENT =
  "INSERT INTO document (course_code, document_name, document_type, document_anonymous, document_student, document_teacher, campus_id, document_uploader_email, document_uploader_type, document_date_semester, document_date_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
const SELECT_DOCUMENT_20 =
  "SELECT d.document_id, d.document_type, d.document_date_semester, d.document_date_year, c.course_code, c.course_name FROM document d JOIN course c ON d.course_code = c.course_code ORDER BY document_uploaded_date DESC LIMIT 20;";
const SELECT_DOCUMENT_BY_CODE_ID =
  "SELECT d.document_id, d.course_code, document_name, d.document_type, co.course_name, concat_ws(' - ', ca.campus_name, ca.campus_city_name) as 'campus', d.document_date_semester, d.document_date_year, d.document_verified FROM document d JOIN course co ON d.course_code = co.course_code JOIN campus ca ON d.campus_id = ca.campus_id WHERE d.course_code = ? AND d.document_id = ?;";
const SELECT_DOCUMENT_BY_VERIFICATION =
  "SELECT document_id, document_type, document_date_semester, document_date_year, course_code FROM document where document_verified = ?;";
const SELECT_COUNT_DOCUMENT =
  "SELECT COUNT(document_id) as count FROM document;";
const SELECT_COUNT_DOCUMENT_BY_VERIFICATION =
  "SELECT COUNT(document_id) as count FROM document WHERE document_verified = ?;";
const SELECT_ALL_DOCUMENT =
  "SELECT d.document_id, d.course_code, d.document_type, co.course_name, concat_ws(' - ', ca.campus_name, ca.campus_city_name) as 'campus', d.document_date_semester, d.document_date_year, d.document_verified FROM document d JOIN course co ON d.course_code = co.course_code JOIN campus ca ON d.campus_id = ca.campus_id;";
const SELECT_ALL_DOCUMENT_BY_VERIFICATION =
  "SELECT d.document_id, d.course_code, d.document_type, co.course_name, concat_ws(' - ', ca.campus_name, ca.campus_city_name) as 'campus', d.document_date_semester, d.document_date_year, d.document_verified FROM document d JOIN course co ON d.course_code = co.course_code JOIN campus ca ON d.campus_id = ca.campus_id WHERE d.document_verified = ?;";
const UPDATE_VERIFY_STATUS =
  "UPDATE document SET document_verified = true WHERE course_code = ? AND document_id = ?";
const DELETE_DOCUMENT =
  "DELETE FROM document WHERE course_code = ? AND document_id = ?;";

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

export const selectDocuments20 = async () => {
  const [rows, fields] = await connection.execute(SELECT_DOCUMENT_20);
  return rows;
};

export const selectDocumentsByCodeAndId = async (code) => {
  const id = code.split("-");
  const [rows, fields] = await connection.execute(SELECT_DOCUMENT_BY_CODE_ID, [
    id[0],
    id[1],
  ]);
  return rows;
};

export const selectVerifiedUnverifiedDocuments = async (condition) => {
  const [rows, fields] = await connection.execute(
    SELECT_DOCUMENT_BY_VERIFICATION,
    [condition]
  );
  return rows;
};

export const selectCountDocuments = async () => {
  const [rows, fields] = await connection.execute(SELECT_COUNT_DOCUMENT);
  return rows;
};

export const selectCountVerifiedUnverifiedDocuments = async (condition) => {
  const [rows, fields] = await connection.execute(
    SELECT_COUNT_DOCUMENT_BY_VERIFICATION,
    [condition]
  );
  return rows;
};

export const selectAllDocument = async () => {
  const [rows, fields] = await connection.execute(SELECT_ALL_DOCUMENT);
  return rows;
};

export const selectAllVerifiedUnverifiedDocument = async (condition) => {
  const [rows, fields] = await connection.execute(
    SELECT_ALL_DOCUMENT_BY_VERIFICATION,
    [condition]
  );
  return rows;
};

export const updateVerifyStatus = async (code) => {
  const id = code.split("-");
  const [rows, fields] = await connection.execute(UPDATE_VERIFY_STATUS, [
    id[0],
    id[1],
  ]);
  return rows;
};

export const deleteDocument = async (code) => {
  const id = code.split("-");
  const [rows, fields] = await connection.execute(DELETE_DOCUMENT, [
    id[0],
    id[1],
  ]);
  return rows;
};
