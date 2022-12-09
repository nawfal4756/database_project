import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectSemester({ index, HandleSemesterYearChange }) {
  const years = [
    2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
    2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000,
  ];
  const [semester, setSemester] = useState("fall");
  const [year, setYear] = useState(2022);

  useEffect(() => {
    function updateSemesterYear() {
      HandleSemesterYearChange(index, { semester, year });
    }

    updateSemesterYear();
  }, [semester, year]);

  const HandleSemesterChange = (event) => {
    setSemester(event.target.value);
  };

  const HandleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <Select value={semester} onChange={HandleSemesterChange}>
        <MenuItem value="fall">Fall</MenuItem>
        <MenuItem value="spring">Spring</MenuItem>
        <MenuItem value="summer">Summer</MenuItem>
      </Select>

      <Select value={year} onChange={HandleYearChange}>
        {years.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
