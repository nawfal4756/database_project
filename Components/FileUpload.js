import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Select,
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
import { useState } from "react";
import SelectCampus from "./SelectCampus";
import SelectCourse from "./SelectCourse";
import SelectFile from "./SelectFile";
import SelectSemester from "./SelectSemester";

export default function FileUpload({ open, files, courses, campuses }) {
  const filesArray = [];
  const { data: session } = useSession();
  const [anonymous, setAnonymous] = useState(false);
  const [showStudent, setShowStudent] = useState(true);
  const [showTeacher, setShowTeacher] = useState(true);

  Object.keys(files).forEach((value, index) => {
    filesArray.push({
      file: files[value],
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
    filesArray[index].type = value;
  };

  const HandleCourseChange = (index, value) => {
    filesArray[index].course = value;
  };

  const HandleCampusChange = (index, value) => {
    filesArray[index].campus = value;
  };

  const HandleSemesterYearChange = (index, value) => {
    filesArray[index].semester = value.semester;
    filesArray[index].year = value.year;
  };

  const HandleSubmit = async () => {
    const form = new FormData();
    form.append("files", files);
    form.append("filesArray", filesArray);
    form.append("anonymous", anonymous);
    form.append("showStudent", showStudent);
    form.append("showTeacher", showTeacher);

    for (let keys in form.entries()) {
      console.log(keys[0] + " = " + keys[1]);
    }

    const response = await axios.post("/api/upload", form);
    console.log(response);
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
                      <TableCell>{item.file.name}</TableCell>
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
