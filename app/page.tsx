"use client"

import React from 'react'
import styled from 'styled-components'
import Footer from './components/Footer'
import Header from './components/Header'
import Image from "next/image"
import Button from '@mui/material/Button'
import CallIcon from '@mui/icons-material/Call'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider  from '@mui/material/Divider'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Wrapper>
      <Header/>
      <MainContainer>
        <button onClick={() => router.push('/member')}>member 이동 // 임시</button>
        <div className="main-title">
          <span>AI Leader, MEGASTUDY</span>
          <Image
            alt="Megastudy logo"
            src={require(`public/mega_white.png`)}
          />
        </div>
        <div className="main-content">
          <Image
            alt="start"
            src={require(`public/start.png`)}
          />
          <MainTextArea>
            <div className="content-top">
              <p>앞서가는 AI에듀테크,</p>
              <p>메가스터디교육</p>
            </div>
            <div className="content-middle">
              <p>AI음성인식, 음성합성, 검색솔루션</p>
              <p>메가스터디교육은 고객이 AI를 통해</p>
              <p>보다 높은 가치를 만들 수 있도록 돕습니다.</p>
            </div>
            <Button 
              variant="contained" 
              color="info" 
              startIcon={<CallIcon />} 
              className="call-btn"
              size="large"
              onClick={handleClickOpen}
            >
              서비스 문의하기
            </Button>
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                유선으로 문의바랍니다.
              </DialogTitle>
              <Divider/>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{fontFamily: "Roboto"}}>
                  Tel. 02-123-4567
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  확인
                </Button>
              </DialogActions>
            </Dialog>
          </MainTextArea>
        </div>
      </MainContainer>
      <Footer/>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
`
const MainContainer = styled.div`
  flex: 1;
  padding: 40px 30px;

  .main-title {
    margin-bottom: 24px;
    height: 144px;
    background: #42A5F5;
    border-radius: 12px;
    font-size: 32px;
    color: white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      margin-right: 10px;
    }
  }

  

  .main-content {
    display: flex;
  }

`

const MainTextArea = styled.div`
  margin-left: 60px;

  .content-top {
    font-size: 46px;
    font-weight: 700;
    font-family: Roboto;
    margin-bottom: 16px;
  }

  .content-middle {
    font-size: 20px;
    margin-bottom: 32px;

    > p {
      color: #676767;
    }
    
    > p:first-child {
      color: #2196F3;
    }
  }

  .call-btn {
    color: white;
    border-radius: 20px;
  }
`