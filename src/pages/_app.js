import tw, { GlobalStyles } from "twin.macro"
import * as React from "react"
import { Global } from "@emotion/react"
import Head from "next/head"

export default function App({ Component, pageProps }) {
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
