"use client";
import GridLayout from "./GridLayout";
import Screen from "./Screen";
import PrinterMenu from "./PrinterMenu";
import LayoutButton from "./LayoutButton";
import { useEffect } from "react";
// import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useLayoutContext } from "../context/LayoutContext";
import { useAppContext } from "@/context/AppContext";

const Main = () => {
  const { data, setData } = useAppContext();
  const session = data.session;
  const router = useRouter();
  let orders;
  const { layoutDraggable, setLayoutDraggable } = useLayoutContext();
  const ordersReq = async (session) => {
    orders = await ServerSideAPI.getOrders(session);
    setData({...data, orders:orders})
  };
  const printersReq = async (session) => {
    printers = await ServerSideAPI.getPrinters(session);
    setData({...data, printers:printers})
  }
  useEffect(() => {
    if (!session) return router.push("/");
    try {
      ordersReq(session);
      printersReq(session)
    } catch (e) {
      console.log(e);
    }
    // console.log(session);
  }, [session]);
  return (
    <Screen>
      <div className="sticky top-14 bg-white  z-50 flex h-9 flex-row">
        <PrinterMenu options={data.printers} />
        <LayoutButton action={setLayoutDraggable} />
      </div>
      <GridLayout data={data.orders} draggable={layoutDraggable} />
      {/* <p>
            sdhsdas
        </p> */}
    </Screen>
  );
};

export default Main;
