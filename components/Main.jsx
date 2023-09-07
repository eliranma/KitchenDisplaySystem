"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import SortButton from "./SortButton";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import RefreshHandler from "./RefreshHandler";
import DropdownButton from "./DropDownButton";
import ProgressBar from "./ProgressBar";
import loadingGif from "../assets/loading.gif";
import { useEffect, useRef, useState } from "react";
// import { useParams } from "next/navigation"
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
// import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";
import Image from "next/image";
import NoData from "./NoData";
// import localforage from "localforage";

const Main = () => {
  const { data, setData } = useAppContext();
  const router = useRouter();
  // const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasData, setHasData] = useState(false);
  const autoRefreshIntervalRef = useRef(null);
  const wrapperRef = useRef(null);
  const [mainComponentHeight, setMainComponentHeight] = useState(0);
  let session = data.session;
  let orders;
  let printers;
  let height = globalThis?.window?.innerHeight - 92 || 0;
  let prnName = data?.printerSelected?.name;
  const limit = 20;

  const ordersReq = async (session, printer = "", offset = 0, limit = 20) => {
    orders = await ServerSideAPI.getOrders(session, printer, offset, limit);
    console.log(orders);
    if (orders === null) return;
    // Sort by tmPrint in descending order (most recent first)
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    // console.log("GOOD!");
    setData((prev) => ({
      ...prev,
      orders: orders,
      sorted: "NONE",
      autoRefresh: true,
    }));
    // debugger
  };

  const newOrdersReq = async (session, printer = "") => {
    // if (data.orders) return;
    let currentIds = [];
    console.log(data);
    let tmp = [...data.orders];
    // TODO: Fix this - should ignore the
    tmp.map((o) => currentIds.push(o._id));
    console.log(currentIds);
    let exists = await ServerSideAPI.checkExists(session, currentIds);
    console.log(exists);
    if (exists !== null) {
      currentIds = exists?.found || currentIds;
    }
    let newOrders = await ServerSideAPI.askForNewOrders(
      session,
      currentIds,
      printer
    );
    console.log(newOrders);
    if (!newOrders) return;
    if (Array.isArray(newOrders) && newOrders.length > 0) {
      let updated = [
        ...new Map(
          [...newOrders, ...tmp].map((doc) => [doc._id, doc])
        ).values(),
      ];

      // Sort by tmPrint in descending order (most recent first)
      updated.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Update state
      setData((prev) => ({ ...prev, orders: updated }));
    }
  };

  const printersReq = async (session) => {
    printers = await ServerSideAPI.getPrinters(session);
    if (!printers) return;
    setData((prev) => ({ ...prev, printers: printers }));
  };

  // Utils functions
  const checkLocalStorageSession = () => {
    let tmp = localStorage.getItem("session");
    tmp = JSON.parse(tmp);
    if (tmp.token) return tmp;
    throw new Error("No session found local storage!");
  };

  const loaderProp = ({ src }) => {
    return src;
  };

  const upadteDataStatus = () => {
    let tmp = data.orders===null?[]:[...data.orders]
    console.log(tmp)
    if (tmp.length>0) {
      console.log("SHOW");
      setHasData(true);
    } else {
      console.log("DONT SHOW");
      setHasData(false);
    }
  };
  const updateHeight = (h) => {
    setMainComponentHeight(h);
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
            if (prevProgress >= 100 || data?.orders?.length > 0) {
              clearInterval(interval);
              setLoading(false);

              return 100;
            }
            // let progValue = ;
            return Math.min(prevProgress + 3, 100);
          });
        }, 30); // Update every 30 seconds

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
    // debugger
    if (!session?.token || !data?.printers) return;
    prnName = data?.printerSelected?.name || "";
    prnName = prnName === "הכל" ? "" : prnName;
    try {
      setLoading(true);
      ordersReq(session, prnName);
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => setLoading(false), 1000);
  }, [data?.printerSelected]);

  // Listen to changes of AutoRefresh Switch
  useEffect(() => {
    if (!session?.token || orders === null) return;
    if (data.autoRefresh === true && session) {
      // console.log("AUTO REFRESH INTERVAL");
      autoRefreshIntervalRef.current = setInterval(async () => {
        try {
          let reqPrn = prnName === "הכל" ? null : prnName;
          setLoading(true);
          await newOrdersReq(session, reqPrn);
          setTimeout(() => setLoading(false), 1000);
        } catch (e) {
          console.log(e);
        }
      }, 10000);
    } else {
      clearInterval(autoRefreshIntervalRef.current);
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(autoRefreshIntervalRef.current);
    };
  }, [data?.autoRefresh, session, data.session, prnName]);

  /*
  Implemntation of the window infinite-scroll
  While scrolling to the end a request with more 20 orders should be fetch.
  To avoid the autoRefresh missmatch we need to set the autoRefresh to false currently and start it after we received the next orders.
  I might encounter an issue to know what orders are new.
  */
  const fetchNext = async (session, prnName = "", offset, limit) => {
    let req = await ServerSideAPI.getOrders(session, prnName, offset, limit);
    console.log(req);
    if (Boolean(req)) {
      setOffset((prev) => prev + limit + 1);
      let updated = [
        ...new Map(
          [...req, ...data.orders].map((doc) => [doc._id, doc])
        ).values(),
      ];

      // Sort by tmPrint in descending order (most recent first)
      updated.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Update state
      setData((prev) => ({ ...prev, orders: updated }));
    }
  };
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      // Fetch more items
      setData((prev) => ({ ...prev, autoRefresh: false }));
      console.log("offset:", offset);
      console.log("limit:", limit);
      //  console.log("reqOffset:",reqOffset);
      fetchNext(session, prnName, offset, limit);
      setData((prev) => ({ ...prev, autoRefresh: true }));
    }
  };

  useEffect(() => {
    console.log(wrapperRef.current);

    // Attach event listener
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", handleScroll);
    }

    // Cleanup
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [wrapperRef?.current]); // Dependency array, re-run effect if wrapperRef changes

  useEffect(() => {
    upadteDataStatus();
  }, [data?.orders]);
  useEffect(() => updateHeight(height), [height]);
  // Logging
  useEffect(() => console.log(data), [data]);

  // Detects if device is on iOS
  // const isIos = () => {
  //   const userAgent = window.navigator.userAgent.toLowerCase();
  //   return /iphone|ipad|ipod/.test(userAgent);
  // };
  // // Detects if device is in standalone mode
  // const isInStandaloneMode = () =>
  //   "standalone" in window.navigator && window.navigator.standalone;
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
        {loading ? (
          <Image
            className="p-1"
            src={loadingGif}
            loader={loaderProp}
            alt="loading"
          />
        ) : (
          <span className="w-[56px]" />
        )}
        {isMobile() ? (
          <DropdownButton>
            <RefreshHandler />
            <div className="flex flex-row items-center justify-around mt-1">
              <SortButton />
              <LayoutButton />
            </div>
          </DropdownButton>
        ) : (
          <>
            <SortButton />
            <RefreshHandler />
            <LayoutButton />
          </>
        )}
      </div>
      <div
        ref={wrapperRef}
        style={{ overflowY: "auto", height: mainComponentHeight }}
      >
        {progress < 100 ? (
          <ProgressBar progress={progress} />
        ) : (
          <>
            {/* Not sure why but I had to convert it to boolean */}
            {hasData ? <GridLayout /> : <NoData />}
          </>
        )}
      </div>
      {/* {setShowInstallMessage} */}
    </Screen>
  );
};

export default Main;
