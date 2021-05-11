import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { CommentInterface, CommentById } from '../utils/types'
import { CommentCard } from './CommentCard'
import styles from '../styles/Comment.module.css'

interface Props {
  comment: any
  type: string
  loadComments?: () => void
}

export const Comment: React.FC<Props> = ({ comment, type, loadComments }) => {
  const [commentById, setCommentById] = useState<CommentById>()
  const [isRootComment, setIsRootComment] = useState(false)

  useEffect(() => {
    const findComment = async () => {
      const { data } = await api.get(`/comment/${comment.id}`)
      if (!data.parent) {
        setIsRootComment(true)
      }
      setCommentById(data)
    }
    findComment()
  }, [])
  const nestedComments = (comment.children || []).map(comment => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        type="child"
        loadComments={loadComments}
      />
    )
  })

  return (
    <div>
      {commentById && (
        <CommentCard
          commentById={commentById}
          isRoot={isRootComment}
          loadComments={loadComments}
        />
      )}

      {nestedComments}
    </div>
  )
}
