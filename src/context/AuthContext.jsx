import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  
  const navigate = useNavigate();

  console.log("token ==>",token);
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken)
      navigate('/dashboard')
    };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
    navigate("/dashboard");

  };

  const logout = () => {
    setToken(null);
    navigate("/");
  };

  const getUserDetails = () => {
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, getUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
