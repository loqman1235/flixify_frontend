import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Collection from "../components/Collection";
import useFetch from "../hooks/useFetch";

const HomePage = () => {
  const { data, isLoading } = useFetch("/collections");
  console.log(data);
  const loadingCollections = isLoading
    ? [
        { title: "Loading Collection", data: [], isLoading: true },
        { title: "Loading Collection", data: [], isLoading: true },
      ]
    : data.collections.map((coll) => ({
        title: coll.name,
        data: coll.items,
        isLoading: isLoading,
      }));
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <Banner />
      {/* Rows */}

      {/* Collections */}
      {loadingCollections.map((collection, index) => (
        <Collection
          key={index}
          title={collection.title}
          data={collection.data}
          isLoading={collection.isLoading}
        />
      ))}
      {/* <Collection title="Zombie Apocalypse" data={zombieApocalypseData} /> */}

      <Footer />
    </div>
  );
};

export default HomePage;
