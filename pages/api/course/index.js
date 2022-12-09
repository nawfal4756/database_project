import { getAllCourses } from "../../../Database/CourseCommands";

export default async function handler(req, res) {
  const courses = await getAllCourses();

  res.status(200).json({ courses });
}
