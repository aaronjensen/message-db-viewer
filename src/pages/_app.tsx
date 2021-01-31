import tw, { GlobalStyles } from "twin.macro"
import * as React from "react"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { Global } from "@emotion/react"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Global
        styles={{
          body: tw`bg-gray-50 font-sans`,
        }}
      />
      <Head>
        <title>Message DB Viewer</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
