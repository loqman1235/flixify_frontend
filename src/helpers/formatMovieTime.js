const formatMovieTime = (mins) => {
  return `${parseInt(mins / 60) > 0 ? parseInt(mins / 60) + "H" : ""} ${
    mins % 60 > 0 ? (mins % 60) + "MINS" : ""
  }`;
};

export default formatMovieTime;
