"use client"

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Index = () => {
  const { data } = useSession()

  console.log('data', data)
  return (
    <div>
      로그인 완료
    </div>
  )
}

export default Index