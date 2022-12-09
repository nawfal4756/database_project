import { Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FileUpload from "../Components/FileUpload";

export default function Upload() {
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
      <FileUpload open={openDialog} files={files} />
    </div>
  );
}
