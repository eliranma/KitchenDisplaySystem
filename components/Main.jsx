"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import SortButton from "./SortButton";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import RefreshHandler from "./RefreshHandler";
import { useEffect, useRef } from "react";
// import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";
import isMobile from "is-mobile";
import DropdownButton from "./DropDownButton";

const Main = () => {
  const { data, setData } = useAppContext();
  const { layoutDraggable, setLayoutDraggable } = useLayoutContext();
  const router = useRouter();
  const autoRefreshIntervalRef = useRef(null);

  let session = data.session;
  let orders;
  let printers;
  let prnId = data.printerSelected;

  const ordersReq = async (session, printer = 0) => {
    orders = await ServerSideAPI.getOrders(session, printer);
    setData((prev) => ({ ...prev, orders: orders, sorted: "NONE" }));
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
    console.log(data);
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
    prnId = data?.printerSelected?.prnId || 0;
    try {
      ordersReq(session, prnId);
    } catch (e) {
      console.log(e);
    }
  }, [data?.printerSelected]);

  // Listen to changes of AutoRefresh Switch
  useEffect(() => {
    if (data.autoRefresh === true && session) {
      // console.log("AUTO REFRESH INTERVAL");
      autoRefreshIntervalRef.current = setInterval(() => {
        try {
          ordersReq(session, prnId);
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
  }, [data?.autoRefresh, session, data.session, prnId]);

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
      {/* <p>
            sdhsdas
        </p> */}
    </Screen>
  );
};

export default Main;
