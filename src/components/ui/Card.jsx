'use client';
import React from 'react';

export function Card({children,...props}){
    return(
        <div className="w-full max-w-md p-8 rounded-lg bg-slate-800 text-white"{...props}>
            {children}
        </div>

    )
}