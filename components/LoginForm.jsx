"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ServerSideAPI from '../utils/api';
import { useAppContext } from '@/context/AppContext';

const LoginForm = ({ username=null, password=null }) => {
  
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setData} = useAppContext()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  useEffect(() => {
    console.log(username, password);
    if (username && password) {
      handleLogin();
    }
  }, []);

  const handleLogin = async (u=username, p=password) => {
    if (!u || !p) return;
    const success = await ServerSideAPI.login(u, p);

    if (success) {
      // Simulate session object
      localStorage.setItem('session', JSON.stringify(success));
      setData({session:success})
      router.push('/orders');
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
              value={user}
              className="w-full border rounded px-3 py-2"
              onChange={e=>setUser(e.target.value)}
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
              value={pass}
              onChange={e=>setPass(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="הזן מזהה מכשיר"
            />
          </div>
          <button
            onClick={()=>handleLogin(user, pass)}
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