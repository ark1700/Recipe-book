import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { compare } from "bcryptjs";

interface ICredentials {
  username: string,
  email: string,
  password: string,
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        dbConnect().catch(error => {
          return {error: "Connection failed"}
        })
        const result = await User.findOne({email: credentials?.email})
        if(!result) {
          throw new Error("No user found with email. Please Sign Up")
        }
        const checkPassword = await compare(credentials?.password || '', result.password)
        if(!checkPassword || result.email !== credentials?.email) {
          throw new Error("Username of password dosen't match")
        }

        return result
      }
    }),
  ],
  secret: process.env.JWT,
}
export default NextAuth(authOptions)
