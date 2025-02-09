import React, { createContext, useState, useContext } from 'react';

// Create a context
const ChordOrderContext = createContext();

// Create the Provider component
export const ChordOrderProvider = ({ children }) => {
  // Shared state for ChordOrderProvider
  const [chordOrder, setChordOrder] = useState([]);

  return <ChordOrderContext.Provider value={{ chordOrder, setChordOrder }}> {children} </ChordOrderContext.Provider>;
};

// Custom hook to use the Chord Context
export const useChordOrderContext = () => useContext(ChordOrderContext);
