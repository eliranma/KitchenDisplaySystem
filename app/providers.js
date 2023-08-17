'use client'
import {AppProvider} from './context/AppContext'

const Providers = (children)=>{
    <AppProvider>
        {children}
    </AppProvider>
}
export default Providers