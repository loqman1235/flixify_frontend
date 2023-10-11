import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // TODO: I have to validate the accessToken in the backend
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // useState initializer function
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return !!storedUser; // Convert storedUser to a boolean (true if exists, false if not)
  });

  // Handle user login
  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      if (response.status === 200) {
        setIsAuthenticated(true);
        const userData = response.data.user;
        //console.log(response.data);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/account");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // console.log("Authentication error:", error.response.data.error);
        // Handle authentication error
        throw new Error(error.response.data.error);
      } else {
        // Handle other errors
        throw new Error("Something went wrong. Please try again later.");
      }
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/users/logout");
      if (response.status === 200) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const initUser = storedUser ? JSON.parse(storedUser) : null;
    setIsAuthenticated(!!initUser || false);
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
