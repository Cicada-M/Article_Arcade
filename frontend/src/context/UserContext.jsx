/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../url";
// import Loader from "../components/Loader";
export const UserContext = createContext({});
import { useNavigate } from "react-router-dom";
export const UserContextProvider = ({ children }) => {
  console.log("inside user context");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("insdie user context insdie useEffect");
    const getUser = async () => {
      try {
        const res = await axios.get(URL + "/auth/refetch", {
          withCredentials: true,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (document.cookie.split("=")[1]) {
      getUser();
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
