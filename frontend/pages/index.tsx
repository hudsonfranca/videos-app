import React,{useEffect,useState} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from 'next/app'
import api from '../services/api'


export default function Home() {
  const [videos,setVideos] = useState();

  useEffect(()=>{
    const findVideos = async()=>{
      const {data} = await api.get("/video/index/all")
      console.log(data)
      setVideos(data)
    }
    findVideos()
  },[])

  return (
    <>
     <Head>
        <title>Videos App</title>
      </Head>
      <Container className="vh-100 p-0 m-0" fluid>
        <h1>Oi</h1>
      </Container>
    </>
  )
}
