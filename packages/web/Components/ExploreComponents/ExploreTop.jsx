import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import Nav from '../../pages/Nav'
import { useRouter } from 'next/router'
import ApiRequests from '../../utils/ApiRequests'

const ExploreTop = () => {
     const state = useStoreState((state) => state)
     const [url, setUrl] = useState()
     const router = useRouter()

     useEffect(() => {
          if (state['loggedin'] === false) {
               router.push('/Login')
          } else return null
     }, [])

     if (state['loggedin'] === false) {
          return null
     }

     const reloadImg = async () => {
          const data = await ApiRequests.getMyInfo(state.token)
          const url =
               await `http://localhost:3000/auth/images/${data.profileImage}`
          setUrl(url)
     }

     useEffect(async () => {
          reloadImg()
     }, [])

     return (
          <>
               <Nav />
               <div className="top-background">
                    <div>
                         <div className="img-gradient">
                              <img className="top-img" src={url} />{' '}
                         </div>
                    </div>
                    <input placeholder="Create Post" className="top-input" />
               </div>
          </>
     )
}

export default ExploreTop
