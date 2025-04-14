'use client';
import React from 'react';

export function Input({className, ...props}) {
  return (
    <input 
      className={`w-full py-2 px-3 bg-[#e9f0fa]/10 border-0 rounded-md text-white focus:outline-none transition-all ${className || ''}`}
      {...props}
    />
  );
}

export default Input;