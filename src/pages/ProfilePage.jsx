import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading } = useFetch("/subscriptions", user?._id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full px-10 pt-32">
        <h3 className="text-white text-2xl mb-2 font-bold">Account</h3>
        <span className="block w-full bg-white/5 h-px mb-4"></span>

        <div className="md:flex gap-10 pb-20">
          {/* Profile Picture */}
          <div className="w-full h-fit md:w-[180px] md:h-[180px] rounded-sm bg-gray-400 overflow-hidden mb-10">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Profile  */}
          <div className="flex-1">
            {/* Profile Details */}
            <div className="w-full mb-4">
              <h3 className="text-white text-xl font-bold mb-4">
                Profile Details
              </h3>
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-white ">Username</p>
                <p className="text-white/60">{user?.username}</p>
              </div>
              <div className="flex justify-between items-center w-full mb-8">
                <p className="text-white">Email</p>
                <p className="text-white/60">{user?.email}</p>
              </div>
              <Link to="/profile/edit" className="secondary_btn inline-block">
                Edit Profile
              </Link>
            </div>
            <span className="block w-full bg-white/5 h-px mb-4"></span>
            {/* Subscription Details */}
            <div className="w-full mb-4">
              <h3 className="text-white text-xl font-bold mb-4">
                Subscription Information
              </h3>
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-white">Current Plan</p>
                {isLoading ? (
                  <Skeleton
                    width={100}
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : (
                  <p className="text-white/60">
                    {data.subscription?.planId?.name}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-white ">Price</p>
                {isLoading ? (
                  <Skeleton
                    width={100}
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : (
                  <p className="text-white/60 ">
                    ${data.subscription?.planId?.price}/
                    {data.subscription?.planId?.interval}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-white ">Starting date</p>
                {isLoading ? (
                  <Skeleton
                    width={100}
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : (
                  <p className="text-white/60 ">
                    {moment(data.subscription?.startDate).format("DD MMM YYYY")}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center w-full mb-4">
                <p className="text-white ">Next billing date</p>
                {isLoading ? (
                  <Skeleton
                    width={100}
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : (
                  <p className="text-white/60 ">
                    {moment(data.subscription?.endDate).format("DD MMM YYYY")}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center w-full mb-8">
                <p className="text-white ">Status</p>
                {isLoading ? (
                  <Skeleton
                    width={100}
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : (
                  <p className="text-white/60 ">
                    {data.subscription?.status === "active" ? (
                      <span className="py-1 px-5 capitalize bg-green-900 text-green-300 rounded-sm">
                        {data.subscription?.status}
                      </span>
                    ) : (
                      <span className="py-1 px-5 capitalize bg-red-900 text-red-300 rounded-sm">
                        {data.subscription?.status}
                      </span>
                    )}
                  </p>
                )}
              </div>
              <button className="primary_btn inline-block">
                Cancel Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
