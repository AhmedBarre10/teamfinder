import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Head from 'next/head'
import ExploreBottom from '../Components/ExploreComponents/ExploreBottom'
import ExploreTop from '../Components/ExploreComponents/ExploreTop'
import Events from '../Components/ExploreComponents/Events'
const Explore = () => {
     return (
          <>
               <Head>
                    <title>Explore</title>
               </Head>
               <Nav />
               <div className="ExplorePage">
                    <div className="ExploreContainer">
                         <ExploreTop />
                         <div className="event-post">
                              <ExploreBottom />
                              <Events />
                         </div>
                    </div>
               </div>
          </>
     )
}

export default Explore
