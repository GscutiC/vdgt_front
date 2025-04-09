'use client';
import React from 'react';

export function TextButton({children,...props}){
    return(
        <button className="text-black-400 hover:underline"{...props}>
            {children}
        </button>
    )
}
export default TextButton