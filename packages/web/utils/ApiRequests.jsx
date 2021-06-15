import axios from 'axios'

export default {
     getThreads: async (token) => {
          const res = await axios.get('http://localhost:3000/thread', {
               headers: {
                    authorization: token,
               },
          })

          return res.data
     },
     getMyInfo: async (token) => {
          const res = await axios.get('http://localhost:3000/auth/getMe', {
               headers: {
                    authorization: token,
               },
          })

          return res.data
     },

     getPlayersById: async (token, playerid) => {
          const res = await axios.get(
               `http://localhost:3000/playercards/playerId/${playerid}`,
               {
                    headers: {
                         authorization: token,
                    },
               }
          )

          return res.data
     },
}
