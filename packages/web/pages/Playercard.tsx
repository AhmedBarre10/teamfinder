import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import Nav from './Nav'
import { action, useStoreState } from 'easy-peasy'
import { useRouter } from 'next/router'
import { loggedin } from './Login'
import Users from '../Components/Users'
import Head from 'next/head'
import { svg } from '../utils/svg'
const PlayerCard = (props) => {
     const [response, setResponse] = useState('')
     // const [socket, setSocket] = useState()

     const [loading, setLoading] = useState(undefined)

     const [view, setView] = useState()
     const [searchQuery, setSearchQuery] = useState([])
     const [searchQuery2, setSearchQuery2] = useState([])
     const [searchQuery3, setSearchQuery3] = useState([])
     const [searchQuery4, setSearchQuery4] = useState([])
     const [searchQuery5, setSearchQuery5] = useState([])
     const [searchQuery6, setSearchQuery6] = useState([])
     const [searchQuery7, setSearchQuery7] = useState([])
     const [playercardcreated, setPlayercardcreated] = useState([])
     const router = useRouter()
     const token = useStoreState((state) => state['token'])
     const loggedin = useStoreState((state) => state['loggedin'])
     const state = useStoreState((state) => state)

     useEffect(() => {
          const Info = window.localStorage.getItem('userInfo')
          if (loggedin === false) {
               router.push('/Login')
          } else return null
     }, [])
     // (playercardcreated)

     if (loggedin === false) {
          return null
     }

     const Change = (e) => {
          setSearchQuery(e.target.value.toLowerCase())
     }

     const Change2 = (e) => {
          setSearchQuery2(e.target.value.toLowerCase())
     }
     const Change3 = (e) => {
          setSearchQuery3(e.target.value.toLowerCase())
     }
     const Change4 = (e) => {
          setSearchQuery4(e.target.value.toLowerCase())
     }

     const Change5 = (e) => {
          setSearchQuery5(e.target.value.toLowerCase())
     }

     const Change6 = (e) => {
          setSearchQuery6(e.target.value.toLowerCase())
     }

     const Change7 = (e) => {
          setSearchQuery7(e.target.value.toLowerCase())
     }

     const players = JSON.parse(window.localStorage.getItem('players'))
     const user = JSON.parse(window.localStorage.getItem('users'))

     const j = players.filter((item) => {
          const tag = item.Gamertag
          if (tag !== undefined) {
               return (
                    item.Archetype.toLowerCase().includes(searchQuery) &&
                    item.Overall.toLowerCase().includes(searchQuery2) &&
                    item.Rep.toLowerCase().includes(searchQuery3) &&
                    item.Position.toLowerCase().includes(searchQuery4) &&
                    item.Winpercentage.toLowerCase().includes(searchQuery5) &&
                    item.Type.toLowerCase().includes(searchQuery6) &&
                    item.System.toLowerCase().includes(searchQuery7)
               )
          }
     })

     return (
          <>
               <Nav />
               <div>
                    <Head>
                         <title>Players</title>
                    </Head>
                    <div className="searchCont">
                         <input
                              className="search"
                              placeholder="Archetype"
                              onChange={Change}
                              value={searchQuery}
                         />
                         {svg()}
                         <input
                              className="search"
                              placeholder="Overall"
                              onChange={Change2}
                              value={searchQuery2}
                         />
                         {svg()}
                         <input
                              className="search"
                              placeholder="Rep"
                              onChange={Change3}
                              value={searchQuery3}
                         />
                         {svg()}
                         <input
                              className="search"
                              placeholder="Position"
                              onChange={Change4}
                              value={searchQuery4}
                         />
                         {svg()}
                         <input
                              className="search"
                              placeholder="WP%"
                              onChange={Change5}
                              value={searchQuery5}
                         />
                         {svg()}
                         <input
                              className="search"
                              placeholder="Play Style"
                              onChange={Change6}
                              value={searchQuery6}
                         />
                         {svg()}

                         <input
                              className="search"
                              id=" system"
                              placeholder="System"
                              onChange={Change7}
                              value={searchQuery7}
                         />
                         {svg()}
                    </div>
                    {/* <Search/> */}
                    <div className="searchContainer">
                         <div className="SearchInput">
                              <input
                                   className="one"
                                   placeholder="Archetype"
                                   onChange={Change}
                                   value={searchQuery}
                              />

                              <input
                                   placeholder="Overall"
                                   onChange={Change2}
                                   value={searchQuery2}
                              />

                              <input
                                   placeholder="Rep"
                                   onChange={Change3}
                                   value={searchQuery3}
                              />
                         </div>

                         <div className="SearchInput">
                              <input
                                   placeholder="Position"
                                   onChange={Change4}
                                   value={searchQuery4}
                              />

                              <input
                                   placeholder="WP%"
                                   onChange={Change5}
                                   value={searchQuery5}
                              />

                              <input
                                   placeholder="Play Style"
                                   onChange={Change6}
                                   value={searchQuery6}
                              />

                              <input
                                   placeholder="System"
                                   onChange={Change7}
                                   value={searchQuery7}
                              />
                         </div>
                    </div>
                    <div className="cont">
                         <h1 className="featurereq">
                              {' '}
                              <a
                                   href="https://twitter.com/TeamFinder2K"
                                   target="_blank"
                              >
                                   {' '}
                                   Contact Me
                                   <time dateTime={response}>{response}</time>
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-mail"
                                        width="33"
                                        height="33"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1"
                                        stroke="white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                   >
                                        <path
                                             stroke="none"
                                             d="M0 0h24v24H0z"
                                             fill="none"
                                        />
                                        <rect
                                             x="3"
                                             y="5"
                                             width="18"
                                             height="14"
                                             rx="2"
                                        />
                                        <polyline points="3 7 12 13 21 7" />
                                   </svg>
                              </a>{' '}
                         </h1>
                         {players.map((info) => {
                              return (
                                   <div key={info.id} className={`infoCont`}>
                                        <div className={info.System}></div>
                                        <div className="mediaContainer">
                                             <div className="mediaCont">
                                                  <a
                                                       className={`noneview${info.Youtube}`}
                                                       href={info.Youtube}
                                                       target="_blank"
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon icon-tabler icon-tabler-brand-youtube"
                                                            width="44"
                                                            height="44"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="0.8"
                                                            stroke="white"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       >
                                                            <path
                                                                 stroke="none"
                                                                 d="M0 0h24v24H0z"
                                                                 fill="none"
                                                            />
                                                            <rect
                                                                 x="3"
                                                                 y="5"
                                                                 width="18"
                                                                 height="14"
                                                                 rx="4"
                                                            />
                                                            <path d="M10 9l5 3l-5 3z" />
                                                       </svg>{' '}
                                                  </a>

                                                  <a
                                                       className={`noneview${info.Instagram}`}
                                                       href={info.Instagram}
                                                       target="_blank"
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon icon-tabler icon-tabler-brand-instagram"
                                                            width="44"
                                                            height="44"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="0.8"
                                                            stroke="white"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       >
                                                            <path
                                                                 stroke="none"
                                                                 d="M0 0h24v24H0z"
                                                                 fill="none"
                                                            />
                                                            <rect
                                                                 x="4"
                                                                 y="4"
                                                                 width="16"
                                                                 height="16"
                                                                 rx="4"
                                                            />
                                                            <circle
                                                                 cx="12"
                                                                 cy="12"
                                                                 r="3"
                                                            />
                                                            <line
                                                                 x1="16.5"
                                                                 y1="7.5"
                                                                 x2="16.5"
                                                                 y2="7.501"
                                                            />
                                                       </svg>
                                                  </a>

                                                  <a
                                                       className={`noneview${info.Twitter}`}
                                                       href={info.Twitter}
                                                       target="_blank"
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="icon icon-tabler icon-tabler-brand-twitter"
                                                            width="44"
                                                            height="44"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="0.8"
                                                            stroke="white"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                       >
                                                            <path
                                                                 stroke="none"
                                                                 d="M0 0h24v24H0z"
                                                                 fill="none"
                                                            />
                                                            <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                                                       </svg>
                                                  </a>
                                                  <div className={view}>
                                                       <a
                                                            className={`noneview${info.Twitch}`}
                                                            href={info.Twitch}
                                                            target="_blank"
                                                       >
                                                            <svg
                                                                 xmlns="http://www.w3.org/2000/svg"
                                                                 className="icon icon-tabler icon-tabler-brand-twitch"
                                                                 width="44"
                                                                 height="44"
                                                                 viewBox="0 0 24 24"
                                                                 strokeWidth="0.5"
                                                                 stroke="#ff4500"
                                                                 fill="none"
                                                                 strokeLinecap="round"
                                                                 strokeLinejoin="round"
                                                            >
                                                                 <path
                                                                      stroke="none"
                                                                      d="M0 0h24v24H0z"
                                                                      fill="none"
                                                                 />
                                                                 <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1z" />
                                                                 <line
                                                                      x1="16"
                                                                      y1="8"
                                                                      x2="16"
                                                                      y2="12"
                                                                 />
                                                                 <line
                                                                      x1="12"
                                                                      y1="8"
                                                                      x2="12"
                                                                      y2="12"
                                                                 />
                                                            </svg>
                                                       </a>
                                                  </div>
                                             </div>
                                        </div>
                                        {/* <div className={info.Status}></div> */}

                                        {user.map((item) => {
                                             if (item._id === info.PlayerId) {
                                                  return (
                                                       <div className="cols">
                                                            <span>
                                                                 {' '}
                                                                 @{item.name}
                                                            </span>
                                                            <br></br>
                                                            <label>
                                                                 {' '}
                                                                 Profile picture
                                                            </label>
                                                            <img
                                                                 className="playerProfiles"
                                                                 src={`http://localhost:3000/auth/images/${item.profileImage}`}
                                                            />
                                                       </div>
                                                  )
                                             }
                                        })}

                                        <div>
                                             <div className="statsCont">
                                                  <p>
                                                       {' '}
                                                       <span>Archetype</span>
                                                       <br></br>{' '}
                                                       {info.Archetype}
                                                  </p>
                                                  <p>
                                                       {' '}
                                                       <span>
                                                            Position
                                                       </span>{' '}
                                                       <br></br> {info.Position}
                                                  </p>
                                                  <div className="col">
                                                       <p>
                                                            {' '}
                                                            <span>
                                                                 Rep
                                                            </span>{' '}
                                                            <br></br> {info.Rep}
                                                       </p>
                                                       <p>
                                                            {' '}
                                                            <span>
                                                                 PlayStyle
                                                            </span>
                                                            <br></br>{' '}
                                                            {info.Type}
                                                       </p>

                                                       <p>
                                                            {' '}
                                                            <span>
                                                                 Gamertag
                                                            </span>
                                                            <br></br>{' '}
                                                            {info.Gamertag}
                                                       </p>
                                                  </div>
                                             </div>

                                             <div className="rangeContainer">
                                                  <div className="rangeColumn">
                                                       <div className="rangeConnt">
                                                            {info.Overall}
                                                            <p>Overall</p>
                                                       </div>
                                                  </div>
                                                  <div className="rangeColumn">
                                                       <div className="rangeConnt">
                                                            {info.Winpercentage}
                                                            <p>
                                                                 {' '}
                                                                 Winpercentage
                                                            </p>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="bioCont">
                                             <div
                                                  className={`bioView ${info.System}s`}
                                             >
                                                  <p>
                                                       {' '}
                                                       Bio <br></br>
                                                       {info.Bio}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              )
                         })}
                    </div>
               </div>
          </>
     )
}

export default PlayerCard
