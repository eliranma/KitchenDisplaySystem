import './globals.css'
import { Assistant } from 'next/font/google'
import Providers from './providers'


const assistant = Assistant({ subsets: ['latin'] })

export const metadata = {
  title: 'Aviv Kitchen Display system',
  description: 'Powered By AVIV POS',
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
