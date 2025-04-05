'use client';
import React from 'react';

export function Label({children,...props}){
    return(
        <label className="block mb-2 text-sm"
        {...props}>
            {children}
        </label>
    )
}
export default Label