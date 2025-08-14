import { createContext, useContext, useState, useEffect } from "react";
import { loadCsvAsJson } from "./data.jsx";

// Create the context
const DataContext = createContext();

// Custom hook to use the context
const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

// Context provider component
const DataProvider = ({ children }) => {
  const [itemData, setItemData] = useState([]);
  const [barcodeData, setBarcodeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCsvAsJson()
      .then(([items, barcodes]) => {
        setItemData(items);
        setBarcodeData(barcodes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const value = {
    itemData,
    barcodeData,
    loading,
    error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { useDataContext, DataProvider };
