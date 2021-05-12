import type { AppProps } from 'next/app'
import Login from './Components/Login'

export default function Auth({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Component {...pageProps} />
      )

  }