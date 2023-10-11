import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Skeleton from "react-loading-skeleton";
import ContentCard from "../components/ContentCard";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";

const MoviesPage = () => {
  // const { data, isLoading } = useFetch("/movies?sort=newest");
  const { myList } = useContext(ListContext);

  const reversedMyList = myList ? myList.slice().reverse() : [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full px-5 md:px-10 pt-32">
        <h3 className="text-white text-2xl mb-2 font-bold">
          My List{" "}
          {reversedMyList &&
            reversedMyList.length > 0 &&
            `(${reversedMyList.length})`}
        </h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-x-1 gap-y-10">
          {!reversedMyList || reversedMyList.length === 0 ? (
            <p className="text-white/60">Your list is empty</p>
          ) : (
            reversedMyList.map((item) => (
              <div className="relative group" key={item._id}>
                <ContentCard key={item._id} item={item} />
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviesPage;
