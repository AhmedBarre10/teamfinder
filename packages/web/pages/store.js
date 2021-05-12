import { createStore, action,thunk } from 'easy-peasy';
import axios from 'axios'
import { persist } from 'easy-peasy';

export const store = createStore(
  persist({
    token:'',
    loggedin:false,

    login: action((state, payload) => {
    state.token = payload
    state.loggedin = true
  }),

  logout:action((state,payload)=>{
    state.loggedin = false;
    state.token = ''
    console.log(state)
  }),
  
    saveToken: thunk(async (actions, payload) => {
      const { data } = await axios.post('https://jobs-xmmtw.ondigitalocean.app/login', payload);
      actions.login(data.token);
    }),
  })
);