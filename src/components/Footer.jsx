import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-5 px-5 md:px-10 flex items-center justify-center mt-40">
      <p className="text-white text-center">
        All rights reserved. © 2023 Flixify. Developed by{" "}
        <Link to="" className="text-[#E50914] font-semibold">
          Loqman Djefafla.
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
