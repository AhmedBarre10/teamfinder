import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import { StoreProvider } from 'easy-peasy'
import { store } from '../store'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Homes() {
     const loggedin = useStoreState((state) => state['token'])

     return (
          <div className="App">
               <Head>
                    <link
                         rel="icon"
                         type="image/png"
                         sizes="32x32"
                         href="file:///C:/Users/MOHAM/Desktop/teamfinder/packages/web/public/none.png"
                    />
                    <link
                         rel="apple-touch-icon"
                         sizes="180x180"
                         href="/apple-touch-icon.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                         rel="mask-icon"
                         href="/safari-pinned-tab.svg"
                         color="#5bbad5"
                    />
                    <meta name="theme-color" content="#ffffff" />
                    <title>My page title</title>
                    <meta
                         name="viewport"
                         content="initial-scale=1.0, width=device-width"
                    />
               </Head>
               <Home />
               <Nav />
          </div>
     )
}
