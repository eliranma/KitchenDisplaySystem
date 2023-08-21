import React, { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [data, setData] = useState({
    session: null,
    orders: null,
    printers:null,
    printerSelected: 0,
    isRememberMe: true,
    sorted:"NONE",
    autoRefresh: false
  }); // You can store any state here
  console.log(data);
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
