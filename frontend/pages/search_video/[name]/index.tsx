import React from 'react'
import Head from 'next/head'
import styles from '../../../styles/Search_video.module.css'
import { Container } from 'react-bootstrap'
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

      {videos.length ? (
        <Container className={styles.container} fluid>
          {videos.map(({ name, thumbnail, id }) => (
            <VideoCard
              key={id}
              name={name}
              thumbnail={thumbnail}
              id={id}
              handleClick={() => router.push(`/watchVideo/${id}`)}
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
