import { unstable_getServerSession } from "next-auth";
import { insertStudent, updateStudent } from "../../Database/StudentCommands";
import { insertTeacher, updateTeacher } from "../../Database/TeacherCommands";
import { insertAdmin, updateAdmin } from "../../Database/AdminCommands";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { email, firstName, lastName, degree, type } = req.body;
  let response = "";

  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ message: "User Not Signed In" });
      return;
    } else if (session.user.email != email) {
      res.status(403).json({ message: "Unauthorized Request" });
      return;
    }

    if (type === "insert") {
      if (session.type === "student") {
        response = await insertStudent(email);
      } else if (session.type === "teacher") {
        response = await insertTeacher(email);
      } else if (session.type === "admin") {
        response = await insertAdmin(email);
      } else {
        res.status(400).json({ messgae: "Bad Request Type" });
        return;
      }
    } else if (type === "update") {
      if (session.type === "student") {
        response = await updateStudent(firstName, lastName, degree, email);
      } else if (session.type === "teacher") {
        response = await updateTeacher(firstName, lastName, email);
      } else if (session.type === "admin") {
        response = await updateAdmin(firstName, lastName, email);
      } else {
        res.status(400).json({ messgae: "Bad Request Type" });
        return;
      }
    } else {
      res.status(400).json({ messgae: "Bad Request Type" });
      return;
    }
    res.status(200).json({ messgae: "Successful", response });
    return;
  } else {
    res.status(405).json({ messgae: "Does not support GET method" });
    return;
  }
}
