import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import ListContextProvider from "./context/ListContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
