import User from "@/models/userModal";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import mongoDb from "@/utils/dbConn";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Basic validation for credentials
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Ensure database connection
        await mongoDb();

        try {
          // Find user by email
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("No user found with this email");
          }

          // Verify password
          const isPasswordValid = await bcryptjs.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Incorrect password");
          }

          // Return user data (as JWT payload)
          return {
            id: user._id,
            email: user.email,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT-based sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist user information to the token
      if (user) {
        token.email = user.email;
      }
      console.log("Token")
      console.log(token)
      return token;
    },
    async session({ session, token }) {
      // Attach token information to the session object
      if (token) {
        session.user = {
          email: token.email,
        };
      }
      console.log("Session")
      console.log(session)
      return session;
    },
    async jwt({ token, user }) {
      // Persist user information to the token
      if (user) {
        token.email = user.email;
      }
      console.log("Token")
      console.log(token)
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret", // Use environment variable for secret
  pages: {
    signIn: "/login", // Custom login page
  },
  //debug: process.env.NODE_ENV === "development", // Enable debug logs in development
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
