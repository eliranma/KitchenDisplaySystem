import '../globals.css'
import { Assistant } from 'next/font/google'
import Header from '@/components/Header'


const assistant = Assistant({ subsets: ['latin'] })

export default function OrdersLayout({ children }) {
  return (
      <div className={assistant.className}>
        <Header />
        {children}
        </div>
  )
}
