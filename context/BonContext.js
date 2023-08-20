import React, { createContext, useContext, useState } from 'react';

// Create the context
const BonContext = createContext();

// Create a provider component
export const BonProvider = ({ children }) => {
  const [data, setData] = useState({}); // You can store any state here

  return (
    <BonContext.Provider value={{ data, setData }}>
      {children}
    </BonContext.Provider>
  );
};

// Custom hook to use the BonContext
export const useBonContext = () => {
  const context = useContext(BonContext);
  if (!context) {
    throw new Error('useBonContext must be used within an BonProvider');
  }
  return context;
};
