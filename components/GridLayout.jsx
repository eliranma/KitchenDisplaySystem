"use client"
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import React,{useState} from 'react'
import Card from './Card';
import mockup from '../mockup/mockup.json';
import { generateLayouts } from '@/utils/layoutGenerator';
import { pdfjs } from 'react-pdf';
const isMobile = require('is-mobile');

const GridLayout = ({data=mockup, draggable=null}) => {
  let cols = isMobile()?2:4
    let initLayouts = generateLayouts(data.length,cols );
    const [layouts, setLayouts] = useState(initLayouts)
    console.log(data)
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url,
    ).toString();
      return (
        <div className='bg-slate-300	'>
        <ResponsiveGridLayout
          className="layout"
          style={{paddingTop:5}}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
          layouts={{lg:layouts}}
          margin={[15,20]}
          isDraggable={draggable}
          onLayoutChange={(l)=>setLayouts(l)}
          width={window.innerWidth} // You might want to use a more sophisticated method to get width
        >
        {data?data.map((item,i)=>{
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