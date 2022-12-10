import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function DisplayDocument() {
  return (
    <div>
      <Grid container>
        <Grid xs={12}>
          <Typography>Document</Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <object
            width="100%"
            height="1000"
            data={"../../public/documents/Assignment5_20K-1692.pdf"}
            type="application/pdf"
          ></object>
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

  return {
    props: {},
  };
};
