"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServerSideAPI from '../utils/api';

const LoginForm = ({ username=null, password=null }) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log(username, password);
    if (username && password) {
      handleLogin();
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) return;

    const success = await ServerSideAPI.login(username, password);

    if (success) {
      // Simulate session object
      localStorage.setItem('session', JSON.stringify(success));
      router.push('/orders', {queryParams:success});
    } else {
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">התחברות</h2>
        <form onSubmit={handleLogin}>
        <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              שם משתמש
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded px-3 py-2"
              placeholder="הזן מזהה לקוח"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              סיסמא
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded px-3 py-2"
              placeholder="הזן מזהה מכשיר"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            התחבר
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;