import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css";
import { Link } from "react-router-dom";
import { MdPlayArrow, MdAdd } from "react-icons/md";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
// import SwiperCore, { Autoplay } from "swiper/core";
// SwiperCore.use([Autoplay]);

const bannerSlides = [
  {
    id: 1,
    backdrop:
      "https://www.themoviedb.org/t/p/original/i2GVEvltEu3BXn5crBSxgKuTaca.jpg",
    title: "Insidious: The Red Door",
    plot: "To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before, facing their family's dark past and a host of new and more horrifying terrors that lurk behind the red door",
    year: 2023,
  },
  {
    id: 2,
    backdrop:
      "https://www.themoviedb.org/t/p/original/9x2clQDZmxVnHfF7axkEWBCd7oF.jpg",
    title: "Soulcatcher",
    plot: "A military contractor hired to seize a weapon that turns people into savage killers seeks revenge when his brother falls victim to the device.",
    year: 2023,
  },
  {
    id: 3,
    backdrop:
      "https://www.themoviedb.org/t/p/original/qTlDTRLMQ52z5P4C0n3NZ6TAwEp.jpg",
    title: "The Collective",
    plot: "A group of righteous assassins called The Collective take aim at a highly sophisticated human trafficking ring backed by a network of untouchable billionaires. With their backs against the wall, The Collective has no choice but to put their most important mission in the hands of rookie assassin, Sam Alexander.",
    year: 2023,
  },
];

const Banner = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (itemId) => {
    setLoadedImages((prevLoadedImages) => ({
      ...prevLoadedImages,
      [itemId]: true,
    }));
  };
  return (
    <div className="w-full h-screen">
      <Swiper
        className="w-full h-full"
        slidesPerView={1}
        speed={1200}
        autoplay={{ delay: 5000 }}
        effect="fade"
        modules={[Autoplay, EffectFade]}
      >
        {bannerSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              <div className="w-full h-full after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-zinc-900/20 after:to-zinc-900 after:top-0 after:left-0">
                {!loadedImages[slide.id] ? (
                  <Skeleton
                    width="100%"
                    height="100%"
                    baseColor="#18181B"
                    highlightColor="#242429"
                  />
                ) : null}
                <img
                  src={slide.backdrop}
                  alt={slide.title}
                  className={`w-full h-full object-cover ${
                    loadedImages[slide.id] ? "block" : "hidden"
                  }`}
                  onLoad={() => handleImageLoad(slide.id)}
                />
              </div>
              <div className="w-full md:w-3/5 absolute top-1/2 -translate-y-1/2 px-5 md:px-10">
                <h1 className="text-white text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-sm">
                  {slide.title}
                </h1>
                <p className="text-white/90 font-light mb-4">{slide.plot}</p>
                <div className="flex items-center gap-2">
                  <Link to="" className="secondary_btn px-10 py-3">
                    <span className="text-2xl">
                      <MdPlayArrow />
                    </span>
                    Play
                  </Link>
                  <button className="px-10 font-bold border-none py-3 rounded-sm text-white flex items-center justify-center gap-1 bg-white/30 transition hover:bg-white/40">
                    <span className="text-2xl">
                      <MdAdd />
                    </span>
                    My List
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
