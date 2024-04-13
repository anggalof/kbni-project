import React, { useState } from 'react';

const FormLogin = ({ handleLogin }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      handleLogin();
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <div className="text-md font-semibold mb-4">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="flex m-2">
          <div className="w-[120px] flex items-center">Username:</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-spacing-x-32 border-blue-500 border-solid border-2 rounded-md p-2" />
        </div>
        <div className="flex m-2">
          <div className="w-[120px] flex items-center">Password:</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-spacing-x-32 border-blue-500 border-solid border-2 rounded-md p-2" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="my-8 bg-blue-500 py-2 rounded-lg text-white w-[200px]">Login</button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
