import {createContext, useCallback, useMemo, useState} from 'react';

// CREATE LOADING CONTEXT
const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  // THE VALUE THAT WILL BE GIVEN TO THE LOADING CONTEXT
  const [loading, setLoading] = useState(false);

  // INIT LOADING
  const initLoading = () => {
    setLoading(true);
  };

  // FINISH LOADING
  const finishLoading = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{loading, initLoading, finishLoading}}>
      {children}
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingContextProvider };