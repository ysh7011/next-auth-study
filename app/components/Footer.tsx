import React from 'react'

import styled from 'styled-components'
import Image from "next/image"
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const Footer = () => {

  const goFairTradePage = () => {
    window.open("https://www.ftc.go.kr/bizCommPop.do?wrkr_no=7808700034", "Child", "width=750, height=800, top=50, left=50" )
  }

  const goCertificate = () => {
    window.open("http://www.megastudy.net/Common/menu/pop_private.asp", "Child", "width=500, height=800, top=50, left=50" )
  }

  return (
    <FooterContainer>
      <Image
        alt="Megastudy logo"
        src={require(`public/mega_footer_logo.png`)}
      />
      <FooterContent>
        <p>06643 서울 서초구 효령로 321 (서초동, 덕원빌딩) 메가스터디교육(주)  대표이사 : 손성은  사업자등록번호 : 780-87-00034</p>
        <p>통신판매번호 : 2003-서울서초-03638 
          <Badge onClick={goFairTradePage}>정보조회 <ChevronRightIcon/> </Badge> 
          신고기관명 : 서울특별시 서초구 호스팅제공자 : (주)케이티
        </p>
        <p>학원설립·운영등록번호 : 제10176호 메가스터디원격학원 
          <Badge onClick={goCertificate}>정보조회 <ChevronRightIcon/> </Badge> 
          신고기관명 : 서울특별시 강남교육지원청
        </p>
        <p>학습지원센터 : 1599-1010(팩스:02-3489-8699)  개인정보보호책임자 : 정보보안(별정)실 오영석 (keeper@megastudy.net)</p>
        <p>copyrightⓒ2014 megastudyEdu.co.,Ltd. All rights reserved.</p>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  height: 240px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #DDDDDD;
  padding-top: 18px;
`

const FooterContent = styled.div`
  margin-left: 57px;
  color: #676767;

  > p {
    margin-bottom: 3px;
  }
`

const Badge = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 3px 6px;
  padding-right: 0;
  cursor: pointer;
  margin: 0 8px;

  svg {
    vertical-align: middle;
  }
`