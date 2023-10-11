import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import { useContext, useState } from "react";
import HomePage from "./pages/HomePage";
import PlansPage from "./pages/PlansPage";
import SignInPage from "./pages/SignInPage";
import { AuthContext } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import GuestRoute from "./GuestRoute";
import MoviesPage from "./pages/MoviesPage";
import ShowsPage from "./pages/ShowsPage";
import MyListPage from "./pages/MyListPage";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <Routes>
          {/* Protected Routes */}
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/list" element={<MyListPage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Redirect authenticated users to the home page */}
          <Route path="/sign-up" element={<Navigate to="/" replace />} />
          <Route path="/sign-in" element={<Navigate to="/" replace />} />
          <Route path="/plans" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        // If the user is not authenticated, show the public routes
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/sign-in" element={<SignInPage />} />

          {/* Redirect unauthenticated users to landing page */}
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
