import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="bg-[#0D0C1D] text-white px-6 py-4 flex justify-between items-center">
<h1 className="text-2xl font-bold text-red-500">MovieFinder 🍿</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 font-medium">
        <a href="#trending" className="hover:text-red-500">Trending</a>
        <a href="#all" className="hover:text-red-500">All Movies</a>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#0D0C1D] flex flex-col gap-4 p-6 z-50 shadow-md md:hidden">
          <a href="#trending" onClick={() => setIsOpen(false)} className="hover:text-red-500">Trending</a>
          <a href="#all" onClick={() => setIsOpen(false)} className="hover:text-red-500">All Movies</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
