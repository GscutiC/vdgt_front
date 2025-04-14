'use client';
import React from 'react';

export function Avatar({children,...props}){
    return(
        <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold text-sm "{...props}>Logo
            {children}
        </div>
    )
}
export default Avatar;  