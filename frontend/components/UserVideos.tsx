import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/UserVideos.module.css'
import { Container } from 'react-bootstrap'
import { VideoCard } from '../components/VideoCard'
import { Video } from '../utils/types'
import { useRouter } from 'next/router'
import api from '../services/api'

export default function UserVideos() {
  const [videos, setVideos] = useState<Video[]>()
  const router = useRouter()

  useEffect(() => {
    const currentUser = async () => {
      try {
        await api().get('/auth/user')
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }
    currentUser()
  }, [])

  const videosByUser = async () => {
    try {
      const { data } = await api().get<Video[]>('/video/search/by_user')
      if (data) setVideos(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    videosByUser()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await api().delete(`/video/${id}`)
      videosByUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Meus Videos</title>
      </Head>

      {videos && !!videos.length ? (
        <Container className={styles.container} fluid>
          {videos.map(({ name, thumbnail, id }) => (
            <VideoCard
              key={id}
              name={name}
              thumbnail={thumbnail}
              id={id}
              handleClick={() => router.push(`/watchVideo/${id}`)}
              deleteButton
              handleDelete={() => handleDelete(id)}
            />
          ))}
        </Container>
      ) : (
        <div className={styles.empty}>
          <p>Nenhum resultado encontrado</p>
        </div>
      )}
    </>
  )
}
