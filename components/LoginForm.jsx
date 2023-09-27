"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServerSideAPI from "../utils/api";
import { useAppContext } from "@/context/AppContext";
import Swal from "sweetalert2";
// import localforage from 'localforage';

const LoginForm = ({ username = null, password = null }) => {
  const router = useRouter();
  // const [errorMessage, setErrorMessage] = useState("");
  const { setData } = useAppContext();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(true);

  useEffect(() => {
    console.log(username, password);

    if (username && password) {
      handleLogin();
    }
  }, []);

  const printersReq = async (session) => {
    let printers = await ServerSideAPI.getPrinters(session);
    if (!printers) return;
    setData((prev) => ({ ...prev, printers: printers }));
  };

  const ordersReq = async (session, printer = "", offset = 0, limit = 20) => {
    let orders = await ServerSideAPI.getOrders(session, printer, offset, limit);
    if (orders === null) return;
    if (orders.length > 0) {
      console.log(`${orders.length}`);
    }
    setData((prev) => ({
      ...prev,
      orders: orders,
      sorted: "NONE",
      autoRefresh: true,
    }));
    // debugger
  };

  const initialization = async (data)=>{
    await printersReq(data);
    await ordersReq(data);
    return router.push("/orders", { prefetch: false });
  }

  const handleLogin = async (u = username, p = password) => {
    if (!u || !p) return;
    const success = await ServerSideAPI.login(u, p);

    if (success) {
      // Simulate session object
      console.log("login result: ", success);
      isRememberMe
        ? localStorage.setItem("session", JSON.stringify(success))
        : null;
      setData((prev) => ({ ...prev, session: success, isRememberMe }));
      Swal.fire({
        title: "!התחברות הצליחה",
        text: "....הנך מועבר כעת",
        icon: "success",
        timer: 1500,
        didClose: async () => await initialization(success),
      });
      // setTimeout(() => {

      // }, 500);
    } else {
      // setErrorMessage("Login failed. Please check your credentials.");
      Swal.fire({
        title: "התחברות נכשלה",
        text: "התחברות נכשלה - אנא בדוק את פרטי המשתמש",
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <div
      dir="rtl"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">התחברות</h2>
        <div>
          {/* USERNAME FIELD */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              שם משתמש
            </label>
            <input
              type="text"
              id="username"
              value={user}
              className="w-full border rounded px-3 py-2"
              onChange={(e) => setUser(e.target.value)}
              placeholder="הזן מזהה לקוח"
            />
          </div>
          {/* PASSWORD FIELD */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              סיסמא
            </label>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="הזן מזהה מכשיר"
            />
          </div>
          <div className="flex flex-col">
            <div className="inline-flex items-center">
              {/* CHECKBOX */}
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="checkbox-1"
                data-ripple-dark="true"
              >
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  id="checkbox-1"
                  defaultChecked
                  value={isRememberMe}
                  onChange={() => setIsRememberMe((prev) => !prev)}
                />
                <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </label>
              <p>שמור פרטי התחברות </p>
            </div>
            <button
              onClick={() => handleLogin(user, pass)}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              התחבר
            </button>
          </div>
          {/* {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
