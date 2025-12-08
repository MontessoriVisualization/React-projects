import { FaFilter } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md border-b-2 border-orange-100 h-22">
      <Link to="/">
        <div>
          <h2 className="text-2xl font-bold text-black tracking-wide hover:text-orange-700 transition-colors cursor-pointer">
            MVRH
          </h2>
        </div>
      </Link>
      <div className="flex space-x-8 items-center">
        <div className="flex space-x-6 border border-gray-500 rounded-md px-2.5 py-1 items-center justify-span bg-gray-100">
          <input
            type="search"
            className="outline-none"
            placeholder="search recipi"
          />
          <Link to="/filter">
            <FaFilter />
          </Link>
        </div>
        <div className="items-center flex">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-1 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Login
          </button>
          <MdOutlineFavorite className="inline ml-4 text-orange-600 cursor-pointer text-[2rem] p-1 " />
        </div>
      </div>
    </header>
  );
};

export default Nav;
