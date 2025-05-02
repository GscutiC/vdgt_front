'use client';
import React from 'react';

export function FormGroup({children, className, ...props}) {
  return (
    <div 
      className={`mb-3 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default FormGroup;