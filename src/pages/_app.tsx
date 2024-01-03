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
      </Head>
      <Component {...pageProps} />
    </>
  )
}
