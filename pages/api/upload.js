import formidable from "formidable";
import { createReadStream } from "fs";
import { insertDocument } from "../../Database/DocumentCommands";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { s3client } from "../../lib/AWSConfig";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: true });
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.json(400).json("Not Logged In!");
    return;
  }

  form.parse(req, (err, fields, files) => {
    const filesArray = [];
    const { anonymous, showStudent, showTeacher } = fields;
    const dataArray = JSON.parse(fields.dataArray);
    Object.keys(files).forEach((value, index) => {
      filesArray.push(files[value]);
    });
    console.log(fields);

    try {
      filesArray.map(async (item, index) => {
        s3client.putObject(
          {
            Bucket: process.env.DO_SPACES_BUCKET,
            Key:
              "documents/" +
              dataArray[index].type +
              "-" +
              dataArray[index].course +
              "-" +
              item.originalFilename,
            Body: createReadStream(item.filepath),
          },
          async () => {}
        );

        await insertDocument(
          dataArray[index].course,
          "documents/" +
            dataArray[index].type +
            "-" +
            dataArray[index].course +
            "-" +
            item.originalFilename,
          dataArray[index].type,
          anonymous,
          showStudent,
          showTeacher,
          dataArray[index].campus,
          session.user.email,
          session.type,
          dataArray[index].semester,
          dataArray[index].year
        );
      });
    } catch (e) {
      console.log(e);
    }
  });
  // console.log(filesArray);

  res.status(200).json({ message: "Successful" });
}
