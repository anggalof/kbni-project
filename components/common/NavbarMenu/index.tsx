import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { checkUserAuthentication } from '../../../utils/auth';

export default function NavbarMenu({ handleLogout }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkUserAuthentication()) {
      setIsLoggedIn(checkUserAuthentication());
    }
  }, [])

  return (
    <div className="justify-between w-full block md:flex md:w-auto">
      {!isLoggedIn ? (
        <ul className="flex flex-col items-center font-extralight text-sm p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <Link href="#" className="block border-b-2 border-white md:border-b-0 py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
              Login
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="flex flex-col items-center font-extralight text-sm p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <div className="ml-4 mr-4 mt-6 md:mt-0">
              <button type="button" onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Logout
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
