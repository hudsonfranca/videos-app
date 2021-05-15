import React, { useState, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import api from '../../../services/api'
import styles from '../../../styles/WatchVideo.module.css'
import { CommentById, VideoByID } from '../../../utils/types'
import Head from 'next/head'
import { VideoCard } from '../../../components/VideoCard'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'
import { CommentInputBox } from '../../../components/CommentInputBox'
import { CommentCard } from '../../../components/CommentCard'
import { LionPlayer } from 'lion-player'
import 'lion-player/dist/lion-skin.min.css'

const WatchVideo = ({
  video,
  recommendations
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [comments, setComents] = useState<CommentById[]>()

  const loadComments = async () => {
    try {
      const { data } = await api.get(`comment/video/${video.id}`)
      setComents(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadComments()
  }, [])

  return (
    <>
      <Head>
        <title>{video.name}</title>
      </Head>
      <Container className={styles.container} fluid>
        <div className={styles.video}>
          <LionPlayer
            sources={{ src: video.url }}
            autoplay="muted"
            language="pt"
            nativeControlsForTouch
            fluid
          />
          ,<p className={styles.videoTitle}>{video.name}</p>
        </div>
        <div className={styles.recommendations}>
          {recommendations &&
            recommendations.map(({ name, thumbnail, id }) => (
              <VideoCard
                key={id}
                name={name}
                thumbnail={thumbnail}
                id={id}
                handleClick={() => router.push(`/watchVideo/${id}`)}
              />
            ))}
        </div>
        <div className={styles.comments}>
          <CommentInputBox videoId={video.id} loadComments={loadComments} />
          {comments &&
            comments.map(comment => (
              <CommentCard
                comment={comment}
                key={comment.id}
                loadComments={loadComments}
              />
            ))}
        </div>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const { data: video } = await api.get<VideoByID>(
    `/video/${context.params.id}`
  )
  const tags = video.videotags.map(({ tag }) => tag)
  const { data: recommendations } = await api.get<VideoByID[]>(`/video`, {
    params: tags
  })

  return {
    props: {
      video,
      recommendations
    }
  }
}

export default WatchVideo
