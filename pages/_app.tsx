import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <div className='overflow-x-hidden'>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}
