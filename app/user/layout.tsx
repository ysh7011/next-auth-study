"use client"

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter, usePathname } from 'next/navigation'




const UserLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const { data: session } = useSession()

  const router = useRouter()
  const pathName = usePathname()

  // 로그인이 안되어있으면 로그인 페이지로 이동
  React.useEffect(() => {
    if(session === null) {
      if(pathName !== "/login" && pathName !== "/") {
        router.replace("/login")
      }
    }
  },[session, pathName, router])

  return (
    <>
      {children}
    </>
  )
}


export default UserLayout