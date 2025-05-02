'use client';
import React from 'react';

export function Label({children,...props}){
    return(
        <label className="block text-gray-300 text-xs uppercase mb-1"
        {...props}>
            {children}
        </label>
    )
}
export default Label