import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import ContentCard from "../components/ContentCard";

const ShowsPage = () => {
  const { data, isLoading } = useFetch("/series?sort=newest");

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full px-5 md:px-10 pt-32">
        <h3 className="text-white text-2xl mb-2 font-bold">TV Shows</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={index}
                  width="100%"
                  height={180}
                  baseColor="#18181B"
                  highlightColor="#242429"
                />
              ))
            : data.series.map((item) => (
                <div className="relative group" key={item._id}>
                  <ContentCard key={item._id} item={item} />
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowsPage;
