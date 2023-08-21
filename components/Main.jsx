"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import SortButton from "./SortButton";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import RefreshHandler from "./RefreshHandler";
import { useEffect } from "react";
// import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";

const Main = () => {
  const { data, setData } = useAppContext();
  const { layoutDraggable, setLayoutDraggable } = useLayoutContext();
  const router = useRouter();

  let session = data.session;
  let orders;
  let printers;
  let prnId =  0
  let autoRefresh = data.autoRefresh;
  let autoRefreshInterval;

  
  const ordersReq = async (session, printer=0) => {
    orders = await ServerSideAPI.getOrders(session, printer);
    setData(prev=>({ ...prev, orders: orders, sorted:"NONE" }));
  };
  const printersReq = async (session) => {
    printers = await ServerSideAPI.getPrinters(session);
    setData(prev=>({ ...prev, printers: printers }));
  };

  const checkLocalStorageSession = ()=>{
    let tmp = localStorage.getItem("session")
    tmp = JSON.parse(tmp)
    if (tmp?.token) return tmp
    throw new Error("No session found local storage!")
  }

  useEffect(() => {
    console.log(data)
    if (!data.session) {
        try{
            session = checkLocalStorageSession()
            console.log(`Session found: ${session}`);
            setData(prev=>({...prev, session:session}))
        }catch(err){
            console.log(err)
        }
        return router.push('/')
    }

    // console.log("usEffect session result: ", session);
    try {
      ordersReq(session);
      printersReq(session);
    } catch (e) {
      console.log(e);
    }
    // console.log(session);
  }, [data?.session]);

  useEffect(()=>{
     prnId = data?.printerSelected?.prnId || 0
    try{
      ordersReq(session, prnId);
    }catch(e){
      console.log(e)
    }
  },[data?.printerSelected])
  useEffect(()=>{
    console.log("USE EFFECT FOR AUTO REFRESH", data.autoRefresh);
    console.log("SESSION AUTO REFRESH", data.session);

    if (autoRefresh&&session){
      autoRefreshInterval= setInterval(()=>{
        try{
          console.log("AUTO REFRESH INTERVAL");
          ordersReq(data.session, prnId);
        }catch(e){
          console.log(e)
        }
      },10000)
    }else{
      clearInterval(autoRefreshInterval)
    }
  },[data?.autoRefresh])

  return (
    <Screen>
      <div className="sticky top-14 bg-white  z-50 flex h-9 flex-row">
        <PrinterMenu  />
        <SortButton />
        <RefreshHandler />
        <LayoutButton action={setLayoutDraggable} />
      </div>
      <GridLayout draggable={layoutDraggable} />
      {/* <p>
            sdhsdas
        </p> */}
    </Screen>
  );
};

export default Main;
