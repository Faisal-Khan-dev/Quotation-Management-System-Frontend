import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { base_url } from "../services/config";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const {getUserDetails} = useAuthContext();

  const dataLoad = async () => {
    const userData = getUserDetails()
    const url = `${base_url}/quotation/dasboard-summary`;
    const res = await axios.get(url, {
      headers: {
        companyid: userData.companyId,
      },
    });
    setData(res.data);
  };

  return (
    <DataContext.Provider value={{ data, setData,dataLoad }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within an AuthProvider");
  }
  return context;
};
