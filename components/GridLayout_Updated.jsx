"use client";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import React,{useState, useEffect} from 'react'
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Card from './Card';
// import mockup from '../mockup/mockup.json';
import { generateLayouts } from '@/utils/layoutGenerator';
import isMobile from "is-mobile";

import { useAppContext } from "@/context/AppContext";
import { useLayoutContext } from "@/context/LayoutContext";


const GridLayout = ({height}) => {
  // const [gridData, setGridData] = useState(data)
  const {data, setData} = useAppContext()
  const {layout,setLayout, layoutDraggable} = useLayoutContext()
  let cols = isMobile()?2:4
  let width = globalThis.window?.innerWidth
  // const [dataGrid] = useState(data?.orders)
    

    

// New state variables for infinite scroll and auto-refresh
const [offset, setOffset] = useState(0);  // Pagination offset
const [isLoading, setIsLoading] = useState(false);  // Loading state

// Initial fetch of orders
useEffect(() => {
  const fetchData = async () => {
    const newOrders = await fetchOrders(0, 20);  // Replace with your API call
    // Update AppContext's orders state here.
  };
  fetchData();
}, []);


// Infinite Scroll Logic
useEffect(() => {
  const handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
      setIsLoading(true);
      // Fetch next set of orders based on the current offset
      const newOrders = await fetchOrders(offset, 20);  // Replace with your API call
      // Append newOrders to existing orders in AppContext.
      // Update the offset for the next pagination.
      setOffset(offset + 20);
      setIsLoading(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [offset, isLoading]);


// Auto-Refresh Logic
useEffect(() => {
  if (autoRefresh) {  // autoRefresh is from AppContext
    const intervalId = setInterval(async () => {
      // Fetch new orders based on existing orders' IDs
      const newOrders = await newOrdersReq(existingOrderIds);  // Replace with your API call
      // Prepend newOrders to existing orders in AppContext.
    }, refreshInterval);  // Replace with your desired refresh interval

    return () => clearInterval(intervalId);
  }
}, [autoRefresh, existingOrderIds]);

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
        <div className='overflow-x-hidden'>
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