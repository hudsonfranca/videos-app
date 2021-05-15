import React, { useEffect } from 'react'
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Head from 'next/head'
import Link from 'next/link'
import api from '../services/api'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'

const validationSchema = Yup.object({
  email: Yup.string().email('email invalido').required('campo obrigatório'),
  password: Yup.string().required('campo obrigatório')
})

const Login: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const currentUser = async () => {
      try {
        await api.get('/auth/user')
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
    currentUser()
  }, [])

  const notifyError = () => {
    toast.error('Não foi possível efetuar o login')
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await api.post('/auth/login', {
          email: values.email,
          password: values.password
        })
        router.reload()
      } catch (error) {
        console.error(error)
        notifyError()
      }
    }
  })

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Container className="vh-100 p-0 m-0" fluid>
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
                  <h2>Login</h2>
                </Col>
              </Row>
              <Row>
                <Col>
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
                    {isSubmitting ? '  Login...' : 'Login'}
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="w-100 d-flex justify-content-center align-items-center ">
                    <strong className="mr-1">Não tem cadastro?</strong>
                    <strong>
                      <Link href="/signup">
                        <a> cadastre-se</a>
                      </Link>
                    </strong>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Login
