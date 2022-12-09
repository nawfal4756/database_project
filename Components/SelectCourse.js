import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SelectCourse({ index, HandleCourseChange, courses }) {
  const [selectedData, setSelectedData] = useState("");
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   async function getCourses() {
  //     const response = await axios.get("/api/course");
  //     setCourses(response.data.courses);
  //   }

  //   getCourses();
  // }, []);

  const HandleChange = (event, newValue) => {
    setSelectedData(newValue);
    HandleCourseChange(index, newValue.course_code);
  };

  return (
    <Autocomplete
      disablePortal
      options={courses}
      getOptionLabel={(option) => option.course_name}
      isOptionEqualToValue={(value) => value.course_code}
      renderInput={(params) => <TextField {...params} />}
      onChange={HandleChange}
      onInputChange={HandleChange}
    />
  );
}
