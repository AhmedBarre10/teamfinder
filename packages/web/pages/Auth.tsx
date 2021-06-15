import type { AppProps } from 'next/app'

export default function Auth({ Component, pageProps }: AppProps): JSX.Element {
     return <Component {...pageProps} />
}
