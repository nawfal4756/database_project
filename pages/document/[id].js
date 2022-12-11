import { Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import { selectDocumentsByCodeAndId } from "../../Database/DocumentCommands";
import { authOptions } from "../api/auth/[...nextauth]";
import { s3client } from "../../lib/AWSConfig";
import camelcase from "camelcase";

export default function DisplayDocument({ document, url }) {
  const {
    document_type,
    course_name,
    campus,
    document_date_semester,
    document_date_year,
    document_verified,
  } = document[0];
  return (
    <div>
      <Grid container>
        <Grid xs={12}>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Document Details
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography>
            Type: {camelcase(document_type, { pascalCase: true })}
          </Typography>
          <Typography>Course: {course_name}</Typography>
          <Typography>Campus: {campus}</Typography>
          <Typography>
            Semester:{" "}
            {camelcase(document_date_semester, { pascalCase: true }) +
              "-" +
              document_date_year}
          </Typography>
          <Typography sx={{ color: document_verified ? "green" : "red" }}>
            Verified: {document_verified ? "Yes" : "No"}
          </Typography>
          <Button href={url} target="_blank" variant="contained">
            Download
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    if (!session?.verified) {
      return {
        redirect: {
          destination: "/signup",
        },
      };
    }
  }

  const { id } = context.query;
  const document = await selectDocumentsByCodeAndId(id);
  const url = s3client.getSignedUrl("getObject", {
    Bucket: process.env.DO_SPACES_BUCKET,
    Key: document[0].document_name,
    Expires: 300,
  });

  return {
    props: {
      document,
      url,
    },
  };
};
