import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { getAdminByEmail } from "../../../Database/AdminCommands";
import { getStudentByEmail } from "../../../Database/StudentCommands";
import MySQLAdapter from "../../../lib/MySQLAdapter";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MySQLAdapter(),
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
    newUser: "/signup",
  },
  callbacks: {
    async session({ session, user, token }) {
      const email = user.email;
      const admin = await getAdminByEmail(email);
      let type = "";
      let verified = false;
      let added = true;

      if (admin.length > 0) {
        type = "admin";
        verified = admin[0].basicForm;
      } else if (email[1] >= 0 && email[1] <= 9) {
        type = "student";

        const student = await getStudentByEmail(email);

        if (student.length > 0) {
          verified = student[0].basicForm;
        } else {
          added = false;
        }
      } else {
        type = "teacher";

        const teacher = await getStudentByEmail(email);

        if (teacher.length > 0) {
          verified = teacher[0].basicForm;
        } else {
          added = false;
        }
      }

      return { ...session, type, verified, added };
    },
  },
};

export default NextAuth(authOptions);
