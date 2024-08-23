import user from "@/models/userModal";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import mongoDb from "@/utils/dbConn";
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        await mongoDb();
        const user = await user.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        const response = {
          id: user._id,
          email: user.email,
          //   name: user.name,
          //   isAdmin: user.isAdmin,
          //   room: user.room,
          //   hostel: user.hostel,
        };

        return response;
      },
    }),
  ],
  // settings the session

  session: {
    strategy: "jwt",
  },
  // making the callback
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          email: token.email,
          //   isAdmin: token.isAdmin,
          //   room: token.room,
          //   hostel: token.hostel,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        // token.isAdmin = user.isAdmin;
        // token.room = user.room;
        // token.hostel = user.hostel;
      }
      return token;
    },
  },
  secret: "abc",
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
