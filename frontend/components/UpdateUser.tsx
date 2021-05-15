import React, { useEffect } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Head from 'next/head'
import api from '../services/api'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import { CurrentUser } from '../utils/types'

const validationSchema = Yup.object({
  username: Yup.string(),
  email: Yup.string().email('email invalido'),
  password: Yup.string(),
  profilePicture: Yup.mixed().test(
    'fileSize',
    'Escolha uma imagem que seja menor que 10MB',
    value => value && value.size <= 10 * 1048576
  )
})

const UpdateUser: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const currentUser = async () => {
      try {
        await api.get<CurrentUser>('/auth/user')
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }
    currentUser()
  }, [])

  const notifyError = () => {
    toast.error('Não foi possível atualizar a sua conta')
  }

  const notifySuccess = () => {
    toast.success('seus dados foram atualizados com sucesso')
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting,
    resetForm
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      profilePicture: null
    },
    validationSchema,
    onSubmit: async values => {
      const formData = new FormData()
      formData.append('username', values.username)
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('profilePicture', values.profilePicture)

      try {
        await api.patch('/user', formData)
        notifySuccess()
        resetForm()
      } catch (error) {
        console.error(error)
        notifyError()
      }
    }
  })

  return (
    <>
      <Head>
        <title>Atualizar dados</title>
      </Head>
      <Container className="vh-100 pe-5 p-0 m-0" fluid>
        <ToastContainer />

        <Row className="justify-content-center h-100 align-items-center ">
          <Col lg={5} md={8} sm={11}>
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="shadow-lg p-5 rounded-3 "
            >
              <Row className="m-4">
                <Col className="d-flex justify-content-center h-100 align-items-center mb-4">
                  <h2>Atualizar dados</h2>
                </Col>
              </Row>
              <Row>
                <Form.Group sm md as={Col}>
                  <Form.Label>Selecione uma foto de perfil</Form.Label>
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input
                      isInvalid={!!errors.profilePicture}
                      onChange={event => {
                        setFieldValue(
                          'profilePicture',
                          event.currentTarget.files[0]
                        )
                      }}
                      isValid={touched.profilePicture && !errors.profilePicture}
                      placeholder="Foto de perfil"
                      name="profilePicture"
                      onBlur={handleBlur}
                      accept="image/*"
                    />
                    <Form.File.Label data-browse="Buscar">
                      {values.profilePicture?.name}
                    </Form.File.Label>
                    <Form.Control.Feedback type="invalid">
                      {errors.profilePicture}
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.username}
                      value={values.username}
                      onChange={handleChange}
                      isValid={touched.username && !errors.username}
                      placeholder="Digite o seu nome"
                      name="username"
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.email}
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      type="email"
                      placeholder="Digite o seu email"
                      name="email"
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.password}
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      type="password"
                      placeholder="Digite a sua senha"
                      name="password"
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="pt-4 mb-3">
                  <Button
                    variant="primary"
                    type="submit"
                    block
                    disabled={isSubmitting}
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
                    {isSubmitting ? '  ...' : 'Atualizar'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UpdateUser
