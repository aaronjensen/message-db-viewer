import Head from "next/head"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Message DB Viewer</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
