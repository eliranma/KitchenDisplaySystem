import React from 'react'
import { useAppContext } from '@/context/AppContext'
import { sortByDate } from '@/utils/sortFuncc'
const renderSortUp =()=>(
    <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="6" x2="11" y2="6" />  <line x1="4" y1="12" x2="11" y2="12" />  <line x1="4" y1="18" x2="13" y2="18" />  <polyline points="15 9 18 6 21 9" />  <line x1="18" y1="6" x2="18" y2="18" /></svg>
)
const renderSortDown = ()=>(
    <svg className="h-8 w-8 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="6" x2="13" y2="6" />  <line x1="4" y1="12" x2="11" y2="12" />  <line x1="4" y1="18" x2="11" y2="18" />  <polyline points="15 15 18 18 21 15" />  <line x1="18" y1="6" x2="18" y2="18" /></svg>
)

const SortButton = () => {
    const {data, setData}= useAppContext()
    
    const handleButton = ()=>{
        let sorted = data?.sorted==='DESC'?"ASC":"DESC"
        setData(prev=>({...prev, sorted:sorted}))
        let tmpData = sortByDate(data.orders, sorted)
        setData(prev=>({...prev, orders:tmpData}))
    }
  return (
    <div className='w-max flex justify-center items-center'>
        <button className='flex flex-row px-2 bg-green-300 rounded-full' onClick={handleButton}>
        <p className="whitespace-nowrap overflow-hidden text-white overflow-ellipsis mx-1">מיון</p>
        {data?.sorted==='DESC'?renderSortUp():renderSortDown()}
        </button>
    </div>
  )
}

export default SortButton