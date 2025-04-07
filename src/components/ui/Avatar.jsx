'use client';
import React from 'react';

export function Avatar({children,...props}){
    return(
        <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white"{...props}>Logo
            {children}
        </div>
    )
}
export default Avatar;  