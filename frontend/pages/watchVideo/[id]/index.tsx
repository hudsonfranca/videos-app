import React, { useState, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import api from '../../../services/api'
import styles from '../../../styles/WatchVideo.module.css'
import { VideoByID } from '../../../utils/types'
import Head from 'next/head'
import { ReactVideo } from 'reactjs-media'
import { VideoCard } from '../../../components/VideoCard'
import { useRouter } from 'next/router'
import { Comment } from '../../../components/Comment'
import { Container } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { CommentInputBox } from '../../../components/CommentInputBox'

const WatchVideo = ({
  video,
  recommendations
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  const [comments, setComents] = useState<any>()

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

  const notifyError = () => {
    toast.error('Não foi possível adicionar o seu comentario ao video.')
  }

  return (
    <>
      <Head>
        <title>{video.name}</title>
      </Head>
      <Container className={styles.container} fluid>
        <ToastContainer />

        <div className={styles.video}>
          <ReactVideo
            src={video.url}
            poster={video.thumbnail}
            primaryColor="red"
            // other props
          />
          <p className={styles.videoTitle}>{video.name}</p>
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
              <Comment
                key={comment.id}
                comment={comment}
                type="root"
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
