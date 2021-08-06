import React, { useState, useEffect } from 'react'
import styles from '../styles/VideoUpload.module.css'
import Head from 'next/head'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import api from '../services/api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

const IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
const VIDEO_FORMATS = ['video/mp4', 'video/webm']

const validationSchema = Yup.object({
  name: Yup.string().required('campo obrigatório'),
  thumbnail: Yup.mixed()
    .required('*campo obrigatório')
    .test(
      'fileSize',
      'Escolha uma imagem que seja menor que 10MB',
      value => value && value.size <= 10 * 1048576
    )
    .test(
      'fileFormat',
      'Formato inválido, formatos aceitos: jpg, jpeg, gif, png',
      value => value && IMAGE_FORMATS.includes(value.type)
    ),
  video: Yup.mixed()
    .required('*campo obrigatório')
    .test(
      'fileSize',
      'Escolha um video que seja menor que 500MB',
      value => value && value.size <= 500 * 1048576
    )
    .test(
      'fileFormat',
      'Formato inválido, formatos aceitos: mp4, WebM',
      value => value && VIDEO_FORMATS.includes(value.type)
    )
})

const VideoUpload = () => {
  useEffect(() => {
    const currentUser = async () => {
      try {
        await api().get('/auth/user')
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }
    currentUser()
  }, [])

  const router = useRouter()
  const [tag, setTag] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])

  const notifyError = () => {
    toast.error('Não foi possível fazer o upload do video')
  }

  const notifySuccess = () => {
    toast.success('Upload realizado com sucesso')
  }

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    touched,
    errors,
    setFieldValue,
    isSubmitting
  } = useFormik({
    initialValues: {
      name: '',
      thumbnail: null,
      video: null
    },
    validationSchema,
    onSubmit: async ({ name, video, thumbnail }) => {
      const formData = new FormData()
      formData.append('video', video)
      formData.append('thumbnail', thumbnail)
      formData.append('name', name)
      formData.append('tags', tagArray.join())
      try {
        await api().post('/video', formData)
        notifySuccess()
        resetForm()
        setTagArray([])
      } catch (error) {
        console.error(error)
        notifyError()
      }
    }
  })

  const createTag = (label: string) => (
    <div className={styles.tag}>
      <span>{label}</span>
      <img
        src="/close_black_24dp.svg"
        onClick={() => handleDeleteTag(label)}
      ></img>
    </div>
  )

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTagArray(oldvalue => [...oldvalue, tag])
      setTag('')
    }
  }

  const addtag = () => {
    setTagArray(oldvalue => [...oldvalue, tag])
    setTag('')
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }

  const handleDeleteTag = (tagName: string) => {
    const newTags = tagArray.filter(tag => tag !== tagName)
    setTagArray(newTags)
  }

  const handleFormKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 13) {
      e.preventDefault()
    }
  }

  return (
    <>
      <Head>
        <title>Upload de video</title>
      </Head>
      <Container fluid>
        <ToastContainer />
        <Row className="justify-content-center h-100 align-items-center ">
          <Col lg={5} md={8} sm={11}>
            <Form
              noValidate
              onSubmit={handleSubmit}
              onKeyDown={handleFormKeyDown}
              className="shadow-lg p-5 rounded-3 "
            >
              <Row className="m-4">
                <Col className="d-flex justify-content-center h-100 align-items-center mb-4">
                  <p className={styles.title}>Upload de Video</p>
                </Col>
              </Row>
              <Row>
                <Form.Group sm md as={Col}>
                  <Form.Label>Selecione um video</Form.Label>
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input
                      isInvalid={!!errors.video}
                      onChange={event => {
                        setFieldValue('video', event.currentTarget.files[0])
                      }}
                      isValid={touched.video && !errors.video}
                      placeholder="video"
                      name="video"
                      onBlur={handleBlur}
                      accept="video/*"
                    />
                    <Form.File.Label data-browse="Buscar">
                      {values.video?.name}
                    </Form.File.Label>
                    <Form.Control.Feedback type="invalid">
                      {errors.video}
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group sm md as={Col}>
                  <Form.Label>Selecione uma thumbnail</Form.Label>
                  <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input
                      isInvalid={!!errors.thumbnail}
                      onChange={event => {
                        setFieldValue('thumbnail', event.currentTarget.files[0])
                      }}
                      isValid={touched.thumbnail && !errors.thumbnail}
                      placeholder="thumbnail"
                      name="thumbnail"
                      onBlur={handleBlur}
                      accept="image/*"
                    />
                    <Form.File.Label data-browse="Buscar">
                      {values.thumbnail?.name}
                    </Form.File.Label>
                    <Form.Control.Feedback type="invalid">
                      {errors.thumbnail}
                    </Form.Control.Feedback>
                  </Form.File>
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Título do video</Form.Label>
                    <Form.Control
                      isInvalid={!!errors.name}
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      placeholder="Digite o titulo do video"
                      name="name"
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      Digite as tegs que melhor descrevem este video
                    </Form.Label>
                    <div className={styles.containerr}>
                      <div className={styles.tag_container}>
                        {tagArray && tagArray.map(tag => createTag(tag))}
                        <input
                          onKeyUp={handleKeyUp}
                          onChange={handleTagChange}
                          value={tag}
                        />
                      </div>
                    </div>
                    <Button block variant="secondary" onClick={() => addtag()}>
                      Adicionar tag
                    </Button>
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
                    {isSubmitting ? '  ...' : 'Enviar video'}
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

export default VideoUpload
