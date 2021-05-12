import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Search_video.module.css'
import { Card, Container } from 'react-bootstrap'
import { VideoCard } from '../../../components/VideoCard'
import { Video } from '../../../utils/types'
import { useRouter } from 'next/router'
import api from '../../../services/api'
import { InferGetServerSidePropsType } from 'next'

export default function SearchVideo({
  videos
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Buscar video</title>
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
  const { data: videos } = await api.get<Video[]>(
    `/video/search/by_name?name=${context.params.name}`
  )

  return {
    props: {
      videos
    }
  }
}
