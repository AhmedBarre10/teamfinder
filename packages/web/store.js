import { createStore, action, thunk } from 'easy-peasy'
import axios from 'axios'
import { persist } from 'easy-peasy'

export const store = createStore(
     persist({
          token: '',
          profileImage: '',
          loggedin: false,
          name: '',

          login: action((state, payload) => {
               console.log(payload)
               state['token'] = payload.token
               state['loggedin'] = true
               state['profileImage'] = payload.userInfo.profileImage
               state['name'] = payload.userInfo.name

               console.log(payload.userInfo.profileImage)
          }),

          logout: action((state, payload) => {
               state['loggedin'] = false
               state['token'] = ''
               console.log(state)
          }),

          saveToken: thunk(async (actions, payload) => {
               try {
                    const { data } = await axios.post(
                         'http://localhost:3000/auth/login',
                         payload
                    )
                    actions.login(data)
               } catch (err) {
                    console.log(err)
               }
          }),
     })
)
