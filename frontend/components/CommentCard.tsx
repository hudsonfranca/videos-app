import React, { useState } from 'react'
import styles from '../styles/CommentCard.module.css'
import { CommentById } from '../utils/types'
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

  const onCancel = () => {
    setShowCommentBox(false)
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
      <div
        className={styles.reply_button}
        onClick={() => setShowCommentBox(true)}
      >
        Responder
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
