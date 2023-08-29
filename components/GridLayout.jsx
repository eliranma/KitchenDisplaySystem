"use client"
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React,{useState, useEffect} from 'react'
import Card from './Card';
// import mockup from '../mockup/mockup.json';
import { generateLayouts } from '@/utils/layoutGenerator';

import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";
import { useLayoutContext } from "@/context/LayoutContext";


const GridLayout = () => {
  let cols = isMobile()?2:4
  // const [gridData, setGridData] = useState(data)
  const {data, setData} = useAppContext()
  const {layout,setLayout, layoutDraggable} = useLayoutContext()
  let width = globalThis.window?.innerWidth
  // const [dataGrid] = useState(data?.orders)
    

    
    useEffect(()=>{
      let len = data?.orders?.length
      // debugger
      if (len>0 && len!==layout.length){
      let initLayouts = generateLayouts(len,cols);
      console.log(initLayouts)
      setLayout(initLayouts)
      }else{
        console.log("Nothing to change!")
      }
    },[data?.orders])
    
    return (
        <div className=' overflow-x-hidden'>
        <ResponsiveGridLayout
          className="layout"
          compactType='vertical'
          style={{paddingTop:5}}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          layouts={{lg:layout}}
          margin={[15,20]}
          isDraggable={layoutDraggable}
          onLayoutChange={(l)=>setLayout(l)}
          width={width} // You might want to use a more sophisticated method to get width
        >
        {data?.orders?data.orders.map((item,i)=>{
          return (
          <div className=" rounded-lg shadow-md bg-white"  key={i.toString()}>
          <Card id={i} bon={item} />
          </div>
          )
        }):null
        }
        </ResponsiveGridLayout>
        </div>
      );
    };
export default GridLayout