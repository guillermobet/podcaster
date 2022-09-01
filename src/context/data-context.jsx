import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const DataProvider = (props) => {
  const [state, setState] = useState({});
  return <DataContext.Provider value={[state, setState]} {...props} />;
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within the DataProvider");
  }
  return context;
};

export { DataProvider, useData };
