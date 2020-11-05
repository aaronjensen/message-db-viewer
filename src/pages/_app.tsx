import { GlobalStyles } from "twin.macro"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { Provider } from "jotai"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  )
}
