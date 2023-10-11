import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import {
  MdPlayArrow,
  MdAdd,
  MdOutlineThumbUp,
  MdThumbUp,
  MdThumbDown,
  MdOutlineThumbDown,
  MdDelete,
} from "react-icons/md";
import formatMovieTime from "../helpers/formatMovieTime";
import { ListContext } from "../context/ListContext";

const ContentCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const { myList, addToMyList, removeFromMyList } = useContext(ListContext);
  const content = item.content || item;
  const isSerie = content.hasOwnProperty("seasons");

  const isAddedToMyList = myList.some(
    (myListItem) => myListItem._id === content._id
  );

  // Handle likes and dislikes
  const handleLike = async () => {
    try {
      let response;
      if (isSerie) {
        response = await api.post(`/series/${content.slug}/like`);
      } else {
        response = await api.post(`/movies/${content._id}/like`);
      }
      console.log(response.data);
      // Update the local state and local storage
      setLiked((prevLiked) => !prevLiked);
      setDisliked(false); // Set disliked to false when liked
      if (isSerie) {
        localStorage.setItem(`serie_${content._id}_liked`, !liked);
        localStorage.removeItem(`serie_${content._id}_disliked`);
      } else {
        localStorage.setItem(`movie_${content._id}_liked`, !liked);
        localStorage.removeItem(`movie_${content._id}_disliked`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      let response;
      if (isSerie) {
        response = await api.post(`/series/${content.slug}/dislike`);
      } else {
        response = await api.post(`/movies/${content._id}/dislike`);
      }
      console.log(response.data);
      // Update the local state and local storage
      setDisliked((prevDisliked) => !prevDisliked);
      setLiked(false);
      if (isSerie) {
        localStorage.setItem(`serie_${content._id}_disliked`, !disliked);
        localStorage.removeItem(`serie_${content._id}_liked`);
      } else {
        localStorage.setItem(`movie_${content._id}_disliked`, !disliked);
        localStorage.removeItem(`movie_${content._id}_liked`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToMyList = () => {
    addToMyList(content);
  };

  const handleRemoveFromMyList = () => {
    removeFromMyList(content);
  };

  useEffect(() => {
    // Load like state from local storage when the component mounts
    let likedState;
    if (isSerie) {
      likedState = localStorage.getItem(`serie_${content._id}_liked`);
    } else {
      likedState = localStorage.getItem(`movie_${content._id}_liked`);
    }
    setLiked(likedState === "true");
  }, [content._id]);

  useEffect(() => {
    // Load dislike state from local storage when the component mounts
    const dislikedState = localStorage.getItem(`movie_${content._id}_disliked`);
    setDisliked(dislikedState === "true");
  }, [content._id]);

  return (
    <div>
      <Link
        to=""
        className="block rounded-sm w-full h-auto md:h-[12vw] overflow-hidden shadow-2xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
      >
        <img
          src={content.backdrop.url}
          alt={content.title}
          className={`w-full h-full object-cover`}
        />
      </Link>
      <div className="opacity-0 absolute top-0 transition duration-200 z-50 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          src={content.backdrop.url}
          alt={content.title}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-sm w-full h-[12vw]"
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-sm">
          {/* Play, Add, Like, Dislike */}
          <div className="flex items-center gap-2 mb-4">
            <div className="cursor-pointer w-4 h-4 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center  transition hover:bg-neutral-300">
              <MdPlayArrow size={20} />
            </div>
            {/* Add to my list button */}
            {isAddedToMyList ? (
              <button
                className="cursor-pointer w-4 h-4 lg:w-10 lg:h-10 border bg-neutral-700 border-neutral-700 text-white rounded-full flex items-center justify-center  transition hover:bg-neutral-700"
                onClick={handleRemoveFromMyList}
              >
                <MdDelete size={20} />
              </button>
            ) : (
              <button
                className="cursor-pointer w-4 h-4 lg:w-10 lg:h-10 border border-neutral-700 text-white rounded-full flex items-center justify-center  transition hover:bg-neutral-700"
                onClick={handleAddToMyList}
              >
                <MdAdd size={20} />
              </button>
            )}
            <button
              className={`cursor-pointer w-4 h-4 lg:w-10 lg:h-10 text-white ${
                !liked ? "border border-neutral-700 " : "bg-neutral-700 "
              }  rounded-full flex items-center justify-center  transition hover:bg-neutral-700`}
              onClick={handleLike}
            >
              {liked ? <MdThumbUp size={20} /> : <MdOutlineThumbUp size={20} />}
            </button>
            <button
              className={`cursor-pointer w-4 h-4 lg:w-10 lg:h-10 text-white ${
                !disliked ? "border border-neutral-700 " : "bg-neutral-700 "
              }  rounded-full flex items-center justify-center  transition hover:bg-neutral-700`}
              onClick={handleDislike}
            >
              {disliked ? (
                <MdThumbDown size={20} />
              ) : (
                <MdOutlineThumbDown size={20} />
              )}
            </button>
          </div>
          <h3 className="text-white font-bold mb-1">{content.title}</h3>
          <ul className="flex items-center gap-5">
            <li className="text-white/60 uppercase text-xs font-light">2023</li>
            <li className="text-white/60 uppercase text-xs font-light">
              {formatMovieTime(content.runtime)}
            </li>
            <li className="text-green-400  bg-green-900 px-2 py-[0.5px] rounded-sm uppercase text-xs font-light">
              PG-13
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
