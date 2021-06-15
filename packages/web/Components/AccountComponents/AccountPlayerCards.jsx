import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import ApiRequests from '../../utils/ApiRequests'
const AccountPlayerCards = () => {
     const state = useStoreState((state) => state)
     const [playercards, setPlayercards] = useState([])
     const [img, setImg] = useState()

     useEffect(async () => {
          const reloadImg = async () => {
               const data = await ApiRequests.getMyInfo(state.token)
               //   setUser(data)
               const url =
                    await `http://localhost:3000/auth/images/${data.profileImage}`
               setImg(url)
               const player = await ApiRequests.getPlayersById(
                    state.token,
                    data._id
               )
               setPlayercards(player)
          }
          reloadImg()
     }, [])

     return (
          <div className="Playerscont">
               {playercards.map((info) => {
                    return (
                         <div className="playercards">
                              <div className="myreps">
                                   <div className={`myrep${info.System}`}>
                                        <div
                                             id="hey"
                                             className={`myrep ${info.System}`}
                                        >
                                             <div
                                                  className={`${info.Rep}`}
                                             ></div>
                                        </div>
                                   </div>
                              </div>

                              <div className="myGamertag">
                                   <p>
                                        Gamertag
                                        <br></br>
                                        <span>{info.Gamertag}</span>
                                   </p>
                              </div>
                              <div>
                                   <div className="mystatsCont">
                                        <p>
                                             {' '}
                                             <span>Archetype</span>
                                             <br></br> {info.Archetype}
                                        </p>
                                        <p>
                                             {' '}
                                             <span>
                                                  Position
                                             </span> <br></br> {info.Position}
                                        </p>
                                        <p>
                                             {' '}
                                             <span>PlayStyle</span>
                                             <br></br> {info.Type}
                                        </p>
                                   </div>

                                   <div className="rangeContainer">
                                        <div className="rangeColumn">
                                             <div className="rangeConnt">
                                                  <br></br>
                                                  {info.Overall}
                                                  <p>Overall</p>
                                                  <input
                                                       className="range"
                                                       type="range"
                                                       onChange={() =>
                                                            console.log()
                                                       }
                                                       value={info.Overall}
                                                       min="0"
                                                       max="100"
                                                  />{' '}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    )
               })}
          </div>
     )
}

export default AccountPlayerCards
