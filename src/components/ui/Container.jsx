'use client';   
import React from 'react';

export function Container({ children, className, ...props }) {
  return (
    <div 
      className={`w-auto flex items-center justify-center bg-gradient-to-br from-gray-800  via-gray-900 to-black p-3 m-0 overflow-hidden ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;