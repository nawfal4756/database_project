import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
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
  },
  callbacks: {
    async session({ session, user, token }) {
      const email = user.email;
      let type = "";
      if (email[1] >= 0 && email[1] <= 9) {
        type = "student";
      } else {
        type = "teacher";
      }

      return { ...session, type };
    },
  },
};

export default NextAuth(authOptions);
