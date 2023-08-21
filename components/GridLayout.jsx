"use client"
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React,{useState, useEffect} from 'react'
import Card from './Card';
// import mockup from '../mockup/mockup.json';
import { generateLayouts } from '@/utils/layoutGenerator';
import { pdfjs } from 'react-pdf';
import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";


const GridLayout = ({draggable=null}) => {
  let cols = isMobile()?2:4
  // const [gridData, setGridData] = useState(data)
  const {data} = useAppContext()
  let width = globalThis.window?.innerWidth
  // const [dataGrid] = useState(data?.orders)
    
    const [layouts, setLayouts] = useState([])


    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url,
    ).toString();
    
    
    useEffect(()=>{
      let initLayouts = generateLayouts(data?.orders?.length,cols );
      console.log(initLayouts)
      setLayouts(initLayouts)
    },[data?.orders])
    
    return (
        <div className=' h-auto overflow-y-auto overflow-x-hidden'>
        <ResponsiveGridLayout
          className="layout"
          style={{paddingTop:5}}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          layouts={{lg:layouts}}
          margin={[15,20]}
          isDraggable={draggable}
          onLayoutChange={(l)=>setLayouts(l)}
          width={width} // You might want to use a more sophisticated method to get width
        >
        {data?.orders?data.orders.map((item,i)=>{
          return (
          <div key={i.toString()}>
          <Card  bon={item} />
          </div>
          )
        }):null
        }
        </ResponsiveGridLayout>
        </div>
      );
    };
export default GridLayout