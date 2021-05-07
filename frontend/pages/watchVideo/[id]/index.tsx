import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Container} from 'react-bootstrap'
import api from '../../../services/api'
import styles from '../../../styles/WatchVideo.module.css'
import {VideoByID} from '../../../utils/types'
import Head from 'next/head'
import { ReactVideo } from "reactjs-media";
import {VideoCard} from '../../../components/VideoCard'
import { useRouter } from 'next/router'


 const WatchVideo = ({ video,recommendations }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()

  return (
    <>
       <Head>
        <title>{video.name}</title>

      </Head>
    <Container className={styles.container} fluid >
    <div className={styles.video}>
    <ReactVideo
                src={video.url}
                poster={video.thumbnail}
                primaryColor="red"
                // other props
            />
            <p  className={styles.videoTitle}>{video.name}</p>
    </div>
    <div className={styles.recommendations}>
    {
         recommendations && recommendations.map(({name,thumbnail,id})=>(
           <VideoCard name={name} thumbnail={thumbnail} id={id} handleClick={()=>router.push(`/watchVideo/${id}`)}/>
         ))
       }
    </div>
    <div className={styles.comments}></div>

    </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const {data:video} = await api.get<VideoByID>(`/video/${context.params.id}`)
  const tags = video.videotags.map(({tag})=>tag)
  const {data:recommendations} = await api.get<VideoByID[]>(`/video`,{params:tags})


  return {
    props: {
      video,
      recommendations
    },
  }
}

export default WatchVideo
