import { unstable_getServerSession } from "next-auth";
import {
  deleteDocument,
  selectAllDocument,
  selectAllVerifiedUnverifiedDocument,
  updateVerifyStatus,
} from "../../../../Database/DocumentCommands";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.json(400).json("Not Logged In!");
    return;
  }

  if (req.method === "GET") {
    const { verify } = req.query;
    let documents = [];
    if (verify === "false") {
      documents = await selectAllVerifiedUnverifiedDocument(false);
    } else {
      documents = await selectAllDocument();
    }
    res.status(200).json({ documents });
    return;
  } else if (req.method === "POST") {
    console.log(req.body.code);
    await updateVerifyStatus(req.body.code);
    res.status(200).json({ message: "Successful" });
    return;
  } else if (req.method === "DELETE") {
    const { code } = req.query;
    console.log(code);
    await deleteDocument(code);
    res.status(200).json({ message: "Successful" });
    return;
  }

  res.status(405).json({ messgae: "Does not support" });
}
