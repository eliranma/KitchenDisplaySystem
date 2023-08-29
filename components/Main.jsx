"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import SortButton from "./SortButton";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import RefreshHandler from "./RefreshHandler";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation"
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";
import DropdownButton from "./DropDownButton";
// import localforage from "localforage";

const Main = () => {
  const { data, setData } = useAppContext();
  const { layoutDraggable, setLayoutDraggable } = useLayoutContext();
  const router = useRouter();
  const [showInstallMessage,setShowInstallMessage] = useState(false)
  const autoRefreshIntervalRef = useRef(null);
// Detects if device is on iOS 
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);


  let session = data.session;
  let orders;
  let printers;
  let prnName = data.printerSelected;

  const ordersReq = async (session, printer = "") => {
    orders = await ServerSideAPI.getOrders(session, printer);
    setData((prev) => ({ ...prev, orders: orders, sorted: "NONE" }));
  };

  const newOrdersReq = async (session, printer = "") => {
    if (!orders) return;
    let currentIds = []
    orders.map(o=> currentIds.push(o._id))
    // console.log(currentIds);
    let newOrders = await ServerSideAPI.askForNewOrders(session, currentIds, printer);
    console.log(newOrders);
    if (Array.isArray(newOrders)&& newOrders.length>0){
      let updated = [...new Map([...orders, ...newOrders].map(doc => [doc._id, doc])).values()];
      orders = updated
      setData((prev) => ({ ...prev, orders:  updated}));
    }
  };

  const printersReq = async (session) => {
    printers = await ServerSideAPI.getPrinters(session);
    setData((prev) => ({ ...prev, printers: printers }));
  };

  const checkLocalStorageSession = () => {
    let tmp = localStorage.getItem("session");
    tmp = JSON.parse(tmp);
    if (tmp.token) return tmp;
    throw new Error("No session found local storage!");
  };

  useEffect(() => {
    // console.log(data);
    if (!data.session) {
      try {
        session = checkLocalStorageSession();
        console.log(`Session found: ${session}`);
        setData((prev) => ({ ...prev, session: session }));
      } catch (err) {
        console.log(err);
        return router.push("/");
      }
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

  // Listen to changes of selectedPrinter
  useEffect(() => {
    prnName = data?.printerSelected?.prnName || '';
    try {
      ordersReq(session, prnName);
    } catch (e) {
      console.log(e);
    }
  }, [data?.printerSelected]);

  // Listen to changes of AutoRefresh Switch
  useEffect(() => {
    if (data.autoRefresh === true && session) {
      // console.log("AUTO REFRESH INTERVAL");
      autoRefreshIntervalRef.current = setInterval(async() => {
        try {
          let reqPrn = prnName==='הכל'?null:prnName
          await newOrdersReq(session, reqPrn);
        } catch (e) {
          console.log(e);
        }
      }, 10000);
    } else {
      // console.log("clearing interval");
      clearInterval(autoRefreshIntervalRef.current);
      // console.log(autoRefreshIntervalRef.current);
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(autoRefreshIntervalRef.current);
    };
  }, [data?.autoRefresh, session, data.session, prnName]);


// useEffect(()=>{
//   // Checks if should display install popup notification:
// if (isIos() && !isInStandaloneMode()) {
//   setShowInstallMessage(true)
// }
// },[])


  return (
    <Screen>
      <div className="sticky top-14 bg-white  z-50 flex h-9 flex-row">
        <PrinterMenu />
        {isMobile() ? (
          <DropdownButton>
            <RefreshHandler />
            <div className="flex flex-row items-center justify-around mt-1">

            <SortButton />
            <LayoutButton action={setLayoutDraggable} />
            </div>
          </DropdownButton>
        ) : (
          <>
            <SortButton />
            <RefreshHandler />
            <LayoutButton action={setLayoutDraggable} />
          </>
        )}
      </div>
      <GridLayout draggable={layoutDraggable} />
      {/* {setShowInstallMessage} */}
    </Screen>
  );
};

export default Main;
