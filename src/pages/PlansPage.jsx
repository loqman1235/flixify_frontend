import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import api from "../services/api";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);

  // Get Plans
  const getPlans = async () => {
    try {
      const response = await api.get("/plans");
      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FEFEFF] pb-10">
      <Navbar />
      <div className="w-full flex flex-col items-center px-5 pt-28">
        <h2 className="font-semibold text-2xl text-[#333333] mb-4">
          Subscribe to a plan
        </h2>
        <div className="md:flex items-center gap-4">
          {plans.map((plan) => (
            <PlanCard key={plan._id} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
