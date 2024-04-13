import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import ToastProvider from '../components/element/ToastProvider';
import MainLayout from '../layouts/MainLayout'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  noLayout: Boolean
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const ComponentLayout = () => {
    return Component.noLayout
    ? (
      <Component {...pageProps} />
    ) : (
      <MainLayout>
        <Component {...pageProps} />
        <ToastProvider />
      </MainLayout>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>KBNI.com</title>
        <meta
          name="title"
          content="KBNI.com "
        />
        <meta name="author" content="@gagaadilesmanaputra" />
        <meta
          property="og:title"
          content="KBNI.com"
          key="ogtitle"
        />{' '}
        <link rel="icon" href="/images/idstar-logo.png" />
      </Head>
      <ComponentLayout />
    </React.Fragment>
  )
}

export default MyApp
