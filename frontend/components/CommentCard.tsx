import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import api from '../services/api'
import styles from '../styles/CommentCard.module.css'
import { CommentById, CurrentUser } from '../utils/types'
import { CommentInputBox } from './CommentInputBox'

interface Props {
  commentById: CommentById
  isRoot: boolean
  loadComments?: () => void
}

export const CommentCard: React.FC<Props> = ({
  commentById,
  isRoot,
  loadComments
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false)

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

  const onCancel = () => {
    setShowCommentBox(false)
  }

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/comment/${id}`)
      loadComments()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={isRoot ? styles.card : styles.card_child}>
      <img
        className={isRoot ? styles.avatar : styles.avatar_child}
        src={commentById.user.profilePicture}
        alt="avatar"
      />
      <strong>{commentById.user.username}</strong>
      <p className={styles.comment}>
        <span>{commentById.parent?.user.username}</span>
        {commentById.comment}
      </p>
      <div className={styles.buttons_container}>
        <p onClick={() => setShowCommentBox(true)}> Responder</p>
        {user && commentById.user.id === user.id && (
          <img
            className={isRoot ? styles.avatar : styles.avatar_child}
            src="/delete.svg"
            alt="deletar comentário"
            onClick={() => handleDelete(commentById.id)}
          />
        )}
      </div>
      <div className={styles.reply_form}>
        {showCommentBox && (
          <CommentInputBox
            videoId={commentById.video.id}
            onCancel={onCancel}
            parentId={commentById.id}
            loadComments={loadComments}
          />
        )}
      </div>
    </div>
  )
}
