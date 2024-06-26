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
import { findMaxId } from "../utils/sortFuncc";
import { debounce} from "../utils/debounce";
// import localforage from "localforage";

const Main = () => {
  const { data, setData } = useAppContext();
  const router = useRouter();
  // const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [mainComponentHeight, setMainComponentHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newDataFetching, setNewDataFetching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasData, setHasData] = useState(false);
  const autoRefreshIntervalRef = useRef(null);
  const wrapperRef = useRef(null);
  const offsetRef = useRef(0);
  const ordersRef = useRef();
  let session = data.session;
  
  let height = globalThis?.window?.innerHeight - 92 || 0;
  let prnName = data?.printerSelected?.name;
  const limit = 20;
  // let offset = 0;

  useEffect(() => {
    if (data.printers === null) {
    ServerSideAPI.getPrinters(session).then((printers)=>{
      setData((prev) => ({ ...prev, printers: printers }));
    }).catch((error) => {
      console.error(error);
    })
  }
    ordersRef.current = data.orders;
  }, [data.orders]);



  const ordersReq = async (session, printer = "", offset = 0, limit = 20) => {
    let orders = await ServerSideAPI.getOrders(session, printer, offset, limit);
    // console.log(orders);
    if (orders === null) return;
    // Sort by tmPrint in descending order (most recent first)
    
    if (orders.length > 0) {
      offsetRef.current +=limit;
      console.log(`SET THE offsetRef to:${offsetRef.current}`);
      console.log(`${orders.length}`);
    }
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
    let last;
    // console.log(currentIds);
    let tmp = [...ordersRef.current];
    tmp.map((o) => currentIds.push(o._id));

    // If current id array is empty return a new "orders request"
    
    if (currentIds.length === 0) {
      console.log("Due to currentId array is empty requesting ordersReq");
      return await ordersReq(session, printer);
    }
    let exists = await ServerSideAPI.checkExists(session, currentIds);
    // console.log(exists);
    if (exists !== null) {
      currentIds = exists?.found || currentIds;
      let tmpMiss = [...exists.missing];
      tmp = [...tmp].filter((t) => !tmpMiss.includes(t._id));
      last = findMaxId(tmp);
      if (tmpMiss !== []) setData((prev) => ({ ...prev, orders: tmp }));
    }
    let newOrders = await ServerSideAPI.askForNewOrders(session, last, printer);
    // console.log(newOrders);
    if (!newOrders) return;
    if (Array.isArray(newOrders) && newOrders.length > 0) {
      let updated = [
        ...new Map(
          [...newOrders, ...tmp].map((doc) => [doc._id, doc])
        ).values(),
      ];
      // console.log("updated:", updated);
      // Sort by tmPrint in descending order (most recent first)
      // updated = sortByMongoId(updated);
      // Update state
      setData((prev) => ({ ...prev, orders: [...updated] }));
    }
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
    let tmp = ordersRef.current === null ? [] : [...ordersRef.current];
    // console.log(tmp)
    if (tmp.length > 0) {
      // console.log("SHOW");
      setHasData(true);
    } else {
      // console.log("DONT SHOW");
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
        // console.log(`Session found: ${session}`);
        setData((prev) => ({ ...prev, session: session }));
      }
    } catch (err) {
      // console.log(err);
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
      console.log("Due initializtion process requesting ordersReq");
        await ordersReq(session);
        // await printersReq(session);

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
      console.log("Due to changes in selectedPrinter requesting ordersReq");
      ordersReq(session, prnName);
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => setLoading(false), 1000);
  }, [data?.printerSelected]);

  // Listen to changes of AutoRefresh Switch
  // useEffect(() => {
  //   let tmp = data.orders===null?[]:[...data.orders]
  //   if (!session?.token || tmp === []) return;
  //   if (data.autoRefresh === true && session) {
  //     // console.log("AUTO REFRESH INTERVAL");
  //     autoRefreshIntervalRef.current = setInterval(async () => {
  //       try {
  //         let reqPrn = prnName === "הכל" ? null : prnName;
  //         setLoading(true);
  //         await newOrdersReq(session, reqPrn);
  //         setTimeout(() => setLoading(false), 1000);
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }, 10000);
  //   } else {
  //     clearInterval(autoRefreshIntervalRef.current);
  //   }

  //   // Cleanup function to clear the interval when the component is unmounted
  //   return () => {
  //     clearInterval(autoRefreshIntervalRef.current);
  //   };
  // }, [data?.autoRefresh, session, data.session, prnName]);

  useEffect(() => {
    // let tmp = ordersRef.current || [];
    if (!session?.token) {
      return clearTimeout(autoRefreshIntervalRef.current); // Clear the interval when conditions are not met
    }

    const fetchNewOrders = async () => {
      try {
        let reqPrn = prnName === "הכל" ? null : prnName;
        setLoading(true);
        await newOrdersReq(session, reqPrn);
        setTimeout(() => setLoading(false), 1000);

        // Schedule the next call after a delay
        if (data.autoRefresh === true) {
          autoRefreshIntervalRef.current = setTimeout(fetchNewOrders, 10000);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (data.autoRefresh === true && session) {
      fetchNewOrders();
    } else {
      clearTimeout(autoRefreshIntervalRef.current); // Clear the interval when conditions are not met
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearTimeout(autoRefreshIntervalRef.current);
    };
  }, [data?.autoRefresh, session, prnName]);

  /*
  Implemntation of the window infinite-scroll
  While scrolling to the end a request with more 20 orders should be fetch.
  To avoid the autoRefresh missmatch we need to set the autoRefresh to false currently and start it after we received the next orders.
  I might encounter an issue to know what orders are new.
  */
  const fetchNext = async (session, prnName = "", offset, limit) => {
    let req = await ServerSideAPI.getOrders(session, prnName, offset, limit);
    // console.log(req);
    let tmp = ordersRef.current === null ? [] : [...ordersRef.current];
    if (req.length > 0) {
      let updated = [
        ...new Map([...tmp, ...req].map((doc) => [doc._id, doc])).values(),
      ];

      // Sort by tmPrint in descending order (most recent first)
      // updated = sortByMongoId(updated);

      // Update state
      // setTimeout(()=>setData((prev) => ({ ...prev })),1000)
      setData((prev) => ({ ...prev, orders: updated }));
      offsetRef.current += limit;
      console.log(`SET THE offsetRef to:${offsetRef.current}`);
      setNewDataFetching(false);
    }
    setTimeout(
      () => setData((prev) => ({ ...prev, autoRefresh: true })),
      1000
    );
  };
  // const handleScroll = (e) => {
  //   e.preventDefault();
  //   let threshold = 300;
  //   const distanceFromBottom =
  //     e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
  //   if (distanceFromBottom <= threshold && !newDataFetching) {
  //     // Fetch more items
  //     setNewDataFetching(true);
  //     setData((prev) => ({ ...prev, autoRefresh: false }));
  //     fetchNext(session, prnName, offsetRef.current, limit);
  //   }
  // };

  const handleScroll = debounce((e) => {
    e.preventDefault();
    let threshold = 500;  // Increased threshold
    const distanceFromBottom =
      e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight);
    if (distanceFromBottom <= threshold && !newDataFetching) {
      // Fetch more items
      setNewDataFetching(true);
      setData((prev) => ({ ...prev, autoRefresh: false }));
      fetchNext(session, prnName, offsetRef.current, limit);
    }
}, 300);

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
  }, [ordersRef.current]);
  useEffect(() => updateHeight(height), [height]);
  // Logging
  // useEffect(() => console.log(offsetRef.current), [offsetRef.current]);

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
            {hasData ? <GridLayout orders={ordersRef.current} /> : <NoData />}
          </>
        )}
      </div>
      {/* {setShowInstallMessage} */}
    </Screen>
  );
};

export default Main;
