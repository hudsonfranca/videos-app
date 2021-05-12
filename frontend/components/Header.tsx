import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import api from '../services/api'
import { useRouter } from 'next/router'
import styles from '../styles/Header.module.css'

export const Header: React.FC = () => {
  const [user, setUser] = useState(false)
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
        const user = await api.get('/auth/user')
        if (user) setUser(true)
      } catch (error) {
        console.error(error)
      }
    }
    currentUser()
  }, [])
  return (
    <Navbar bg="light" variant="light" fixed="top" className={styles.header}>
      <Navbar.Brand
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      >
        Videos App
      </Navbar.Brand>
      <Nav className="">
        <Form
          inline
          onSubmit={e => {
            e.preventDefault()
            if (searchValue !== '') router.push(`/search_video/${searchValue}`)
          }}
        >
          <FormControl
            type="text"
            placeholder="Pesquisar..."
            className="mr-sm-2"
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
            <Nav.Link onClick={() => router.push('/video_upload')}>
              Upload de video
            </Nav.Link>
            <Nav.Link onClick={logout}>Sair</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  )
}
