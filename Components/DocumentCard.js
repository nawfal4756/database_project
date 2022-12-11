import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import camelcase from "camelcase";

export default function DocumentCard({ data }) {
  const {
    document_id,
    document_type,
    document_date_semester,
    document_date_year,
    course_name,
    course_code,
  } = data;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4">
            {camelcase(document_type, { pascalCase: true })}
          </Typography>
          <Typography variant="h5">{course_name}</Typography>
          <Typography variant="P" sx={{ textAlign: "right", color: "gray" }}>
            {camelcase(document_date_semester, { pascalCase: true }) +
              " - " +
              document_date_year}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/document/${course_code + "-" + document_id}`}>
            <Button size="small" sx={{ color: "black" }} variant="outlined">
              View Document
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
