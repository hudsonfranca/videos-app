import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import styles from '../styles/MyAccount.module.css'
import VideoUpload from '../components/video_upload'
import UpdateUser from '../components/UpdateUser'

import UserVideos from '../components/UserVideos'

const MyAccount: React.FC = () => {
  const [value, setValue] = useState('')

  const loadPage = () => {
    if (value === 'add_video') {
      return <VideoUpload />
    } else if (value === 'my_videos') {
      return <UserVideos />
    } else {
      return <UpdateUser />
    }
  }
  return (
    <>
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="my_data"
        onSelect={eventKey => setValue(eventKey)}
        className={styles.nav}
      >
        <Nav.Item>
          <Nav.Link eventKey="my_data">Meus dados</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="my_videos">Meus videos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="add_video">Adicionar Video</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className={styles.container}>{loadPage()}</div>
    </>
  )
}

export default MyAccount
