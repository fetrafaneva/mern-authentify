import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const getUserData = async () => {
    setLoadingUser(true);

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      console.log("📦 getUserData response:", data);

      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // utilisateur non connecté → NORMAL
        setUserData(null);
        setIsLoggedin(false);
      } else {
        toast.error(
          error.response?.data?.message || "Unable to fetch user data"
        );
      }
    } finally {
      setLoadingUser(false);
    }
  };

  // 🔥 Appelé seulement si connecté
  useEffect(() => {
    if (isLoggedin) {
      getUserData();
    }
  }, [isLoggedin]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    loadingUser,
    getUserData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
