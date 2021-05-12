import React from 'react'

import Image from 'next/image'

import { useState, useEffect } from 'react'
const Home = () => {
    return (
        <div className="welcome-contsss">
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
                    <a href="/find">
                    {' '}
                    Get Started
                </a>
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