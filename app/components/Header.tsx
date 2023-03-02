import React from 'react'
import Image from "next/image"
import Logo from '../../public/megastudy.png'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Header = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = React.useState()
  React.useEffect(() => {
    setIsLogin(JSON.parse(localStorage.getItem('demo-login-success2') as string))
  },[])
  
  const doLogin = () => {
    router.push('/login')
  }
  const doLogout = () => {
    localStorage.removeItem('demo-login-success2')
    router.push('/')
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <div className="logo">
          <span>Megastudy</span>
          <Image
            alt="Megastudy logo"
            height="24"
            src={Logo}
            width="24"
          />
        </div>
      </Link>
      {/* <FontAwesomeIcon 
        icon={faCircleUser} 
        className="user-icon"
        onClick={doLogin}
      /> */}
      {isLogin ? (
        <div className="login-icon-area">
          <AccountCircleIcon/>
          <IconButton onClick={doLogout}>
            <LogoutIcon/>
          </IconButton>
        </div>
        ) : (
          <Button 
            variant="outlined"
            onClick={doLogin}
          >
            Sign In
          </Button>
        )
      }
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0.5rem 1rem;
  box-shadow: -3px 1px 4px 0px black;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  .logo {
    display: flex;
    gap: 10px;
  }

  .logo > img {
    align-self: center;
  }

  .logo > span {
    align-self: center;
    font-size: 21px;
    line-height: 1.75rem;
    font-weight: 600;
  }

  .user-icon {
    font-size: 22px;
    cursor: pointer;
  }

  .login-icon-area {
    display: flex;
    width: 80px;
    justify-content: space-around;

    > svg {
      align-self: center;
    }
  }
`