import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import logo from "../assets/logo.png";

export const Context = createContext();

// 🔐 SECRET KEY (must match everywhere)
const SECRET_KEY = "ILEFUND_ADMIN_SECRET";

export const ContextProvider = ({ children }) => {
  const [baseUrl] = useState("https://estate-property-s7o9.onrender.com/api");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userBlockedStatus, setUserBlockedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 ENCRYPT
  const encryptData = (data) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

  // 🔐 DECRYPT
  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  // 🔹 CHECK SESSION STORAGE ON APP LOAD
  useEffect(() => {
    try {
      const encryptedUser = sessionStorage.getItem("loggedInUser");
      const encryptedToken = sessionStorage.getItem("accessToken");

      if (!encryptedUser || !encryptedToken) {
        navigate("/admin-login");
        return;
      }

      const user = decryptData(encryptedUser);
      const token = decryptData(encryptedToken);

      if (!user?._id || !token) {
        throw new Error("Invalid decrypted data");
      }

      setLoggedInUser(user);
      setAccessToken(token);
      setUserBlockedStatus(user.blockedStatus || "active");
    } catch (error) {
      sessionStorage.clear();
      navigate("/admin-login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // 🔹 LOGIN (ENCRYPT + SAVE)
  const login = (userData, token) => {
    setLoggedInUser(userData);
    setAccessToken(token);
    setUserBlockedStatus(userData.blockedStatus || "active");

    sessionStorage.setItem("loggedInUser", encryptData(userData));
    sessionStorage.setItem("accessToken", encryptData(token));
  };

  // 🔹 LOGOUT
  const logout = () => {
    setLoggedInUser(null);
    setAccessToken(null);
    setUserBlockedStatus("active");

    sessionStorage.clear();
    navigate("/admin-login");
  };

  // 🔹 LOADER
  if (isLoading && loggedInUser === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="p-4 text-xl font-bold flex items-center">
          <img src={logo} alt="" className="logo animate-fadeIn" />
          <h2 className="text-[2rem] ml-2 animate-slideIn">Ilefund</h2>
        </div>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        baseUrl,
        loggedInUser,
        setLoggedInUser,
        accessToken,
        login,
        logout,
        userBlockedStatus,
        setUserBlockedStatus,
      }}
    >
      {children}
    </Context.Provider>
  );
};
