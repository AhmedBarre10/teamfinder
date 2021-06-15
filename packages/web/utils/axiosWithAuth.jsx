import axios from 'axios'
import { useStoreActions, useStoreState } from 'easy-peasy'

export const axiosWithAuth = () => {
     const state = useStoreState((state) => state)

     return axios.create({
          headers: {
               authorization: state['token'],
          },
          baseURL: 'https://jobs-xmmtw.ondigitalocean.app/',
     })
}
