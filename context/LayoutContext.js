import React, { createContext, useContext, useState } from 'react';

// Create the context
const LayoutContext = createContext();

// Create a provider component
export const LayoutProvider = ({ children }) => {
  const [layoutDraggable, setLayoutDraggable] = useState(false);
  const [layout, setLayout] = useState([]);
  return (
    <LayoutContext.Provider value={{layoutDraggable, setLayoutDraggable, layout, setLayout}}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook to use the LayoutContext
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  console.log(context.layout)
  if (!context) {
    throw new Error('useLayoutContext must be used within an LayoutProvider');
  }
  return context;
};
