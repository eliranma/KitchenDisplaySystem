import './globals.css'
import { Assistant } from 'next/font/google'
import Providers from './providers'
// import Head from 'next/head'


const assistant = Assistant({ subsets: ['latin'] })

export const metadata = {
  manifest:'/manifest.json',
  'apple-touch-icon':"/icons/apple-touch-icon.png",
  'theme-color': '#E4004A',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-slate-300'>
      <body style={{overflowY:"auto"}} className={assistant.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
