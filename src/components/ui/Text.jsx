'use client';
import React from 'react';
export function Text({children, className, ...props}) {
    return (
      <p className={`text-slate-300 mb-5 text-2x5${className || ''}`}
        {...props}>
        {children}
      </p>
    );
  }

export default Text