import AWS from "aws-sdk";

export const s3client = new AWS.S3({
  endpoint: process.env.DO_SPACES_URL,
  region: "fra1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ID,
    secretAccessKey: process.env.DO_SPACES_SECRET,
  },
});
