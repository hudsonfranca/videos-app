import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  comment: Yup.string().required(),
  parentId: Yup.string()
})

interface Props {
  videoId: string
  parentId?: string
  onCancel?: () => void
}

export const CommentInputBox: React.FC<Props> = ({
  parentId,
  videoId,
  onCancel
}) => {
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
      comment: '',
      parentId: ''
    },
    validationSchema,
    onSubmit: async values => {
      // try {
      //    await api.post('/auth/login', {
      //     email: values.email,
      //     password: values.password
      //   })
      //   router.reload()
      // } catch (error) {
      //   console.error(error)
      //   notifyError()
      // }
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
            <Form.Control.Feedback type="invalid">
              {errors.comment}
            </Form.Control.Feedback>
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
              onCancel()
            }}
          >
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
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
