import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function CourseCard({ data }) {
  const { course_code, course_name } = data;
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h3">{course_name}</Typography>
        </CardContent>
        <CardActions>
          <Link href={`/course/${course_code}`}>
            <Button size="small" sx={{ color: "black" }} variant="outlined">
              View Course
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
