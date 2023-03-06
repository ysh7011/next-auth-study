"use client"

import React from 'react'
import { useSession } from "next-auth/react"
import Header from '../components/Header'

const Index = () => {
  const { data: session, status } = useSession()

  console.log('session', session)
  console.log('status', status)

  return (
    <div>
      <Header/>
      <div>로그인 완료</div>
    </div>
  )
}

export default Index