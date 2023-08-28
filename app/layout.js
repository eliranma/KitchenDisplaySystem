import './globals.css'
import { Assistant } from 'next/font/google'
import Providers from './providers'
// import Head from 'next/head'


const assistant = Assistant({ subsets: ['latin'] })

export const metadata = {
  title: 'Aviv Kitchen Display system',
  description: 'Powered By AVIV POS',
  'application-name':'AvivKitchenDisplay',
  'apple-mobile-web-app-capable':'yes',
  'apple-mobile-web-app-status-bar-style':'black-translucen',
  'apple-mobile-web-app-title':'AvivKitchenDisplay',
  manifest:'/manifest.json',

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={assistant.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  )
}
