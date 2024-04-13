import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { checkUserAuthentication } from '../../utils/auth';
import { setLoggedIn } from '../../utils/storage';
import Login from './formLogin';
import ProtectedComponent from './protectedComponent';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (checkUserAuthentication()) {
      Router.push('/dashboard')
    }
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true);
    setLoggedIn('true');
    Router.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center mt-16 md:mt-[20rem]">
      <div className="p-4 bg-white shadow-[0 1px 6px 0 rgba(0,0,0,.12)] rounded-xl text-black w-[500px]">
        <div className="text-center text-2xl mb-6">Basic Authentication</div>
        {!isLoggedIn ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <ProtectedComponent isLoggedIn={isLoggedIn} />
        )}
      </div>
    </div>
  );
}
