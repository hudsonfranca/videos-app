import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import api from '../services/api'

const validationSchema = Yup.object({
  comment: Yup.string().required()
})

interface Props {
  videoId: string
  loadComments?: () => void
}

export const CommentInputBox: React.FC<Props> = ({ videoId, loadComments }) => {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const currentUser = async () => {
      try {
        const user = await api().get('/auth/user')
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
    resetForm,
    isSubmitting
  } = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await api().post(`/comment/video/${videoId}`, {
          comment: values.comment
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
              value={values.comment}
              onChange={handleChange}
              placeholder={
                user
                  ? 'Adicione um comentario público...'
                  : 'Crie uma conta ou faça o login para comentar...'
              }
              name="comment"
              onBlur={handleBlur}
              disabled={isSubmitting || !user}
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
            }}
            disabled={isSubmitting || !user}
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
