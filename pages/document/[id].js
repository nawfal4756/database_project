import { Typography } from "@mui/material";

export default function DisplayDocument() {
  return (
    <div>
      <Typography>Document</Typography>
      <object
        width="100%"
        height="400"
        data="https://www.africau.edu/images/default/sample.pdf"
        type="application/pdf"
      ></object>
    </div>
  );
}
