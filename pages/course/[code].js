import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import DocumentCard from "../../Components/DocumentCard";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { selectVerifiedUnverifiedDocuments } from "../../Database/DocumentCommands";

export default function CourseDocument({
  verifiedDocuments,
  unverifiedDocuments,
}) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Verified Documents
          </Typography>
        </Grid>
        {verifiedDocuments?.map((data, index) => {
          return (
            <Grid xs={12} md={6} key={index}>
              <DocumentCard data={data} />
            </Grid>
          );
        })}

        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Unverified Documents
          </Typography>
        </Grid>
        {unverifiedDocuments?.map((data, index) => {
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
  const { code } = context.query;
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

  const verifiedDocuments = await selectVerifiedUnverifiedDocuments(true);
  const unverifiedDocuments = await selectVerifiedUnverifiedDocuments(false);

  return {
    props: {
      verifiedDocuments,
      unverifiedDocuments,
    },
  };
};
