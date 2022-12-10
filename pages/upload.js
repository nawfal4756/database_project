import { Typography, Button } from "@mui/material";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FileUpload from "../Components/FileUpload";
import { getAllCourses } from "../Database/CourseCommands";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Upload({ courses }) {
  const { data: session } = useSession({ required: true });
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const HandleFileChange = (event) => {
    setFiles(event.target.files);
    setOpenDialog(true);
  };

  return (
    <div>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Upload
      </Typography>
      <Button variant="outlined" component="label" sx={{ alignSelf: "center" }}>
        Upload Files
        <input
          type="file"
          hidden
          multiple
          accept=".txt, .pdf, .docx"
          onChange={HandleFileChange}
        />
      </Button>
      <FileUpload open={openDialog} files={files} courses={courses} />
    </div>
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

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {
      courses,
    },
  };
};
