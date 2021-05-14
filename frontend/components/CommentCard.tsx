import React, { useState, useEffect } from 'react'
import api from '../services/api'
import styles from '../styles/CommentCard.module.css'
import { CommentById, CurrentUser } from '../utils/types'

interface Props {
  comment: CommentById
  loadComments?: () => void
}

export const CommentCard: React.FC<Props> = ({ comment, loadComments }) => {
  const [user, setUser] = useState<CurrentUser>()

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { data } = await api.get<CurrentUser>('/auth/user')
        if (data) setUser(data)
      } catch (error) {
        console.error(error)
      }
    }
    currentUser()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/comment/${id}`)
      loadComments()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.card}>
      <img
        className={styles.avatar}
        src={comment.user.profilePicture}
        alt="avatar"
      />
      <strong>{comment.user.username}</strong>
      <p className={styles.comment}>{comment.comment}</p>
      <div className={styles.delete_button}>
        {user && comment.user.id === user.id && (
          <img
            className={styles.avatar}
            src="/delete.svg"
            alt="deletar comentário"
            onClick={() => handleDelete(comment.id)}
          />
        )}
      </div>
    </div>
  )
}
