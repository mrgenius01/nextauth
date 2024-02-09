import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "login",
      name: "Login",
      type: "credentials",
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:8080/v1/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
    CredentialsProvider({
      id: "register",
      name: "Register",
      type: "credentials",
      async authorize(credentials) {
        try {
          const res = await fetch("http://localhost:8080/v1/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(param) {
      // console.log("signIn CALLBACK");
      // console.log(param);
      // console.log("signIn CALLBACK");
      if (param.user) return true;

      return false;
    },
    async session({ session, token, user }) {
      // console.log("session CALLBACK");
      // console.log(session);
      // console.log(token);
      // console.log(user);
      // console.log("session CALLBACK");
      session.user.isLoggedIn = true;
      session.user = token;

      return session;
    },
    async jwt({ token, user }) {
      // console.log("JWT CALLBACK");
      // console.log(token);
      // console.log(user);
      // console.log("JWT CALLBACK");

      return { ...token, ...user };
    },
  },
  secret: "your-secret-key-here",
});
