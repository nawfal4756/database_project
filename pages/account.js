import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import AccountForm from "../Components/AccountForm";
import { authOptions } from "./api/auth/[...nextauth]";

export default function UpdatePage({ session }) {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Update Account Details
        </Typography>
      </Grid>
      <Grid xs={12}>
        <AccountForm session={session} />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  if (session) {
    if (!session.verified) {
      return {
        redirect: {
          destination: "/signup",
        },
      };
    }
  }

  return {
    props: {
      session,
    },
  };
};
