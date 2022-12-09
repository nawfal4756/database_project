import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

export default function SelectFile({ index, HandleFileTypeChange }) {
  const types = [
    { value: "lecture", name: "Lecture" },
    { value: "quiz", name: "Quiz" },
    { value: "assignment", name: "Assignment" },
    { value: "mid", name: "Mid Exam" },
    { value: "final", name: "Final Exam" },
  ];
  const [selectedType, setSelectedType] = useState({});

  const HandleChange = (event, newValue) => {
    setSelectedType(newValue);
    HandleFileTypeChange(index, newValue.value);
  };

  return (
    <Autocomplete
      disablePortal
      options={types}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(value) => value.value}
      renderInput={(params) => <TextField {...params} />}
      onChange={HandleChange}
      onInputChange={HandleChange}
    />
  );
}
