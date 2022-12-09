import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { defaults } from "../../lib/default";
import DocumentCard from "../../Components/DocumentCard";

export default function CourseDocument({
  verifiedDocuments,
  unverifiedDocuments,
}) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Verified Documents
          </Typography>
        </Grid>
        {verifiedDocuments?.map((data, index) => {
          return (
            <Grid xs={12} md={6} key={index}>
              <DocumentCard data={data} />
            </Grid>
          );
        })}

        <Grid xs={12}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Unverified Documents
          </Typography>
        </Grid>
        {unverifiedDocuments?.map((data, index) => {
          return (
            <Grid xs={12} md={6} key={index}>
              <DocumentCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const { code } = context.query;
  const responseVerified = await axios(
    `${defaults.link}/document?course_code=${code}&verified=true`
  );
  const responseUnverified = await axios(
    `${defaults.link}/document?course_code=${code}&verified=false`
  );
  let verifiedDocuments = responseVerified.data;
  let unverifiedDocuments = responseUnverified.data;

  return {
    props: {
      verifiedDocuments,
      unverifiedDocuments,
    },
  };
};
