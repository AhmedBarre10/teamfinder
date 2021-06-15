import React, { useEffect } from 'react'

import Image from 'next/image'
import { useStoreState } from 'easy-peasy'

import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'

const Home = () => {
     const state = useStoreState((state) => state)
     console.log(state)

     useEffect(() => {
          const run = async () => {
               if (state['token']) {
                    const res = await axios.get(
                         'http://localhost:3000/playercards',
                         {
                              headers: {
                                   authorization: state['token'],
                              },
                         }
                    )
                    window.localStorage.setItem(
                         'players',
                         JSON.stringify(res.data)
                    )

                    const users = await axios.get(
                         `http://localhost:3000/auth`,
                         {
                              headers: {
                                   authorization: state['token'],
                              },
                         }
                    )
                    window.localStorage.setItem(
                         'users',
                         JSON.stringify(users.data)
                    )
               }
          }
          run()
     }, [])
     return (
          <div className="welcome-contsss">
               <Head>
                    <title>Home</title>
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
               <div className="">
                    <h1 className="welcome">
                         {' '}
                         Team Finder team up with like minded players{' '}
                    </h1>

                    <p className="welcome">
                         team finder is free for a limited time
                    </p>
                    <div className="getStartedConst">
                         <div className="getStartedButton">
                              <a href="/find"> Get Started</a>
                         </div>
                    </div>
               </div>

               <div className="heroCont">
                    {/*                 
                <Image
        src="/Hero.png"
        alt="Picture of the author"
        width={500}
        height={500}
      /> */}
               </div>
          </div>
     )
}

export default Home
