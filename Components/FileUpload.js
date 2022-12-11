import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import SelectCampus from "./SelectCampus";
import SelectCourse from "./SelectCourse";
import SelectFile from "./SelectFile";
import SelectSemester from "./SelectSemester";

export default function FileUpload({ open, files, courses, campuses }) {
  const filesArray = [];
  const dataArray = [];
  const { data: session } = useSession();
  const router = useRouter();
  const [anonymous, setAnonymous] = useState(false);
  const [showStudent, setShowStudent] = useState(true);
  const [showTeacher, setShowTeacher] = useState(true);

  Object.keys(files).forEach((value, index) => {
    filesArray.push(files[value]);

    dataArray.push({
      type: "",
      course: "",
      campus: "",
      semester: "",
      year: "",
    });
  });

  const HandleAnonymousChange = (event) => {
    setAnonymous(event.target.checked);
  };

  const HandleShowStudentChange = (event) => {
    setShowStudent(event.target.checked);
  };

  const HandleShowTeacherChange = (event) => {
    setShowTeacher(event.target.checked);
  };

  const HandleFileTypeChange = (index, value) => {
    dataArray[index].type = value;
    console.log(dataArray[index]);
  };

  const HandleCourseChange = (index, value) => {
    dataArray[index].course = value;
    console.log(dataArray[index]);
  };

  const HandleCampusChange = (index, value) => {
    dataArray[index].campus = value;
    console.log(dataArray[index]);
  };

  const HandleSemesterYearChange = (index, value) => {
    dataArray[index].semester = value.semester;
    dataArray[index].year = value.year;
    console.log(dataArray[index]);
  };

  const HandleSubmit = async () => {
    const form = new FormData();
    Array.from(files).forEach((file) => {
      form.append(file.name, file);
    });
    form.append("dataArray", JSON.stringify(dataArray));
    form.append("anonymous", anonymous);
    form.append("showStudent", showStudent);
    form.append("showTeacher", showTeacher);

    const config = {
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post("/api/upload", form, config);
    console.log(response);
    router.push("/");
  };

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogTitle>Upload Files</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>File Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Campus</TableCell>
                  <TableCell>Semester</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filesArray.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <SelectFile
                          index={index}
                          HandleFileTypeChange={HandleFileTypeChange}
                        />
                      </TableCell>
                      <TableCell>
                        <SelectCourse
                          index={index}
                          HandleCourseChange={HandleCourseChange}
                          courses={courses}
                        />
                      </TableCell>
                      <TableCell>
                        <SelectCampus
                          index={index}
                          HandleCampusChange={HandleCampusChange}
                          campuses={campuses}
                        />
                      </TableCell>
                      <TableCell>
                        <SelectSemester
                          index={index}
                          HandleSemesterYearChange={HandleSemesterYearChange}
                          campuses={campuses}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <FormControlLabel
            control={
              <Switch value={anonymous} onChange={HandleAnonymousChange} />
            }
            label="Anonymous"
          />
          {session?.type === "teacher" ? (
            <>
              <FormControlLabel
                control={
                  <Switch
                    value={showStudent}
                    onChange={HandleShowStudentChange}
                  />
                }
                label="Show Students"
              />
              <FormControlLabel
                control={
                  <Switch
                    value={showTeacher}
                    onChange={HandleShowTeacherChange}
                  />
                }
                label="Show Teachers"
              />
            </>
          ) : null}
          <Button variant="outlined" onClick={HandleSubmit}>
            Upload Files
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
