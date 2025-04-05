'use client';
import React from 'react';

export function Button({children,...props}){
    return(
        <button className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded transition duration-300"
          {...props}>{children}
        </button>
    )
}
export default Button