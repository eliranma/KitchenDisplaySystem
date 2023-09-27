"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from './LoginForm';
// import logger from '@/utils/logger';

const LoginPage = () => {
  const urlParams = useSearchParams()
  let username
  let password
  // url sent is https://website.com/?username=userid&password=deviceid
  try{
    username= urlParams.get('username')
    password= urlParams.get('password')
  }catch(e){
    username = null
    password = null
  }
  // logger.info("HELLO WORLD!")
  return (
  <div className='flex-col  w-full h-full flex bg-slate-500'>
  <LoginForm username={username} password={password} />
  </div>)
};

export default LoginPage;
