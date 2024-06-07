import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import getTokenData from "../../utils/getTokenData";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../store/searchSlice";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);

  const { isAuthenticated, signout } = useAuth();
  const { isAdmin, userId } = getTokenData();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const trimmedQuery = searchQuery.trim();
      navigate(`/search?searchQuery=${trimmedQuery}`);
      dispatch(setSearchQuery(""));
      setIsOpen(!isOpen);
      e.target.blur();
    }
  };

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap py-4 shadow border-solid border-t-8 border-teal-700">
      <div className="lg:flex w-full justify-between mx-10">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 dark:text-gray-200 mr-16">
            <span className="font-bold text-2xl tracking-tight">
              <Link to="/">Collectio</Link>
            </span>
          </div>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-teal-700 border-teal-700 hover:text-teal-700 hover:border-teal-700"
              onClick={handleIsOpen}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "" : "hidden"
          }  w-full lg:flex lg:items-center lg:w-auto`}
        >
          <div className="lg:flex items-center">
            <div className="flex flex-grow mt-6 lg:mt-0  text-gray-600 dark:text-white lg:block">
              <input
                className="w-full px-3 lg:w-auto border-2 border-gray-300 h-10 rounded-lg text-sm focus:outline-none dark:bg-gray-800/[.3]"
                type="search"
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={handleSearch}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-2"
              ></button>
            </div>
            <div className="text-md font-bold mt-4 lg:mt-0 lg:mr-3 lg:ml-6 lg:flex-grow">
              {isAdmin && isAuthenticated && (
                <Link
                  to="/users"
                  onClick={handleIsOpen}
                  className="block border-b-2 border-teal-600 p-2 md:p-0 md:border-none my-3 lg:inline-block lg:my-0 lg:mt-0 hover:text-teal-700 lg:mr-4"
                >
                  Users
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <Link
                    to={`/collections?userId=${userId}`}
                    onClick={handleIsOpen}
                    className="block border-b-2 border-teal-600 p-2 lg:p-0 lg:border-none my-3 lg:inline-block lg:my-0 lg:mt-0 hover:text-teal-700 lg:mr-4"
                  >
                    My collections
                  </Link>
                  <Link
                    to={`/issues`}
                    onClick={handleIsOpen}
                    className="block border-b-2 border-teal-600 p-2 lg:p-0 lg:border-none my-3 lg:inline-block lg:my-0 lg:mt-0 hover:text-teal-700 lg:mr-4"
                  >
                    My issues
                  </Link>
                </>
              )}
            </div>
            <div className="flex mt-6 lg:mt-0">
              <button onClick={signout}>
                <Link
                  to={isAuthenticated ? "/" : "/login"}
                  className="block text-md p-2 rounded border border-teal-600 font-bold hover:text-teal-700 lg:mt-0"
                >
                  {isAuthenticated ? "Sign out" : "Sign in"}
                </Link>
              </button>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
