import { Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import CourseCard from "../../Components/CourseCard";
import { getAllCourses } from "../../Database/CourseCommands";
import { authOptions } from "../api/auth/[...nextauth]";

export default function CourseHomePage({ courses }) {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Courses
        </Typography>
      </Grid>
      {courses.map((data, index) => {
        return (
          <Grid xs={12} md={6} key={index}>
            <CourseCard data={data} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export const getServerSideProps = async (context) => {
  const courses = await getAllCourses();
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
      courses,
    },
  };
};
