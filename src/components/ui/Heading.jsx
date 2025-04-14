'use client';
import React from 'react';

export function Heading({children, className, ...props}) {
  return (
    <h1 
      className={`text-white text-2xl font-bold mb-2 ${className || ''}`}
      {...props}
    >
      {children}
    </h1>
  );
}
export default Heading