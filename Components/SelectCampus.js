import { Autocomplete, TextField } from "@mui/material";

export default function SelectCampus({ index, HandleCampusChange, campuses }) {
  const HandleChange = (event, newValue) => {
    HandleCampusChange(index, newValue.campus_id);
  };

  return (
    <Autocomplete
      disablePortal
      options={campuses}
      getOptionLabel={(option) => option.campus_name}
      isOptionEqualToValue={(value) => value.campus_id}
      renderInput={(params) => <TextField {...params} />}
      onChange={HandleChange}
      onInputChange={HandleChange}
    />
  );
}
