'use client';
import React from 'react';

export function Card({children,...props}){
    return(
        <div className="w-full max-w-md bg-slate-800 border-l border-gray-500/10backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-5"{...props}>
            {children}
        </div>

    )
}
export default Card