import React from "react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import useAuth from "../../hooks/useAuth";
import getRoleFromToken from "../../utils/getRoleFromToken";

export default function Navbar() {
  const { isAuthenticated, signout } = useAuth();
  const isAdmin = getRoleFromToken();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 shadow border-solid border-t-2 border-teal-700 mb-8">
      <div className="lg:flex w-full justify-between mx-10">
        <div className="flex mx-10 justify-between lg:w-auto w-full lg:border-b-0 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl tracking-tight">
              <Link to="/">Collectio</Link>
            </span>
          </div>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-teal-700 border-teal-700 hover:text-teal-700 hover:border-teal-700"
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
        <div className="lg:flex">
          <div className="flex flex-grow  text-gray-600 lg:block">
            <input
              className="w-full px-3 lg:w-auto mt-6 lg:mt-0 border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-2"
            ></button>
          </div>
          <div className="w-full mr-10 lg:flex lg:items-center lg:w-auto "></div>

          <div className="text-md font-bold  lg:flex-grow">
            {isAdmin && isAuthenticated && (
              <Link
                to="/users"
                className="block mt-4 lg:inline-block lg:mt-0 px-2 py-2 rounded hover:text-teal-700 mr-2"
              >
                Users
              </Link>
            )}
            <Link
              to="/collections"
              className="block mt-4 lg:inline-block lg:mt-0 px-2 py-2 rounded hover:text-teal-700 mr-2"
            >
              My collections
            </Link>
          </div>
          <div className="flex">
            <Link
              to={isAuthenticated ? "/" : "/login"}
              class="block text-md p-2 rounded ml-2 border border-teal-600 font-bold hover:text-teal-700 mt-4lg:mt-0"
            >
              <button onClick={signout}>
                {isAuthenticated ? "Sign out" : "Sign in"}
              </button>
            </Link>
          </div>
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
