import { GlobalStyles } from "twin.macro"
import * as React from "react"
import { AppProps } from "next/dist/next-server/lib/router/router"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
