import React from "react";

const Notification = ({ notifications }) => {
  return (
    // after:absolute after:w-2 after:h-2 after:-top-1 after:rotate-[45deg] after:z-5 after:right-2 after:bg-black/70
    <ul className="absolute p-2 rounded-sm right-0 top-[180%] min-w-[280px] backdrop-blur-sm bg-black/70  flex flex-col gap-2 max-h-[200px] custom-scrollbar">
      {notifications.map((notification) => (
        <li className="w-full flex items-start justitfy-start gap-3 hover:bg-white/5 p-2 transition">
          <span className="w-[50px] h-[65px] overflow-hidden ">
            <img
              className="w-full h-full object-fit"
              src={notification?.poster}
              alt={notification?.title}
            />
          </span>
          <div className="text-left">
            <p className="text-white/50 font-light text-sm">
              New movie released
            </p>
            <p className="font-bold text-[16px]">{notification?.title}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Notification;
