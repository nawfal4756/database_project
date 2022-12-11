import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import { defaults } from "../../../lib/default";
import { authOptions } from "../../api/auth/[...nextauth]";

export default function AdminDocumentVerifyPage({ documents }) {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Document Name
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Course
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Campus
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Semester
              </TableCell>
              <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.type}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.course_code}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.campus_id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.semester}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Link href={`/admin/document/${item.document_id}`}>
                      <Button variant="contained" sx={{ mx: 1 }}>
                        View
                      </Button>
                    </Link>
                    <Link href={`/api/admin/verify/${item.document_id}`}>
                      <Button variant="contained">Verify</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const response = await axios(`${defaults.link}/document?&verified=false`);
  const documents = response.data;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  if (session) {
    if (!session.verified) {
      return {
        redirect: {
          destination: "/signup",
        },
      };
      // } else if (session.type != "admin") {
      //   return {
      //     redirect: {
      //       destination: "/",
      //     },
      //   };
    }
  }

  return {
    props: {
      documents,
    },
  };
};
