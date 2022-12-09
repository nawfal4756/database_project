import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DocumentCard from "../Components/DocumentCard";
import { defaults } from "../lib/default";

export default function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await axios(`${defaults.link}/document`);
      setData(data.data);
    }

    getData();
  }, []);

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
