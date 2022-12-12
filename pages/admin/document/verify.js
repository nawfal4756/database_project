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
import { useEffect, useState } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import camelcase from "camelcase";

export default function AdminDocumentVerifyPage() {
  const [documents, setDocuments] = useState([]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    async function getDocuments() {
      const response = await axios("/api/admin/document?verify=false");
      setDocuments(response.data.documents);
    }

    getDocuments();
  }, [date]);

  const HandleVerify = async (id) => {
    const response = await axios.post(`/api/admin/document`, { code: id });
    console.log(response);
    setDate(new Date());
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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
                    {camelcase(item.document_type, { pascalCase: true })}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.course_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.campus}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {camelcase(item.document_date_semester, {
                      pascalCase: true,
                    }) +
                      " - " +
                      item.document_date_year}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Link
                      href={`/document/${item.course_code}-${item.document_id}`}
                    >
                      <Button variant="contained" sx={{ mx: 1 }}>
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      onClick={() =>
                        HandleVerify(`${item.course_code}-${item.document_id}`)
                      }
                    >
                      Verify
                    </Button>
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
    } else if (session.type != "admin") {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  }

  return {
    props: {},
  };
};
