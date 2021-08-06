import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from '../styles/Card.module.css'

interface Props {
  thumbnail: string
  name: string
  id: string
  handleClick(): void
  handleDelete?: () => Promise<void>
  deleteButton?: boolean
}

export const VideoCard: React.FC<Props> = ({
  name,
  thumbnail,
  id,
  handleClick,
  deleteButton,
  handleDelete
}) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <div className={styles.card}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar video</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que você deseja deletar este video?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await handleDelete()
              handleClose()
            }}
          >
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          backgroundImage: `url(${thumbnail})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover'
        }}
        className={styles.image}
        onClick={handleClick}
      />
      <p style={{ padding: '5px' }}>{name}</p>
      {deleteButton && (
        <Button
          variant="danger"
          block
          className={styles.delete_button}
          onClick={() => handleShow()}
        >
          <img src="/delete.svg" alt="deletar comentário" />
        </Button>
      )}
    </div>
  )
}
