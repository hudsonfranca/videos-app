import React from 'react'
import {Card} from 'react-bootstrap'
import styles from '../styles/Card.module.css'
import Image from 'next/image'

interface Props {
  thumbnail:string,
  name:string,
  id:string,
  handleClick():void
}

export const VideoCard:React.FC<Props> = ({name,thumbnail,id,handleClick}) => {


  return (
    <div className={styles.card} onClick={handleClick}>
          <div
            style={{backgroundImage:`url(${thumbnail})`,backgroundPosition:'center',backgroundRepeat:'repeat',backgroundSize:'cover'}}
           className={styles.image}
          />
        <p>{name}</p>
  </div>
  )
}


