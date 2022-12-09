import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export default function DocumentCard({ data }) {
  const { id, name, type, semester } = data;
  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="h5">{type}</Typography>
          <Typography variant="P" sx={{ textAlign: "right", color: "gray" }}>
            {semester}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Document</Button>
        </CardActions>
      </Card>
    </div>
  );
}
