import Home from './Components/Home'
import Nav from './Components/Nav'
import Login from './Components/Login'
import { StoreProvider } from 'easy-peasy';
import { store } from './store';
import { useStoreActions,useStoreState } from 'easy-peasy';

export default function Homes() {

  const loggedin = useStoreState((state) => state.token);

  console.log(loggedin)

  return (
    <div className="App">
      <Home/>
      <Nav/>
      {/* <Login/> */}
    </div>
  )
}