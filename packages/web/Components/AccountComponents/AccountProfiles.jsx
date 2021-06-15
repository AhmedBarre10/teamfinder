import React, { useEffect, useState } from 'react'
import { useStoreState } from 'easy-peasy'
import ApiRequests from '../../utils/ApiRequests'
const AccountProfiles = () => {
     const state = useStoreState((state) => state)
     const [user, setUser] = useState([])
     const [playercards, setPlayercards] = useState([])
     function handleUpload(event) {
          var myHeaders = new Headers()
          myHeaders.append(
               'Authorization',
               'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAwZTRlYjhiYjNkYzQwMDFlMjE3ZjU0In0sImlhdCI6MTYyMDMzNDg2NiwiZXhwIjoxNjI1NTE4ODY2fQ.F50afsO89vN29yQk2BR37-ymFhCRMGbRi96DapLYkdM'
          )

          var formdata = new FormData()

          formdata.append('upload', event.target.files[0], event.target.value)

          var requestOptions = {
               method: 'PUT',
               headers: myHeaders,
               body: formdata,
               redirect: 'follow',
          }

          fetch('http://localhost:3000/auth/upload', requestOptions)
               .then((response) => response.text())
               .then((result) => reloadImg())
               .catch((error) => console.log('error', error))
     }
     const [img, setImg] = useState()

     const reloadImg = async () => {
          const data = await ApiRequests.getMyInfo(state.token)
          setUser(data)
          const url =
               await `http://localhost:3000/auth/images/${data.profileImage}`
          setImg(url)
          const player = await ApiRequests.getPlayersById(state.token, data._id)
          setPlayercards(player)
     }

     useEffect(async () => {
          reloadImg()
     }, [])

     return (
          <div className="Accwrapper">
               <h1> {user.name} </h1>
               <br></br>
               <div className="userCont">
                    <img className="profileImage" src={img} />
                    <br></br>
                    <p>{user.name}</p>
                    <br></br>
                    {playercards.map((info, index) => {
                         if (index < 1) {
                              return <div>{info.Bio}</div>
                         }
                    })}
                    <br></br>
                    <p>{user.email}</p>
                    <label className="custom-file-upload">
                         <input type="file" onChange={handleUpload} />
                         Edit profile
                    </label>
               </div>
          </div>
     )
}

export default AccountProfiles
