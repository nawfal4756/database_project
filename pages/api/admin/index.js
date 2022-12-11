import { unstable_getServerSession } from "next-auth";
import {
  selectCountDocuments,
  selectCountVerifiedUnverifiedDocuments,
} from "../../../Database/DocumentCommands";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.json(400).json("Not Logged In!");
    return;
  }

  const allCount = await selectCountDocuments();
  const verifiedCount = await selectCountVerifiedUnverifiedDocuments(true);

  res.status(200).json({ allCount, verifiedCount });
}
