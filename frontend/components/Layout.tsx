import React from 'react'
import { Container } from 'react-bootstrap'
import {Header} from './Header'
import {Footer} from './Footer'



export const Layout:React.FC = ({children}) => {
  return (
    <>
    <Header/>
    <Container fluid className="vw-100 vh-100 p-0 m-0">
      {children}
    </Container>
    <Footer/>
    </>
  )
}
