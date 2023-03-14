"use client"

import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Lock from '@mui/icons-material/Lock'
import LockOpen from '@mui/icons-material/LockOpen'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import { useQuery } from '@tanstack/react-query'
import { globalToken } from '../core/token'

import CryptoJS from "crypto-js"



interface UserForm {
  userId: string
  userPwd: string
}

const Index = () => {
  /*
  [Page]
  Page Describe : login 페이지
  */

  const[showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const {
    control,
    watch,
    formState,
    register,
    handleSubmit,
    reset
  } = useForm<UserForm>({
    mode: 'all',
    defaultValues: {
      userId: '',
      userPwd: '',
    }
  })
  const { userId, userPwd } = watch()
  const [saveId, setSaveId] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveId(event.target.checked)
  }

  React.useEffect(() => {
    if(localStorage.getItem('userId2')) {
      setSaveId(true)
      reset({
        userId: JSON.parse(localStorage.getItem('userId2') as string)
      })
    }
  },[reset])
  

  const { errors } = formState

  const router = useRouter()
  const { status } = useSession()

  // 리액트 쿼리 정상 작동 확인함
  // const { refetch, data :loginData} = useQuery(['login_test'], async () => {
  //   console.log('=============자막상세정보 작동===============')
  //   const fetchData = await fetch(`/api/sttSubtitleStorage`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${globalToken.access_token}`,
  //       },
  //       // body: JSON.stringify({
  //       //   username: userId,
  //       //   password: userPwd,
  //       // })
  //     })
  //   const fetchDataJson = await fetchData.json()
  //   return fetchDataJson
  // },
  // {
  //   enabled : false
  // })

  // const { refetch, data :loginData, isSuccess} = useQuery(['login_test'], async () => {
  //   console.log('=============로그인 작동===============')
  //   const fetchData = await fetch(`/api/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: `username=${userId}&password=${userPwd}`,
  //   })
  //   const fetchDataJson = await fetchData.json()
  //   return fetchDataJson
  // },
  // {
  //   enabled : false
  // })

  // console.log('loginData', loginData)
  // console.log('isSuccess', isSuccess)

  const goToMember = handleSubmit(async () => {
    if(saveId) localStorage.setItem('userId2', JSON.stringify(userId))
    else if(!saveId) localStorage.removeItem('userId2')
    
    const result = await signIn("credentials", {
      redirect : false, // 에러발생시 404로 이동하지 말고 제자리에 있게함
      username: userId,
      password: CryptoJS.AES.encrypt(JSON.stringify(userPwd), process.env.CRYPTO_SECRET_KEY as string).toString() //userPwd
    })

    console.log('result', result)

    if(result?.error) {
      alert('아이디와 비밀번호를 확인해주세요')
    }
  })

  React.useEffect(() => {
    if (status === "authenticated") router.push("/user")
  }, [router, status])

  
  return (
    <LoginWrapper>
      <LoginContainer>
        <Logo>
          <Image
            alt="Megastudy logo"
            src={require(`public/megastudy.png`)}
            width="45"
            height="45"
          />
          <p>Megastudy</p>
        </Logo>
        <Help>
          <p>계정이 필요한가요?</p>
          <p onClick={() => alert("유선으로 문의하세요")}>문의하기</p>
        </Help>
        <Controller 
          name="userId"
          control={control}
          rules={{
            required: "id는 필수 입니다",
            pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
          }}
          render={({ fieldState }) => (
            <TextField 
              error={Boolean(fieldState.error)}
              label="아이디(이메일)을 입력해 주십시오."
              variant="outlined"
              {...register('userId')}
              fullWidth
              helperText={(
                <Box
                  component="span"
                  visibility={fieldState.error ? "visible" : "hidden"}
                >
                  <span>
                    {fieldState.error?.message}
                  </span>
                </Box>
              )}
            />
          )}
        />
        <Controller 
          name="userPwd"
          control={control}
          rules={{
            required: "비밀번호는 필수 입니다",
          }}
          render={({ fieldState }) => (
            <TextField 
              error={Boolean(fieldState.error)}
              label="비밀번호를 입력해 주십시오."
              variant="outlined"
              {...register('userPwd')}
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <LockOpen /> : <Lock />}
                  </IconButton>
                )
              }}
            />
          )}
        />
        <LoginFooter>
          <div className="save-id">
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={saveId} 
                  onChange={handleChange}
                />
              } 
              label="아이디 저장" 
            />
          </div>
          <p onClick={() => alert("유선으로 문의하세요")}>비밀번호 찾기</p>
        </LoginFooter>
        <Button
          variant="contained"
          size="large"
          sx={{mt: 3}}
          fullWidth
          onClick={goToMember}
          color="info"
        >
          로그인
        </Button>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Index

const LoginWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginContainer = styled.div`
  width: 500px;
  height: 450px;
  padding: 25px;
  border: 1px solid #d9d9d9;
`
const Logo = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  > P {
    font-size: 23px;
  }
`
const Help = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 10px;

  > P:first-child {
    color: #8C8C8C;
  }
  > P:last-child {
    color: #59B0F6;
    cursor: pointer;
  }
`
const LoginFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  > P:last-child {
    color: #59B0F6;
    cursor: pointer;
    text-decoration: underline;
    align-self: center;
  }
`