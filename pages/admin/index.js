import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function AdminHomePage() {
  const [countAll, setCountAll] = useState(0);
  const [countVerified, setCountVerified] = useState(0);
  const [openAddAdmin, setOpenAddAdmin] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getValues() {
      const response = await axios("/api/admin");
      setCountAll(response.data.allCount[0].count);
      setCountVerified(response.data.verifiedCount[0].count);
    }

    getValues();
  }, []);

  const HandleAddAdmin = async () => {
    setOpenAddAdmin(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} direction="row">
          {/* <Dialog open={openAddAdmin}>
            <DialogTitle>Add Admin</DialogTitle>
            <DialogContent>
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label="Email"
                sx={{ p: 1, m: 1 }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenAddAdmin(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
              <Button onClick={HandleAddAdmin} variant="contained">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            sx={{ mx: 1 }}
            onClick={() => {
              setOpenAddAdmin(true);
            }}
          >
            Add Admin
          </Button> */}
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
            Total Number of documents verified: {countVerified}
          </Typography>
          <Typography>
            Total Number of documents needed to be verified:{" "}
            {countAll - countVerified}
          </Typography>
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
    } else if (session.type != "admin") {
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
