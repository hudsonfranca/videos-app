import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '../services/api'
import { Container } from 'react-bootstrap'
import { VideoCard } from '../components/VideoCard'
import { Video } from '../utils/types'
import { useRouter } from 'next/router'

export default function Home() {
  const [videos, setVideos] = useState<Video[]>()

  const router = useRouter()

  useEffect(() => {
    const findVideos = async () => {
      const { data } = await api.get('/video/index/all')

      setVideos(data)
    }
    findVideos()
  }, [])

  return (
    <>
      <Head>
        <title>Videos App</title>
      </Head>
      <Container className={styles.container} fluid>
        {videos &&
          videos.map(({ name, thumbnail, id }) => (
            <VideoCard
              key={id}
              name={name}
              thumbnail={thumbnail}
              id={id}
              handleClick={() => router.push(`/watchVideo/${id}`)}
            />
          ))}
      </Container>
    </>
  )
}
