import React from 'react'
import {Card} from 'react-bootstrap'
import styles from '../styles/Card.module.css'

interface Props {
  thumbnail:string,
  name:string,
  id:string,
  handleClick():void
}

export const VideoCard:React.FC<Props> = ({name,thumbnail,id,handleClick}) => {


  return (
    <Card className={styles.card} onClick={handleClick}>
  <Card.Img variant="top" src={`${thumbnail}`} />
  <Card.Body>
    <Card.Title>{name}</Card.Title>
  </Card.Body>
</Card>
  )
}


