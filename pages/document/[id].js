import { Typography, Unstable_Grid2 as Grid } from "@mui/material";

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
