import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/router'
import ApiRequests from '../../utils/ApiRequests'

const ExploreBottom = () => {
     const state = useStoreState((state) => state)
     const [threads, setThreads] = useState([])
     const router = useRouter()

     useEffect(() => {
          if (state['loggedin'] === false) {
               router.push('/Login')
          } else return null
     }, [])

     if (state['loggedin'] === false) {
          return null
     }

     useEffect(async () => {
          const res = await ApiRequests.getThreads(state.token)
          setThreads(res)
     }, [])

     return (
          <>
               <div className="explore-top">
                    <div className="postColumn">
                         {threads.map((items) => {
                              return (
                                   <div className="titleCont">
                                        <img
                                             src={`http://localhost:3000/auth/images/${items.user.profileImage}`}
                                        />
                                        <div className="post-titlename">
                                             <p> {items.user.name}</p>
                                             <h4> {items.title}</h4>
                                        </div>
                                   </div>
                              )
                         })}
                    </div>
               </div>
          </>
     )
}

export default ExploreBottom
