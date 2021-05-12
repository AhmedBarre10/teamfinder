import type { AppProps } from 'next/app'
import "./App.css"
import "./Nav.css"
import "./Playercard.css"
import Login from './Components/Login'
import { StoreProvider } from 'easy-peasy';
import { store } from './store';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
return (
   <StoreProvider store={store}>
  <Component {...pageProps} />
    </StoreProvider>
    
    )
}