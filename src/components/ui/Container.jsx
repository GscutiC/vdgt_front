'use client';   
import React from 'react';

export function Container({ children, className, ...props }) {
  return (
    <div 
      className={`flex items-center justify-center w-full min-h-screen bg-slate-900 ${className || ''}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
