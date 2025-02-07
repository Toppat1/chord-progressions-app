import React, { createContext, useState, useContext } from 'react';

// Create a context
const MusicalKeyContext = createContext();

// Create the Provider component
export const MusicalKeyProvider = ({ children }) => {
  // Shared state for MusicalKeyProvider
  const [musicalKey, setMusicalKey] = useState('G major'); // Default key

  return <MusicalKeyContext.Provider value={{ musicalKey, setMusicalKey }}> {children} </MusicalKeyContext.Provider>;
};

// Custom hook to use the Chord Context
export const useMusicalKeyContext = () => useContext(MusicalKeyContext);
