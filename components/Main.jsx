"use client"
import  GridLayout from "./GridLayout"
import  Screen from "./Screen"
import PrinterMenu from "./PrinterMenu"
import LayoutButton from "./LayoutButton"
import {useEffect} from 'react'
import { useParams } from "next/navigation"
import {ServerSideAPI} from '../utils/api'
import {useLayoutContext} from '../context/LayoutContext'
const Main = ()=>{
    const session = useParams()
    const {layoutDraggable,setLayoutDraggable} = useLayoutContext()
    useEffect(()=>{
        // ServerSideAPI.getOrders(session)
    },[])
return (
    <Screen>
    <div className="sticky top-14 bg-white  z-50 flex h-9 flex-row">
    <PrinterMenu />
    <LayoutButton action={setLayoutDraggable} />
    </div>
        <GridLayout draggable={layoutDraggable} />
        {/* <p>
            sdhsdas
        </p> */}
    </Screen>
)
}

export default Main