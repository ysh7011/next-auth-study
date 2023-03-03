import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    username: string
    password: string
    accessToken: string
  }
}