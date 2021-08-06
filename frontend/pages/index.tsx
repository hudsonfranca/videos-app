import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import api from '../services/api'
import { Container } from 'react-bootstrap'
import { VideoCard } from '../components/VideoCard'
import { Video } from '../utils/types'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'

export default function Home({
  videos
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

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

export async function getServerSideProps(context) {
  const { data: videos } = await api().get<Video[]>('/video/index/all')

  return {
    props: {
      videos
    }
  }
}
