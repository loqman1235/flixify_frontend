import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import ContentCard from "./ContentCard";

const Collection = ({ title, data, isLoading }) => {
  console.log("Is Loading", isLoading);
  const [loadedImages, setLoadedImages] = useState({});
  const [isBeginningReached, setIsBeginningReached] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isEndReached, setIsEndReached] = useState(false);
  const handleImageLoad = (itemId) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [itemId]: true,
    }));
  };

  const handleSlideChange = (swiper) => {
    setIsBeginningReached(swiper.isBeginning);
    setIsEndReached(swiper.isEnd);
    console.log(swiper);
  };

  return (
    <div className="w-full mb-10">
      <h3 className="text-white text-xl mb-2 font-bold lg:text-2xl px-5 md:px-10">
        {isLoading ? (
          <Skeleton
            width={200}
            className="rounded-full"
            baseColor="#18181B"
            highlightColor="#242429"
          />
        ) : (
          title
        )}
      </h3>

      {isLoading ? (
        <div className="px-5 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((index) => (
            <Skeleton
              key={index}
              width="100%"
              height={180}
              baseColor="#18181B"
              highlightColor="#242429"
            />
          ))}
        </div>
      ) : (
        <Swiper
          className="px-5 md:px-10 overflow-visible"
          speed={800}
          loop={false}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 4,
            },
          }}
        >
          <button
            className={`swiper-button-next text-4xl absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-l from-zinc-900 to-transparent p-3 cursor-pointer text-white h-full ${
              isEndReached ? "hidden" : "block"
            }`}
          >
            <MdChevronRight size={40} />
          </button>
          {data.map((item, index) => (
            <SwiperSlide
              key={item.content._id}
              className={`relative group ${
                hoveredCard === index ? "z-50" : ""
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <ContentCard key={item.content._id} item={item} />
            </SwiperSlide>
          ))}
          <button
            className={`swiper-button-prev text-4xl absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-zinc-900 to-transparent p-3 cursor-pointer text-white h-full ${
              isBeginningReached ? "hidden" : "block"
            }`}
          >
            <MdChevronLeft size={40} />
          </button>
        </Swiper>
      )}
    </div>
  );
};

export default Collection;
