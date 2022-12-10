import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import DocumentCard from "../Components/DocumentCard";
import { defaults } from "../lib/default";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Main({ data }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Recently Uploaded
          </Typography>
        </Grid>
        {data.map((data) => {
          return (
            <Grid xs={12} md={6} key={data.id}>
              <DocumentCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const data = await axios(`${defaults.link}/document`);
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
      data: data.data,
    },
  };
};
