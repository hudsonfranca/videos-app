import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import api from '../services/api'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'
import { CurrentUser } from '../utils/types'

export const Header: React.FC = () => {
  const [user, setUser] = useState<CurrentUser>()
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  const logout = async () => {
    try {
      await api.get('/auth/logout')
      router.reload()
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const currentUser = async () => {
      try {
        const { data } = await api.get<CurrentUser>('/auth/user')
        if (data) setUser(data)
      } catch (error) {
        console.error(error)
      }
    }
    currentUser()
  }, [])
  return (
    <Navbar
      bg="light"
      variant="light"
      fixed="top"
      expand="sm"
      className={styles.header}
    >
      <Navbar.Brand
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      >
        Videos App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className={styles.nav_form}>
          <Form
            inline
            onSubmit={e => {
              e.preventDefault()
              if (searchValue !== '')
                router.push(`/search_video/${searchValue}`)
            }}
          >
            <FormControl
              type="text"
              placeholder="Pesquisar..."
              className="mr-sm-1"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button variant="light" type="submit">
              <img src="/search.svg" alt="search icon" />
            </Button>
          </Form>
        </Nav>
        <Nav className=" justify-content-end">
          {!user && (
            <>
              <Nav.Link onClick={() => router.push('/login')}>Login</Nav.Link>
              <Nav.Link onClick={() => router.push('/signup')}>
                Cadastre-se
              </Nav.Link>
            </>
          )}

          {user && (
            <>
              <Nav.Link onClick={() => router.push('/my_account')}>
                <img src={user.profilePicture} className={styles.avatar} />
              </Nav.Link>
              <Nav.Link onClick={logout} className="d-flex align-items-center">
                Sair
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
