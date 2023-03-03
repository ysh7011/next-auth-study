import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
  providers: [
    // 인증 방식 선택 ( 현재는 "id" + "password" )
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      // 로그인 유효성 검사
      authorize: async (credentials) => {
        const { username, password } = credentials as any
        const fetchData = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
        const fetchDataJson = await fetchData.json()
        if(fetchData.ok && fetchDataJson) {
          return fetchDataJson
        } else return null
      }
    })

  ],

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: {session: any, token: any}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },

  pages: {
    signIn: "/login"
  }
}

export default NextAuth(authOptions)
