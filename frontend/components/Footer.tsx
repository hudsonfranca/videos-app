import React from 'react'
import { Container } from 'react-bootstrap'
import styles from '../styles/Footer.module.css'
import { useRouter } from 'next/router'

export const Footer: React.FC = () => {
  const router = useRouter()
  return (
    <Container fluid className={`p-0 ${styles.footer} mt-2`}>
      <footer className="bg-light  text-lg-start d-flex justify-content-center">
        <div className=" p-3">
          <strong onClick={() => router.push(`/`)} className={styles.url}>
            www.videosapp.ml
          </strong>
        </div>
      </footer>
    </Container>
  )
}
