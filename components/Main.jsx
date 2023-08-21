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
    if (tmp?.token) return tmp
    throw new Error("No session found local storage!")
  }

  useEffect(() => {
    if (!session) {
        try{
            session = checkLocalStorageSession()
            console.log(`Session found: ${session}`);
            setData(prev=>({...prev, session:session}))
        }catch(err){
            console.log(err)
        }
        return router.push('/')
    };
    // console.log("usEffect session result: ", session);
    try {
      ordersReq(session);
      printersReq(session);
    } catch (e) {
      console.log(e);
    }
    // console.log(session);
  }, [session]);

  useEffect(()=>{
    let prnId = data?.printerSelected?.prnId || 0
    try{
      ordersReq(session, prnId);
    }catch(e){
      console.log(e)
    }
  },[data?.printerSelected])

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
