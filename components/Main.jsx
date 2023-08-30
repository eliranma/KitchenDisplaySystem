"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import SortButton from "./SortButton";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import RefreshHandler from "./RefreshHandler";
import DropdownButton from "./DropDownButton";
import ProgressBar from "./ProgressBar";
import loadingGif from "@/assets/loading.gif";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation"
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";
import Image from "next/image";
// import localforage from "localforage";

const Main = () => {
  const { data, setData } = useAppContext();
  const { layoutDraggable, setLayoutDraggable } = useLayoutContext();
  const router = useRouter();
  const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const autoRefreshIntervalRef = useRef(null);
  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  // Detects if device is in standalone mode
  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;

  let session = data.session;
  let orders;
  let printers;
  let height = globalThis?.window?.innerHeight||0 - 92;
  let prnName = data.printerSelected;

  const ordersReq = async (session, printer = "") => {
    orders = await ServerSideAPI.getOrders(session, printer);
    setData((prev) => ({
      ...prev,
      orders: orders,
      sorted: "NONE"
    }));
  };

  const newOrdersReq = async (session, printer = "") => {
    if (!orders) return;
    let currentIds = [];
    orders.map((o) => currentIds.push(o._id));
    // console.log(currentIds);
    let newOrders = await ServerSideAPI.askForNewOrders(
      session,
      currentIds,
      printer
    );
    console.log(newOrders);
    if (Array.isArray(newOrders) && newOrders.length > 0) {
      let updated = [
        ...new Map(
          [...newOrders, ...orders].map((doc) => [doc._id, doc])
        ).values(),
      ];
      orders = updated;
      setData((prev) => ({ ...prev, orders: updated }));
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

  // Component initialization
  useEffect(() => {
    let interval;
    try {
      if (!data.session) {
        session = checkLocalStorageSession();
        console.log(`Session found: ${session}`);
        setData((prev) => ({ ...prev, session: session }));
      }
    } catch (err) {
      console.log(err);
      router.push("/");
    }

    const fetchData = async () => {
      try {
        // Initialize progress
        setProgress(0);

        // Start a timer to update the progress bar
        interval = setInterval(() => {
          setProgress((prevProgress) => {
            if (prevProgress >= 100) {
              clearInterval(interval);
              setLoading(false);

              return 100;
            }
            // let progValue = ;
            return Math.min(prevProgress + 0.5, 100);
          });
        }, 50); // Update every 60 seconds

        // Fetch data
        setLoading(true);
        await ordersReq(session);
        await printersReq(session);

        // Stop the timer and set progress to 100
        // clearInterval(interval);
        // setProgress(100);
      } catch (e) {
        console.error(e);
        clearInterval(interval);
        setProgress(0);
      }
    };

    session?.token && fetchData();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [data?.session]);

  // Listen to changes of selectedPrinter
  useEffect(() => {
    if (!session?.token || !printers) return;
    prnName = data?.printerSelected?.prnName || "";
    try {
      setLoading(true);
      ordersReq(session, prnName);
    } catch (e) {
      console.log(e);
    }
    debugger;

    setTimeout(() => setLoading(false), 1000);
  }, [data?.printerSelected]);

  // Listen to changes of AutoRefresh Switch
  useEffect(() => {
    if (!session?.token || !printers) return;
    if (data.autoRefresh === true && session) {
      // console.log("AUTO REFRESH INTERVAL");
      autoRefreshIntervalRef.current = setInterval(async () => {
        try {
          let reqPrn = prnName === "הכל" ? null : prnName;
          setLoading(true);
          await newOrdersReq(session, reqPrn);
        } catch (e) {
          console.log(e);
        }
      }, 10000);
    } else {
      debugger;
      setTimeout(() => setLoading(false), 1000);

      clearInterval(autoRefreshIntervalRef.current);
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

  // useEffect(() => {
  //   console.log(data.autoRefresh);
  // }, [data?.autoRefresh]);

  return (
    <Screen>
      <div className="sticky top-14 bg-white  z-50 flex h-9 flex-row">
        <PrinterMenu />
        {loading ? (
          <Image className="p-1" src={loadingGif} alt="loading" />
        ) : (
          <span className="w-[56px]" />
        )}
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
      <div style={{ height }}>
        {progress < 100 ? (
          <ProgressBar progress={progress} />
        ) : (
          <GridLayout draggable={layoutDraggable} />
        )}
      </div>
      {/* {setShowInstallMessage} */}
    </Screen>
  );
};

export default Main;
