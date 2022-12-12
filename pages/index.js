import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import DocumentCard from "../Components/DocumentCard";
import { selectDocuments20 } from "../Database/DocumentCommands";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Main({ documents }) {
  const parsedDocuments = JSON.parse(documents);
  console.log(parsedDocuments);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Recently Uploaded
          </Typography>
        </Grid>
        {parsedDocuments?.map((data, index) => {
          return (
            <Grid xs={12} md={6} key={index}>
              <DocumentCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const documents = await selectDocuments20();
  console.log(documents);
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

  return {
    props: {
      documents: JSON.stringify(documents),
    },
  };
};
