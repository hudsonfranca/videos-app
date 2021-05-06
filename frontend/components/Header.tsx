import React ,{useEffect,useState}from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import api from '../services/api'
import { useRouter } from 'next/router'


export const Header:React.FC = () => {
  const [user,setUser] = useState(false)
  const router = useRouter()


  const logout = async ()=>{
    try {
       await api.get("/auth/logout");
       router.reload()

     } catch (error) {
       console.error(error)
     }
  }
useEffect(()=>{
 const currentUser =async ()=>{
   try {
    const user = await api.get("/auth/user");
    if(user) setUser(true);
   } catch (error) {
     console.error(error)
   }

 };
  currentUser();
},[])
  return (
    <Container fluid className="vh-100 p-0 m-0 position-fixed">
    <Navbar bg="dark" variant="dark" className="d-flex w-100 ">
    <Navbar.Brand href="#home" className="flex-grow-1">Videos App</Navbar.Brand>


    <Nav className="mr-auto ">
      {
        !user &&(<> <Nav.Link onClick={()=>router.push('/login')}>Login</Nav.Link>  <Nav.Link onClick={()=>router.push('/signup')}>Cadastre-se</Nav.Link></>)
      }

      {
        user && (<Nav.Link onClick={logout}>Sair</Nav.Link>)
      }

    </Nav>

  </Navbar>
  </Container>
  )
}
