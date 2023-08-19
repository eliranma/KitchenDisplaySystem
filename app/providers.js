"use client";
import { AppProvider } from "../context/AppContext";
import { BonProvider } from "../context/BonContext";
import { LayoutProvider } from "../context/LayoutContext";

const Providers = ({ children }) => {
  return(
  <AppProvider>
    <LayoutProvider>
      <BonProvider>{children}</BonProvider>
    </LayoutProvider>
  </AppProvider>)
};
export default Providers;
