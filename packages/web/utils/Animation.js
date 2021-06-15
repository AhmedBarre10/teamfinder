import React from 'react'
import { gsap, TweenMax, TimelineMax, Power3 } from 'gsap'
import { useState, useEffect } from 'react'
export const Animation = () => {
     let tl = new TimelineMax()

     useEffect(() => {
          tl.to('.Animation', 0, { display: 'none', ease: Power3.easeOut })
     })

     // .from(div,8,{css:{"display":'none'}})

     return (
          <div className="Animation">
               <div className="spinnerCont">
                    <div className="lds-dual-ring"></div>
               </div>
          </div>
     )
}
