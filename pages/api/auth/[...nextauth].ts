import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import * as jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"

const SECRET_KEY = process.env.SECRET_KEY as string

interface AccessDecoded {
  exp: number
  sub: string,
  totp: boolean
}

interface RefreshDecoded {
  exp: number
  sub: string,
  refresh: boolean
}

let access_decode: AccessDecoded
let refresh_decode: RefreshDecoded

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

    access_decode = jwt.verify(fetchDataJson.access_token, SECRET_KEY)
    refresh_decode = jwt.verify(fetchDataJson.refresh_token, SECRET_KEY)
    console.log('리플래쉬')

    return {
      ...token,
      access_token: fetchDataJson.access_token,
      refresh_token: fetchDataJson.refresh_token ?? token.refresh_token, // Fall back to old refresh token
      exp: access_decode.exp,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}




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
          body: `username=${username}&password=${JSON.parse(CryptoJS.AES.decrypt(password, process.env.CRYPTO_SECRET_KEY as string).toString(CryptoJS.enc.Utf8))}`,
        })
        const fetchDataJson = await fetchData.json()
        if(fetchData.ok && fetchDataJson) {
          access_decode = jwt.verify(fetchDataJson.access_token, SECRET_KEY)
          refresh_decode = jwt.verify(fetchDataJson.refresh_token, SECRET_KEY)
          console.log('access_decode', access_decode)
          console.log('만료시간', new Date(access_decode.exp * 1000))

          return fetchDataJson
        } else {
          // throw new Error("nnnnnnnn")
          return null
        }
      }
    })

  ],
  secret: process.env.SECRET_KEY,

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // const isAllowedToSignIn = true
    //   // if (isAllowedToSignIn) {
    //   //   console.log('credentials', credentials)
    //   //   temp = credentials
    //   //   return true
    //   // } else {
    //   //   return false
    //   // }
    //   console.log('credentials', credentials)
    //   // temp = credentials
    //   return true
    // },
    async jwt({ token, user }) {

      //1. 처음 로그인한 경우 => 여기는 로그인 이후에는 루프를 돌지 않음
      if (user) {
        console.log('========처음 로그인=======')
        console.log('먼저 token 값', token)
        console.log('user의 값', user) // user 는 서버에서 받은토큰들

        let user_token = JSON.parse(JSON.stringify(user)) // 타입 에러 때문에 깊은복사 이용하여 access_token 꺼냄
        token.access_token = user_token.access_token
        token.refresh_token = user_token.refresh_token
        token.exp = access_decode.exp // 액세스 토큰 만료시간
        console.log('정보를 추가한 token 값', token)
        return token
      }

      
      // //번외. 로그인 이후 다른탭에서 refresh 시간을 초과하고 돌아오는 경우
      // if(new Date() > new Date(refresh_decode.exp * 1000)) return null
      
      //2.
      // 로그인 이후 access 시간을 초과하지 않는 경우
      if(new Date() < new Date(access_decode.exp * 1000)) {
        console.log('현재시간',  new Date())
        console.log('액세스 만료시간',  new Date(access_decode.exp * 1000))
        console.log('로그인 중인데 user는??', user)
        return token
      } 
      // 로그인 이후 acess 시간을 초과한 경우
      else if(new Date() < new Date(refresh_decode.exp * 1000)) {
        return refreshAccessToken(token)
      }
      // 로그인 이후 refresh 시간을 초과한 경우
      else return null

      // //3. 이미 access token이 만료된 경우
      // return refreshAccessToken(token)
    },
    async session({ session, token }: {session: any, token: any}) {
      session.access_token = token.access_token
      session.refresh_token = token.refresh_token
      session.exp = token.exp
      console.log('최종 token', token)
      console.log('session의 값', session)
      return session
    },
  },

  pages: {
    signIn: "/login"
  }
}

export default NextAuth(authOptions)
