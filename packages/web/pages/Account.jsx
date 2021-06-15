import React from 'react'
import Head from 'next/head'
import Nav from './Nav'
import AccountProfiles from '../Components/AccountComponents/AccountProfiles'
import AccountPlayerCards from '../Components/AccountComponents/AccountPlayerCards'

const Account = () => {
     return (
          <>
               <Nav />
               <div className="Acccontainer">
                    <Head>
                         <title>Account</title>
                    </Head>
                    <AccountProfiles />
                    <AccountPlayerCards />
               </div>
          </>
     )
}

export default Account
