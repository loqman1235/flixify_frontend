import React, { useContext, useEffect, useState } from "react";
import { Link, json, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  MdSearch,
  MdOutlineNotificationsNone,
  MdOutlineArrowDropDown,
  MdDensityMedium,
} from "react-icons/md";

import { io } from "socket.io-client";
import Notification from "./Notification";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const isSignUpPage = location.pathname === "/sign-up";
  const isPlansPage = location.pathname === "/plans";
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationBadgeActive, setIsNotificationBadgeActive] = useState(
    JSON.parse(localStorage.getItem("isNotificationBadgeActive")) ?? true
  );
  const [isNotificationMenuActive, setIsNotificationMenuActive] =
    useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const socket = io("http://localhost:3002");

  const toggleMobileMenu = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const hideNotificationBadge = () => {
    setIsNotificationBadgeActive(false);
    localStorage.setItem("isNotificationBadgeActive", JSON.stringify(false));
  };

  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    setNotifications(storedNotifications);

    const newMovieListener = (newMovie) => {
      const newNotification = newMovie;

      // Capture the updated notifications array
      const updatedNotifications = [...notifications, newNotification];

      setNotifications(updatedNotifications);

      // Show the notification badge when a new notification arrives
      if (!isNotificationBadgeActive) {
        setIsNotificationBadgeActive(true);
        localStorage.setItem("isNotificationBadgeActive", JSON.stringify(true));
      }

      // Update localStorage with the updated notifications array
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    };

    socket.on("newMovie", newMovieListener);

    return () => {
      socket.off("newMovie", newMovieListener); // Remove the event listener on unmount
      // socket.disconnect()
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <div
      className={`w-full h-20 px-5 md:px-10 fixed top-0 flex items-center justify-between mb-10 z-50 ${
        isSignUpPage || isPlansPage
          ? "border-b border-gray-200 bg-[#FEFEFF]"
          : isAuthenticated && scrollPosition > 10
          ? "bg-zinc-950 fixed top-0"
          : "bg-gradient-to-b from-zinc-950 to-transparent"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          {/* Toggle Mobile Menu */}
          <button className="text-white md:hidden" onClick={toggleMobileMenu}>
            <MdDensityMedium size={26} />
          </button>
          <Link to="/">
            <img
              src="Brand.svg"
              alt="logo"
              className="object-contain select-none"
            />
          </Link>
        </div>
        {isAuthenticated && (
          // Nav Links
          <ul className="hidden md:flex items-center gap-5">
            <li>
              <Link className="text-[#F5F5F5] hover:text-white" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-[#F5F5F5] hover:text-white" to="/shows">
                TV Shows
              </Link>
            </li>
            <li>
              <Link className="text-[#F5F5F5] hover:text-white" to="/movies">
                Movies
              </Link>
            </li>
            <li>
              <Link className="text-[#F5F5F5] hover:text-white" to="/profile">
                New & Popular
              </Link>
            </li>
            <li>
              <Link className="text-[#F5F5F5] hover:text-white" to="/list">
                My List
              </Link>
            </li>
          </ul>
        )}
      </div>
      {/* Buttons */}
      {!isAuthenticated ? (
        <Link to="/sign-in" className="primary_btn">
          Sign In
        </Link>
      ) : (
        <div className="flex items-center gap-5">
          <button className="text-white text-2xl">
            <MdSearch />
          </button>
          {/* Notification Bell */}
          <button
            className="text-white text-2xl relative"
            onClick={() => {
              hideNotificationBadge();
              setIsNotificationMenuActive(!isNotificationMenuActive);
            }}
          >
            <MdOutlineNotificationsNone />
            {notifications.length > 0 && isNotificationBadgeActive && (
              // Notification Badge
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 font-semibold rounded-full w-5 h-5 flex items-center justify-center border-[2px] border-black">
                {notifications.length}
              </span>
            )}
            {/* Notification Dropdown */}
            {notifications.length > 0 && isNotificationMenuActive && (
              <Notification notifications={notifications} />
            )}
          </button>
          <div className="flex items-center gap-1">
            <Link
              className="w-8 h-8 overflow-hidden rounded-sm bg-gray-500"
              to="/account"
            >
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </Link>
            {/* Dropdown arrow */}
            <button
              onClick={toggleDropdown}
              className="text-white text-2xl relative"
            >
              <MdOutlineArrowDropDown />
              {isDropdownActive && (
                <ul className="bg-black/70 p-5 rounded-sm absolute right-0 top-[180%] flex flex-col gap-4 items-start min-w-[200px] backdrop-blur-sm">
                  <li className="text-[16px]">
                    <Link to="/account">Account</Link>
                  </li>
                  <span className="w-full h-px bg-white/10"></span>
                  <li className="text-[16px]">
                    <button onClick={logout}>Sign Out</button>
                  </li>
                </ul>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <ul
        className={`md:hidden fixed left-0 text-white top-0 w-[300px] h-screen bg-zinc-950 py-7 px-5 ${
          isMobileMenuActive ? "translate-x-0" : "-translate-x-[100%]"
        } transition-transform duration-700`}
      >
        <div className="flex items-center gap-4 mb-10">
          {/* Toggle Mobile Menu */}
          <button className="text-white md:hidden" onClick={toggleMobileMenu}>
            <MdDensityMedium size={26} />
          </button>
          <Link to="/">
            <img
              src="Brand.svg"
              alt="logo"
              className="object-contain select-none"
            />
          </Link>
        </div>
        <ul className="flex flex-col gap-5">
          <li>
            <Link to="/" className="text-white/80 hover:text-white transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              className="text-white/80 hover:text-white transition"
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/shows"
              className="text-white/80 hover:text-white transition"
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link
              to="/shows"
              className="text-white/80 hover:text-white transition"
            >
              New & Popular
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              className="text-white/80 hover:text-white transition"
            >
              My List
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;
