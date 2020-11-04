import { GlobalStyles } from 'twin.macro'
import * as React from 'react'

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}
