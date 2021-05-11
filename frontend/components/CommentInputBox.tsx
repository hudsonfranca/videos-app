import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import api from '../services/api'

const validationSchema = Yup.object({
  comment: Yup.string().required()
})

interface Props {
  videoId: string
  parentId?: string
  onCancel?: () => void
  loadComments?: () => void
}

export const CommentInputBox: React.FC<Props> = ({
  parentId,
  videoId,
  onCancel,
  loadComments
}) => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const currentUser = async () => {
      try {
        const user = await api.get('/auth/user')
        if (user) setUser(true)
      } catch (error) {
        console.error(error)
      }
    }
    currentUser()
  }, [])
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    resetForm,
    isSubmitting
  } = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await api.post(`/comment/video/${videoId}`, {
          comment: values.comment,
          parentId
        })
        resetForm()
        loadComments()
      } catch (error) {
        console.error(error)
      }
    }
  })

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              isInvalid={!!errors.comment}
              value={values.comment}
              onChange={handleChange}
              isValid={touched.comment && !errors.comment}
              placeholder="Adicione um comentario público..."
              name="comment"
              onBlur={handleBlur}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            variant="secondary"
            style={{ marginRight: '6px' }}
            onClick={() => {
              resetForm()
              if (onCancel) onCancel()
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || !user}
          >
            {isSubmitting && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {isSubmitting ? '  ...' : 'Comentar'}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
