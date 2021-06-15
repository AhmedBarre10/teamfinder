import type { AppProps } from 'next/app'
import './App.css'
import './Nav.css'
import './Playercard.css'
import './Account.css'
import './Explore.css'

import { StoreProvider } from 'easy-peasy'
import { store } from '../store'

import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
     return (
          <StoreProvider store={store}>
               <Head>
                    <link
                         rel="icon"
                         type="image/png"
                         sizes="32x32"
                         href="http://localhost:5000/_next/static/media/icon.png"
                    />
                    <link
                         rel="apple-touch-icon"
                         sizes="180x180"
                         href="http://localhost:5000/_next/static/media/icon.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                         rel="mask-icon"
                         href="http://localhost:5000/_next/static/media/icon.png"
                         color="#5bbad5"
                    />
                    <meta name="theme-color" content="#ffffff" />
                    <meta
                         name="viewport"
                         content="initial-scale=1.0, width=device-width"
                    />
               </Head>
               <Component {...pageProps} />
          </StoreProvider>
     )
}
