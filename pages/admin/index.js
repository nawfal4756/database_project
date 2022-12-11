import { Button, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { defaults } from "../../lib/default";
import { authOptions } from "../api/auth/[...nextauth]";

export default function AdminHomePage({ countNotVerified, countAll }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} direction="row">
          <Link href="/admin/document">
            <Button variant="contained" sx={{ mx: 1 }}>
              View All Documents
            </Button>
          </Link>
          <Link href="/admin/document/verify">
            <Button variant="contained">Verify Documents</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography>Total Number of documents: {countAll}</Typography>
          <Typography>
            Total Number of documents verified: {countAll - countNotVerified}
          </Typography>
          <Typography>
            Total Number of documents needed to be verified: {countNotVerified}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const responseNotVerfied = await axios(
    `${defaults.link}/document?&verified=false`
  );
  const responseAll = await axios(`${defaults.link}/document`);

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
      // } else if (session.type != "admin") {
      //   return {
      //     redirect: {
      //       destination: "/",
      //     },
      //   };
    }
  }

  const countNotVerified = responseNotVerfied.data.length;
  const countAll = responseAll.data.length;

  return {
    props: {
      countNotVerified,
      countAll,
    },
  };
};
