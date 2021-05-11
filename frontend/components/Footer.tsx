import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../styles/Footer.module.css'

export const Footer: React.FC = () => {
  return (
    <Container fluid className={`p-0 ${styles.footer}`}>
      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          © 2020 Copyright:
          <a className="text-dark" href="#">
            VideosApp.com
          </a>
        </div>
      </footer>
    </Container>
  )
}
