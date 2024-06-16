import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/');
    window.location.reload(); // Refresh the page to reflect the changes in the navbar
  };

  return (
    <nav className=" border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          className="flex items-center space-x-3 rtl:space-x-reverse"
          onClick={() => navigate('/')}
        >
          <span className="self-center text-3xl font-bold font-mono text-slate-500 hover:text-red-500 text-pink whitespace-nowrap dark:text-white">
            TravelSathi
          </span>
        </button>
        <div className="flex justify-between gap-7 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to={'/blog'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            Blog
          </Link>
          <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
            About Us
          </a>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="text-white bg-red-400 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
              <FontAwesomeIcon icon={faUserCircle} className="text-gray-900 dark:text-white text-3xl cursor-pointer" onClick={() => navigate('/sidebar')} />
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-white bg-red-300 hover:bg-red-400 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
                onClick={() => navigate('/signup')}
              >
                Connect
              </button>
              <button
                type="button"
                className="text-white bg-red-400 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
                onClick={() => navigate('/register')}
              >
                Sign up as a TravelSathi
              </button>
            </>
          )}
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};