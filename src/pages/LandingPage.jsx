import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const backgroundImageUrl = "landing_page_bg.png";
  const mainDivStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    position: "relative",
  };

  return (
    <div
      className="w-full h-screen before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-[#141515] before:from-10% before:to-[#141515]/50"
      style={mainDivStyle}
    >
      <div className="absolute w-full h-full top-0 left-0 z-10">
        <Navbar />
        <div className="w-full text-center px-5 mt-40">
          <h1 className="text-4xl md:text-5xl text-white font-extrabold mb-4 drop-shadow-sm">
            Unlimited movies, TV shows, and more
          </h1>
          <h3 className="text-white text-2xl md:text-3xl mb-10 drop-shadow-sm">
            Watch anywhere. Cancel anytime.
          </h3>
          <Link to="/sign-up" className="primary_btn text-xl py-4 px-10">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
