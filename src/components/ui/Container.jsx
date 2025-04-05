'use client';   
import React from 'react';

export function Container({children,...props}){
    return(
        <div className="w-full max-w-2xl p-8 rounded-lg bg-slate-800 text-white"
        {...props}>
            {children}
        </div>
    )
}