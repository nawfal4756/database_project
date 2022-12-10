import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Signup() {
  const { data: session } = useSession();
  const router = useRouter();
  const [firstName, setFirstName] = useState(session?.user.name);
  const [lastName, setLastName] = useState("");
  // const [dob, setDob] = useState(new Date());
  const [degree, setDegree] = useState("");
  const useEffectRef = useRef(false);

  useEffect(() => {
    async function inputUser() {
      if (session.type === "admin") {
        return;
      }
      const response = await axios.post("/api/signup", {
        email: session?.user.email,
        type: "insert",
      });
    }
    if (!useEffectRef.current) {
      inputUser();
      useEffectRef.current = true;
    }
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (firstName.length <= 0) {
      return;
    }

    // if (dob === new Date()) {
    //   return;
    // }

    if (session.type === "student") {
      if (degree.length <= 0) {
        return;
      }
    }

    const response = await axios.post("/api/signup", {
      email: session?.user.email,
      firstName,
      lastName,
      degree: session.type === "student" ? degree : null,
      type: "update",
    });
    router.push("/");
  };

  return (
    <div>
      <Box component="form">
        <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
          <Grid
            item
            xs={12}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Email"
              disabled
              value={session?.user.email}
              sx={{ width: "50%" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TextField
              required
              label="First Name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              sx={{ width: "50%" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              sx={{ width: "50%" }}
            />
          </Grid>

          {/* <Grid
            item
            xs={12}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={(newValue) => {
                  setDob(newValue);
                }}
                maxDate={new Date()}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid> */}

          {session.type === "student" ? (
            <Grid
              item
              xs={12}
              direction="column"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl fullWidth sx={{ width: "50%" }}>
                <InputLabel id="degree">Degree</InputLabel>
                <Select
                  labelId="degree"
                  required
                  value={degree}
                  onChange={(e) => {
                    setDegree(e.target.value);
                  }}
                  //   sx={{ width: "50%" }}
                  label="Degree"
                >
                  <MenuItem selected disabled value="">
                    Select
                  </MenuItem>
                  <MenuItem value="bachelors">Bachelors</MenuItem>
                  <MenuItem value="masters">Masters</MenuItem>
                  <MenuItem value="phd">PhD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          ) : null}

          <Grid
            item
            xs={12}
            direction="column"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ width: "50%", mt: 5 }}
              fullWidth
              variant="contained"
              type="submit"
              onClick={HandleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
