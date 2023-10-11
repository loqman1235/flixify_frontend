import { useLocation, useNavigate } from "react-router-dom";
import { MdCheck, MdClose } from "react-icons/md";
import api from "../services/api";
// import { useEffect } from "react";

const PlanCard = (plan) => {
  const location = useLocation();
  // const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const { _id, price, name } = plan;

  // useEffect(() => {
  //   if (!userId) {
  //     navigate("/sign-up");
  //   }
  // }, []);

  const handleSubscribtion = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/payments/create-checkout-session", {
        planId: _id,
        userId: userId,
      });
      console.log(response.data);
      window.location.href = response.data.sessionUrl;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow w-[300px] p-5 rounded-sm flex flex-col gap-10 hover:scale-105 transition duration-500 bg-white hover:shadow-xl">
      {/* Plan Card Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-black/70">${price}/mo.</p>
      </div>
      {/* Plan Features */}
      <ul className="flex flex-col gap-2">
        <li className="flex items-center gap-2">
          <span className="text-[#E50914]">
            <MdCheck />
          </span>
          <p className="text-sm text-black/50">
            {name === "Basic"
              ? "Good video quality in 720p"
              : "Good video quality in 720p,1080p,4k"}
          </p>
        </li>

        <li className="flex items-center gap-2">
          <span
            className={name === "Basic" ? "text-black/20" : "text-[#E50914]"}
          >
            {name === "Basic" ? <MdClose /> : <MdCheck />}
          </span>
          <p className="text-sm text-black/50">No Ads</p>
        </li>

        <li className="flex items-center gap-2">
          <span
            className={name === "Basic" ? "text-black/20" : "text-[#E50914]"}
          >
            {name === "Basic" ? <MdClose /> : <MdCheck />}
          </span>
          <p className="text-sm text-black/50">Create watchlists</p>
        </li>
      </ul>
      <button className="primary_btn py-3" onClick={handleSubscribtion}>
        Subscribe
      </button>
    </div>
  );
};

export default PlanCard;
