import { Google } from "@mui/icons-material";
import {
  Button,
  Paper,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Login() {
  const [providers, setProviders] = useState();

  useEffect(() => {
    const getProvidersPage = async () => {
      setProviders(await getProviders());
    };

    getProvidersPage();
  }, []);

  return (
    <div>
      <Paper elevation={4}>
        <Grid container textAlign={"center"}>
          <Grid item xs={12}>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              Login
            </Typography>
          </Grid>
          <Grid xs={12}>
            {providers?.google && (
              <Button
                onClick={() => signIn(providers.google.id)}
                variant="outlined"
                sx={{ textAlign: "center", p: 1, m: 4 }}
              >
                <Google sx={{ p: 1 }} />
                Sign In With Google
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
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
    } else {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  }

  return {
    props: {},
  };
};
