import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

const refreshAccessToken = async (token: any) => {
  try {
    const fetchData = await fetch("http://101.101.218.154:81/api/v1/login/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token.refresh_token}`,
      },
    })
    const fetchDataJson = await fetchData.json()

    if (!fetchData.ok) {
      throw fetchDataJson
    }

    return {
      ...token,
      accessToken: fetchDataJson.access_token,
      accessTokenExpires: Date.now() + fetchDataJson.exp * 1000,
      refreshToken: fetchDataJson.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

let temp: any

export const authOptions: NextAuthOptions = {
  providers: [
    // 인증 방식 선택 ( 현재는 "id" + "password" )
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      // 로그인 유효성 검사
      authorize: async (credentials, req) => {
        const { username, password } = credentials as any
        // console.log('req', req)
        const fetchData = await fetch("http://101.101.218.154:81/api/v1/login/oauth", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `username=${username}&password=${password}`,
        })
        const fetchDataJson = await fetchData.json()
        if(fetchData.ok && fetchDataJson) {
          return fetchDataJson
        } else {
          // throw new Error("nnnnnnnn")
          return null
        }
      }
    })

  ],
  secret: process.env.SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        console.log('credentials', credentials)
        temp = credentials
        return true
      } else {
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        console.log('user의 값', user)
        token.accessToken = user
        console.log('먼저 token 값', token)
        // console.log('account?.access_token',account?.access_token)
      }

      return token
    },
    async session({ session, token }: {session: any, token: any}) {
      session.accessToken = token.accessToken.access_token
      session.token = token.accessToken
      session.name2 = "ssssss"
      // session.expires= "2023-03-05T10:26:30.863Z"
      session.temp = temp

      console.log('token 값', token)
      console.log('session의 값', session)
      return session
    },
  },

  pages: {
    signIn: "/login"
  }
}

export default NextAuth(authOptions)
