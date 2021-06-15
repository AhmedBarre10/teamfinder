import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Nav from './Nav'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Login = ({ stars }) => {
     const [state, setState] = useState({
          email: '',
          password: '',
     })

     const saveTodo = useStoreActions((actions) => actions.saveToken)
     const tokens = useStoreState((state) => state['token'])
     const loggedin = useStoreState((state) => state['loggedin'])
     const [alert, setAlert] = useState()
     const router = useRouter()

     useEffect(() => {
          if (loggedin === true) {
               console.log('aaa')
               router.push('/Playercard')
          }
     }, [])
     if (loggedin === true) {
          return null
     }

     console.log(loggedin)

     const handleSubmit = async (e) => {
          e.preventDefault()
          saveTodo(state)
          router.push('/')
     }

     const handleChange = (e) => {
          const { id, value } = e.target
          setState((state) => ({
               ...state,
               [id]: value.toLowerCase(),
          }))
          console.log(state)
     }

     const handleChange2 = (e) => {
          const { id, value } = e.target
          setState((state) => ({
               ...state,
               [id]: value,
          }))
     }
     useEffect(() => {
          if (loggedin === true) {
               window.location.replace('/Playercard')
          }
     }, [])

     console.log(tokens)
     console.log(loggedin)

     return (
          <>
               <Nav />
               <div className="login-cont login">
                    <Head>
                         <title>Login</title>
                    </Head>
                    <div className="auth-cont">
                         {/* <h4> Welcome login!</h4> */}

                         <form className="Login" onSubmit={handleSubmit}>
                              <p> Login to team finder {stars}</p>
                              {alert}
                              <input
                                   id="email"
                                   placeholder="email"
                                   value={state.email}
                                   onChange={handleChange}
                              />
                              <input
                                   type="password"
                                   value={state.password}
                                   id="password"
                                   placeholder="Password"
                                   onChange={handleChange2}
                              />
                              <Link href="/reset">
                                   <a>forgot password ?</a>
                              </Link>
                              <Link href="/signup">
                                   <a>dont have an account signup</a>
                              </Link>

                              <a className="authSubmit" onClick={handleSubmit}>
                                   Login
                              </a>
                         </form>
                    </div>
               </div>
          </>
     )
}
export const loggedin = () => {
     const [name, setName] = useState()
     setName(useStoreState((state) => state['loggedin']))
     return name
}

Login.getInitialProps = async (ctx) => {
     console.log('loggedin')
     const res = await fetch('https://api.github.com/repos/vercel/next.js')
     const json = await res.json()
     return { stars: 'loggedin' }
}

export default Login
