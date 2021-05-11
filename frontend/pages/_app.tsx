import React from 'react'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
